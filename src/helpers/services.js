import NetInfo from '@react-native-community/netinfo';
import { jwtDecode } from 'jwt-decode';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { saveUserLocation } from '../redux/actions/authActions';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import { BASE_URL } from './BASE_URL';
import { showToast } from './ToastConfig';
import { images } from '../assets/images';
import moment from 'moment';
import apiClient from './apiClient';
import Clipboard from '@react-native-clipboard/clipboard';

export const hasInternet = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected && state.isInternetReachable;
};

export const handleCopyText = text => {
  Clipboard.setString(text);
  showToast('success', 'Copied');
};
export const formatDate = date => {
  return new Date(date).toLocaleString();
};
export const formatChangeOrderType = type => {
  if (typeof type !== 'string' || !type.trim()) return 'Change order';

  return type
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};
export const formatMoney = (amount, currency = 'USD') => {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return null;

  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};
export const getJobStartedAt = job => {
  const timerStartedAt =
    job?.JobTimer?.[0]?.startedAt ?? job?.jobTimers?.[0]?.startedAt;
  if (
    timerStartedAt instanceof Date ||
    (typeof timerStartedAt === 'string' && timerStartedAt.trim())
  ) {
    return timerStartedAt;
  }

  if (
    job?.jobStartAt instanceof Date ||
    (typeof job?.jobStartAt === 'string' && job.jobStartAt.trim())
  ) {
    return job.jobStartAt;
  }

  return null;
};
export const getJobEndedAt = job => {
  const timerEndedAt =
    job?.JobTimer?.[0]?.endedAt ?? job?.jobTimers?.[0]?.endedAt;
  if (
    timerEndedAt instanceof Date ||
    (typeof timerEndedAt === 'string' && timerEndedAt.trim())
  ) {
    return timerEndedAt;
  }

  if (
    job?.jobEndAt instanceof Date ||
    (typeof job?.jobEndAt === 'string' && job.jobEndAt.trim())
  ) {
    return job.jobEndAt;
  }

  return null;
};
export const getEventTime = event => {
  return new Date(event.time).getTime();
};

export const getTokenRemainingTime = token => {
  try {
    if (!token || typeof token !== 'string') {
      return 0;
    }
    const decoded = jwtDecode(token);

    if (!decoded || !decoded.exp) {
      return 0;
    }
    const now = Math.floor(Date.now() / 1000);
    const remaining = decoded.exp - now;
    if (typeof remaining !== 'number' || remaining <= 0) {
      return 0;
    }
    return remaining;
  } catch (error) {
    console.log('Token decode error:', error);
    return 0;
  }
};

export const getUserLocationService = async dispatch => {
  try {
    // =========================================
    // LOCATION PERMISSION
    // =========================================
    const locationPermission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    const locationResult = await check(locationPermission);

    if (locationResult !== RESULTS.GRANTED) {
      const requestLocation = await request(locationPermission);

      if (requestLocation === RESULTS.GRANTED) {
        await getUserLocation(dispatch);
      }
    } else {
      await getUserLocation(dispatch);
    }

    // =========================================
    // CAMERA PERMISSION (ADDED)
    // =========================================
    const cameraPermission = Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    });

    const cameraResult = await check(cameraPermission);

    if (cameraResult !== RESULTS.GRANTED) {
      const requestCamera = await request(cameraPermission);

      if (requestCamera !== RESULTS.GRANTED) {
        console.log('Camera permission not granted');
      }
    }
  } catch (error) {
    console.log('Permission error:', error);
  }
};
const getUserLocation = async dispatch => {
  try {
    const position = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 10000,
        },
      );
    });
    const latitude = position?.coords?.latitude;
    const longitude = position?.coords?.longitude;
    const userLatLong = {
      latitude,
      longitude,
    };
    dispatch(saveUserLocation(userLatLong));
  } catch (error) {
    console.log('Location error:', error);
  }
};
const toRadians = deg => deg * (Math.PI / 180);
export const distanceInMiles = (coords1, coords2) => {
  const lat1 = parseFloat(coords1.latitude);
  const lon1 = parseFloat(coords1.longitude);
  const lat2 = parseFloat(coords2.latitude);
  const lon2 = parseFloat(coords2.longitude);
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return NaN;
  }
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;
  const distanceMiles = distanceKm * 0.621371;
  return distanceMiles;
};
export const getFreshUserLocation = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      },
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0, // Always fresh
        forceRequestLocation: true,
      },
    );
  });
};
export const getStatusColor = status => {
  switch (status?.toLowerCase()) {
    case 'active':
      return '#9EE671';
    case 'paused':
      return '#FF0004';
    case 'completed':
      return '#009812';
    case 'pending':
      return '#B1B1B1';
    case 'pending_approval':
      return '#F59E0B';
    default:
      return '#D1D5DB';
  }
};

