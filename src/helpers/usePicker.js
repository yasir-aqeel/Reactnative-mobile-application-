import { useCallback } from 'react';
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
} from '@react-native-documents/picker';
import ImagePicker from 'react-native-image-crop-picker';
import { requestCameraPermission } from './services';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
export const usePicker = (type, setData, multiple = false) => {
  const openPicker = useCallback(async () => {
    try {
      // =========================================
      // CAMERA (NEW)
      // =========================================
      if (type === 'camera') {
        const hasPermission = await requestCameraPermission();

        if (!hasPermission) {
          console.warn('Camera permission denied');
          return [];
        }
        const response = await ImagePicker.openCamera({
          width: width,
          height: width * 1.5, // or width * 1.2 depending on UI
          cropping: true,
          compressImageQuality: 0.8,
          mediaType: 'photo',
        });

        if (!response) return [];

        const formattedImage = {
          uri: response.path,
          type: response.mime,
          name: response.filename || `camera_${Date.now()}.jpg`,
          size: response.size,
        };

        setData(prev => [...(prev || []), formattedImage]);

        return [formattedImage];
      }

      // =========================================
      // IMAGE PICKER (GALLERY)
      // =========================================
      if (type === 'image') {
        const response = await ImagePicker.openPicker({
          width: width,
          height: width * 1.5, // or width * 1.2 depending on UI
          cropping: !multiple,
          compressImageQuality: 0.8,
          mediaType: 'photo',
          multiple,
          maxFiles: 5,
        });

        if (!response) return [];

        // MULTIPLE IMAGES
        if (multiple && Array.isArray(response)) {
          const formattedImages = response.map(image => ({
            uri: image.path,
            type: image.mime,
            name: image.filename || `image_${Date.now()}.jpg`,
            size: image.size,
          }));

          setData(prev => [...(prev || []), ...formattedImages]);

          return formattedImages;
        }

        // SINGLE IMAGE
        const formattedImage = {
          uri: response.path,
          type: response.mime,
          name: response.filename || `image_${Date.now()}.jpg`,
          size: response.size,
        };

        setData(prev => [...(prev || []), formattedImage]);

        return [formattedImage];
      }

      // =========================================
      // DOCUMENT PICKER
      // =========================================
      const pickResults = await pick({
        allowMultiSelection: multiple,
        type: [types.pdf, types.doc, types.docx],
        mode: 'open',
      });

      if (!pickResults || pickResults.length === 0) {
        return [];
      }

      const formattedDocs = pickResults.map(file => ({
        uri: file.uri,
        type: file.type,
        name: file.name,
        size: file.size,
      }));

      setData(prev => [...(prev || []), ...formattedDocs]);

      return formattedDocs;
    } catch (err) {
      if (type === 'camera' && err?.code === 'E_PICKER_CANCELLED') {
        console.log('Camera cancelled');
        return [];
      }

      if (type === 'image' && err?.code === 'E_PICKER_CANCELLED') {
        console.log('Image picker cancelled');
        return [];
      }

      if (isErrorWithCode(err)) {
        switch (err.code) {
          case errorCodes.IN_PROGRESS:
            console.warn('Picker already in progress');
            break;

          case errorCodes.OPERATION_CANCELED:
            console.log('Picker canceled');
            break;

          default:
            console.error('Picker error:', err);
        }
      } else {
        console.error('Unknown picker error:', err);
      }

      return [];
    }
  }, [multiple, setData, type]);

  return openPicker;
};
