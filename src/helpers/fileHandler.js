import RNFS from 'react-native-fs';
import { viewDocument } from '@react-native-documents/viewer';
import { Platform } from 'react-native';
import { getImageFromServer, hasInternet } from './services';
import { showToast } from './ToastConfig';
import { BASE_URL } from './BASE_URL';
import { getStore } from '../redux/store';

/**
 * Get MIME type from file extension
 */
export const getMimeType = fileName => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const mimeTypes = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    csv: 'text/csv',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

/**
 * Get file extension from MIME type (fallback)
 */
export const getExtensionFromMime = mimeType => {
  const mimeToExt = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'text/csv': 'csv',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'pptx',
    'text/plain': 'txt',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
  };
  return mimeToExt[mimeType] || 'bin';
};

const sanitizeFileName = fileName =>
  fileName.split('/').pop().split('?')[0].replace(/\s+/g, '_');

/**
 * Derive a stable on-disk name from the server URL (not the display label).
 */
const getStorageFileName = (url, displayName) => {
  const uploadMatch = url?.match(/\/upload\/(?:file|image)\/([^?]+)/);
  if (uploadMatch?.[1]) {
    return sanitizeFileName(uploadMatch[1]);
  }

  const mimeType = getMimeType(displayName);
  return ensureFileExtension(displayName, mimeType, url);
};

/**
 * Ensure filename has extension
 */
const ensureFileExtension = (fileName, mimeType, url) => {
  let finalName = sanitizeFileName(fileName);
  const hasExtension = /\.\w+$/.test(finalName);

  if (!hasExtension) {
    const urlExt = url.split('.').pop()?.split('?')[0]?.toLowerCase();
    if (
      urlExt &&
      [
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'csv',
        'ppt',
        'pptx',
        'txt',
        'jpg',
        'jpeg',
        'png',
        'gif',
      ].includes(urlExt)
    ) {
      finalName = `${finalName}.${urlExt}`;
    } else {
      const ext = getExtensionFromMime(mimeType);
      finalName = `${finalName}.${ext}`;
    }
  }

  return finalName;
};

const getLocalFilePath = storageFileName =>
  Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/${storageFileName}`,
    android: `${RNFS.DownloadDirectoryPath}/${storageFileName}`,
  });

const getAuthHeaders = () => {
  const token = getStore().getState()?.auth?.data?.userData?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const parseUploadUrl = url => {
  const match = url?.match(/\/upload\/(file|image)\/([^?]+)/);
  if (!match) {
    return null;
  }
  return { type: match[1], key: match[2] };
};

const isNoViewerAppError = error => {
  const message = String(error?.message || error);
  return (
    message.includes('ActivityNotFoundException') ||
    message.includes('No Activity found to handle Intent')
  );
};

const openDownloadedFile = async filePath => {
  const finalFileName = filePath.split('/').pop();
  const mimeType = getMimeType(finalFileName);
  const uri = Platform.OS === 'android' ? `file://${filePath}` : filePath;
  await viewDocument({ uri, mimeType });
};

const downloadRemoteFile = async (url, savePath) => {
  const parsed = parseUploadUrl(url);
  if (!parsed) {
    throw new Error('Invalid file URL');
  }

  const fromUrl = `${BASE_URL}upload/${parsed.type}/${parsed.key}`;
  console.log(`Downloading file from: ${fromUrl}`);

  const result = await RNFS.downloadFile({
    fromUrl,
    toFile: savePath,
    headers: getAuthHeaders(),
  }).promise;

  if (result.statusCode < 200 || result.statusCode >= 300) {
    throw new Error(`Download failed (HTTP ${result.statusCode})`);
  }

  return savePath;
};

/**
 * Save a blob to device storage
 */
export const saveBlobToDevice = async (
  blob,
  suggestedFileName,
  mimeType,
  url,
) => {
  const finalFileName = ensureFileExtension(suggestedFileName, mimeType, url);
  const savePath = getLocalFilePath(finalFileName);

  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  await RNFS.writeFile(savePath, base64, 'base64');
  return savePath;
};

export const openLocalFile = async (filePath, fileName) => {
  try {
    const exists = await RNFS.exists(filePath);
    if (!exists) throw new Error(`File not found: ${filePath}`);

    await openDownloadedFile(filePath);
    console.log('File opened successfully');
  } catch (error) {
    if (isNoViewerAppError(error)) {
      showToast(
        'success',
        `${fileName} saved. Install a viewer app to open this file type.`,
      );
      return;
    }
    console.log('openLocalFile error:', error);
    throw error;
  }
};

const isImageUrl = url => {
  const ext = url.split('.').pop()?.split('?')[0]?.toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
};

/**
 * Unified download + open for both files and images.
 * Uses the server URL for the saved filename so repeat taps work reliably.
 */
export const downloadAndOpen = async (url, originalFileName) => {
  try {
    const storageFileName = getStorageFileName(url, originalFileName);
    const expectedPath = getLocalFilePath(storageFileName);
    const fileExists = await RNFS.exists(expectedPath);

    console.log(`Checking file existence at ${expectedPath}: ${fileExists}`);

    let filePath = expectedPath;

    if (!fileExists) {
      const isConnected = await hasInternet();
      if (!isConnected) {
        showToast('info', 'No Internet Connection');
        return;
      }

      if (isImageUrl(url)) {
        const blob = await getImageFromServer(url);
        filePath = await saveBlobToDevice(
          blob,
          storageFileName,
          getMimeType(storageFileName),
          url,
        );
      } else {
        filePath = await downloadRemoteFile(url, expectedPath);
      }

      showToast('success', `${storageFileName} downloaded`);
    }

    try {
      await openDownloadedFile(filePath);
      if (fileExists) {
        showToast('success', `${storageFileName} opened`);
      }
    } catch (openError) {
      if (isNoViewerAppError(openError)) {
        showToast(
          'success',
          Platform.OS === 'android'
            ? `${storageFileName} saved to Downloads. Install Excel/Sheets to open it.`
            : `${storageFileName} saved on device. Install a viewer app to open it.`,
        );
        return filePath;
      }
      throw openError;
    }

    return filePath;
  } catch (error) {
    console.log('Download/open error:', error);
    showToast('error', error.message || 'Failed to download file');
    throw error;
  }
};