export const getTimePeriod = hour => {
  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};
export const getFileColor = name => {
  const ext = name?.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return '#FF383C'; // red
    case 'doc':
    case 'docx':
      return '#009FD9'; // blue
    case 'xls':
    case 'xlsx':
      return '#3DBE84'; // green
    case 'ppt':
    case 'pptx':
      return '#FF8C00'; // orange
    default:
      return '#989898'; // default gray
  }
};
export const uploadImage = async file => {
  const isConnected = await hasInternet();
  if (!isConnected) {
    showToast('info', 'Internet Not Connected');
    return;
  }
  try {
    const formData = new FormData();
    formData.append('image', file);
    const res = await apiClient.post(`upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.log('Upload error:', error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
const getImageMeta = url => {
  if (!url || typeof url !== 'string') return null;
  try {
    const fileName = url.split('/').pop();
    if (!fileName) return null;
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return null;
    const id = fileName.substring(0, lastDotIndex);
    const ext = fileName.substring(lastDotIndex + 1);
    if (!id || !ext) return null;
    return { id, ext };
  } catch (err) {
    console.log('Parse error:', err);
    return null;
  }
};
export const deleteImage = async imageUrl => {
  const isConnected = await hasInternet();
  if (!isConnected) {
    showToast('info', 'Internet Not Connected');
    return;
  }
  const meta = getImageMeta(imageUrl);
  if (!meta) {
    throw new Error('Invalid image URL');
  }
  const { id, ext } = meta;
  try {
    const res = await apiClient.delete(`upload/image/${id}.${ext}`, {});
    console.log('delete image res', res.data);
    return res.data;
  } catch (error) {
    console.log('Delete error:', error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
export const getImageFromServer = async imageUrl => {
  const isConnected = await hasInternet();
  if (!isConnected) {
    showToast('info', 'Internet Not Connected');
    return;
  }
  const meta = getImageMeta(imageUrl);
  if (!meta) {
    throw new Error('Invalid image URL');
  }
  const { id, ext } = meta;
  try {
    const res = await apiClient.get(`upload/image/${id}.${ext}`, {
      responseType: 'blob',
    });
    // console.log('get image res', res.data);
    return res.data;
  } catch (error) {
    console.log('Get image error:', error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
export const uploadFile = async file => {
  const isConnected = await hasInternet();

  if (!isConnected) {
    showToast('info', 'Internet Not Connected');
    return;
  }

  try {
    const formData = new FormData();

    // backend expects "file"
    formData.append('file', {
      uri: file.uri,
      type: file.type || 'application/octet-stream',
      name: file.name || `file-${Date.now()}`,
    });

    const res = await apiClient.post(`upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.log('Upload file error:', error?.response?.data || error.message);

    throw error?.response?.data || error;
  }
};
export const getFileMeta = url => {
  if (!url || typeof url !== 'string') {
    return null;
  }
  try {
    const fileName = url.split('/upload/file/')[1]?.split('?')[0];
    if (!fileName) {
      return null;
    }
    const parts = fileName.split('.');
    if (parts.length < 2) {
      return null;
    }
    const ext = parts.pop();
    const id = parts.join('.');
    if (!id || !ext) {
      return null;
    }
    return {
      id,
      ext,
    };
  } catch (err) {
    console.log('File parse error:', err);
    return null;
  }
};
export const deleteFile = async fileUrl => {
  const isConnected = await hasInternet();
  if (!isConnected) {
    showToast('info', 'Internet Not Connected');
    return;
  }
  const meta = getFileMeta(fileUrl);
  if (!meta) {
    throw new Error('Invalid file URL');
  }
  const { id, ext } = meta;
  try {
    const res = await apiClient.delete(`upload/file/${id}.${ext}`, {});
    console.log('delete file res', res.data);
    return res.data;
  } catch (error) {
    console.log('Delete file error:', error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
export const getFileFromServer = async fileUrl => {
  const isConnected = await hasInternet();
  if (!isConnected) {
    showToast('info', 'Internet Not Connected');
    throw new Error('Internet Not Connected');
  }
  const meta = getFileMeta(fileUrl);
  if (!meta) {
    throw new Error('Invalid file URL');
  }
  const { id, ext } = meta;
  try {
    const res = await apiClient.get(`upload/file/${id}.${ext}`, {
      responseType: 'blob',
    });
    // console.log('get file res', res.data);
    return res.data;
  } catch (error) {
    console.log('Get file error:', error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
export const logoutCurrentSession = async () => {
  try {
    const res = await apiClient.post(
      `auth/logout`,
      {},
      {
        headers: {
          accept: '*/*',
        },
      },
    );
    console.log('logout session response', res.data);
    return res.data;
  } catch (error) {
    console.log('Logout error:', error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
export const getSessionsGrouped = sessions => {
  if (!sessions?.length) {
    return { activeSessions: [], previousSessions: [] };
  }
  const validSessions = sessions.filter(
    item => item.revoked === false && item.revokedAt === null,
  );
  const getDeviceInfo = deviceString => {
    const os = (deviceString || '').toLowerCase();
    if (os.includes('okhttp')) {
      return { name: 'Android Device', image: images.android };
    }
    if (os.includes('arc')) {
      return { name: 'Arc (Mac)', image: images.arcMac };
    }
    if (os.includes('safari') && os.includes('mac')) {
      return { name: 'Safari (Mac)', image: images.safari };
    }
    if (os.includes('safari')) {
      return { name: 'Safari', image: images.safari };
    }
    if (os.includes('chrome')) {
      return { name: 'Chrome', image: images.chrome };
    }
    if (os.includes('mac')) {
      return { name: 'Mac Device', image: images.arcMac };
    }
    return { name: 'Web Session', image: images.chrome };
  };

  const todaySessions = [];
  const previousSessionsRaw = [];
  validSessions.forEach(item => {
    const isToday = moment(item.lastActiveAt).isSame(moment(), 'day');
    if (isToday) {
      todaySessions.push(item);
    } else {
      previousSessionsRaw.push(item);
    }
  });
  const activeSessions = todaySessions.map(item => {
    const device = getDeviceInfo(item.device);
    return {
      id: item.id,
      name: device.name,
      imagae: device.image,
      location: item.location || 'Unknown',
    };
  });
  const previousSessions = previousSessionsRaw
    .sort((a, b) => new Date(b.lastActiveAt) - new Date(a.lastActiveAt))
    .map(item => {
      const device = getDeviceInfo(item.device);
      return {
        id: item.id,
        name: device.name,
        imagae: device.image,
        location: item.location || 'Unknown',
        lastLogin: `Last Logged in ${moment(item.lastActiveAt).fromNow()}`,
        key: item.id,
      };
    });
  return { activeSessions, previousSessions };
};
export const getStripeStatus = async token => {
  try {
    const res = await axios.get(`${BASE_URL}finance/status`, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('getStripeStatus response', res.data);

    return res.data;
  } catch (error) {
    console.log('stripe error:', error?.response?.data || error.message);

    throw error?.response?.data || error;
  }
};
export const urlStripe = async token => {
  try {
    const res = await axios.get(`${BASE_URL}finance/stripe/connect`, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('urlStripe response', res.data);

    return res.data;
  } catch (error) {
    console.log(
      'Stripe connect error:',
      error?.response?.data || error.message,
    );

    throw error?.response?.data || error;
  }
};
export const identitySession = async token => {
  try {
    const res = await axios.post(
      `${BASE_URL}finance/stripe/identity/create-session`,
      {},
      {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('identitySession response', res.data);

    return res.data;
  } catch (error) {
    console.log(
      'Stripe connect error:',
      error?.response?.data || error.message,
    );

    throw error?.response?.data || error;
  }
};
export const deadlineParts = deadlineAt => {
  if (!deadlineAt) return;
  const end = moment(deadlineAt);
  const daysLeft = end.diff(moment(), 'days');
  const relative =
    daysLeft > 1
      ? `${daysLeft} days left`
      : daysLeft === 1
      ? '1 day left'
      : daysLeft === 0
      ? 'Due today'
      : 'Overdue';
  const absolute = end.format('MM/DD/YYYY, HH:mm');
  return { relative, absolute };
};
export const timeAgo = dateString => {
  if (!dateString) return 'Unknown'; // Handle undefined/null cases

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date'; // Handle invalid date cases

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 0) return 'Just now'; // Future timestamps (edge case)

  const timeIntervals = [
    { label: 'years', seconds: 31536000 },
    { label: 'months', seconds: 2592000 },
    { label: 'weeks', seconds: 604800 },
    { label: 'days', seconds: 86400 },
    { label: 'hours', seconds: 3600 },
    { label: 'minutes', seconds: 60 },
    { label: 'seconds', seconds: 1 },
  ];

  for (let interval of timeIntervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) return `${count} ${interval.label}`;
  }

  return 'Just now';
};
export const getFileName = (file, index) => {
  if (file?.altText && file.altText.trim()) {
    return file.altText;
  }
  return `Document ${index + 1}`;
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    return result === RESULTS.GRANTED;
  }

  return false;
};
