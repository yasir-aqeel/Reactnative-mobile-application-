import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import ModalHeader from '../ModalHeader';
import {
  CameraIcon,
  CloseDrawer,
  DoubleCheck,
  EmptyImage,
  ResumeIcon,
  UploadIcon,
} from '../../../assets/svg';
import Button from '../../Button';
import AppColor from '../../../helpers/AppColor';
import { usePicker } from '../../../helpers/usePicker';
import { showToast } from '../../../helpers/ToastConfig';
import {
  deleteImage,
  hasInternet,
  uploadImage,
} from '../../../helpers/services';
import apiClient from '../../../helpers/apiClient';
const PhotosBeforeJobCompleteModal = ({ visible, onClose, state }) => {
  const [images, setImages] = useState([]);
  const openImagePicker = usePicker('image', setImages, true);
  const openCamera = usePicker('camera', setImages, true);
  const [afterPhotos, setAfterPhotos] = useState([]);
  const [jobActionLoading, setJobActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!visible || !state) {
    return null;
  }
  const handleImagePick = async type => {
    let pickedImages = [];
    if (type === 'camera') {
      pickedImages = await openCamera();
    } else {
      pickedImages = await openImagePicker();
    }

    if (!pickedImages?.length) return;

    const validImages = pickedImages.filter(img => img.size <= 2 * 1024 * 1024);

    const oversized = pickedImages.filter(img => img.size > 2 * 1024 * 1024);

    if (oversized.length) {
      showToast('info', `${oversized[0]?.name || 'File'} must be ≤ 2MB`);
    }

    const limitedImages = validImages.slice(0, 5);

    if (validImages.length > 5) {
      showToast('info', 'Maximum 5 images allowed');
      return;
    }

    const isConnected = await hasInternet();
    if (!isConnected) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }
    setLoading(true);
    try {
      const uploadedImages = [];

      for (const file of limitedImages) {
        const res = await uploadImage(file);

        if (res?.url) {
          uploadedImages.push(res.url);
        }
      }

      // ✅ USE LOCAL STATE ONLY
      setAfterPhotos(prev => [...prev, ...uploadedImages]);
    } catch (err) {
      console.log('Upload error', err);
    } finally {
      setLoading(false);
    }
  };
  const removeImage = async index => {
    const image = beforePhotos[index];

    if (!image) return;

    try {
      await deleteImage(image);

      setAfterPhotos(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.log('Delete error', err);
    }
  };
  const removeAllImages = async () => {
    try {
      if (afterPhotos.length > 0) {
        await Promise.all(
          afterPhotos.map(img => deleteImage(img).catch(() => {})),
        );
        setAfterPhotos([]);
      }
    } catch (err) {
      console.log('Delete all error', err);
    }
  };

  const handleCompleteJob = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }
    if (!afterPhotos || afterPhotos.length === 0) {
      onClose();
      showToast('info', 'Submit Photos Before Starting the Job');
      return;
    }
    setJobActionLoading(true);

    try {
      const payload = {
        jobId: state.id,
        afterPhotos,
      };
      const { data } = await apiClient.post(`jobs/complete-job`, payload);

      if (data && data.message) {
        onClose();
        setAfterPhotos([]);
        setTimeout(() => {
          showToast('success', data.message);
        }, 500);
      }
      return data;
    } catch (err) {
      console.log(err, 'Could not start this job.');
    } finally {
      setJobActionLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View
          pointerEvents={loading ? 'none' : 'auto'}
          style={styles.modalContainer}
        >
          <ModalHeader
            title={'Photos Before Job Complete'}
            onPress={() => {
              onClose();
              removeAllImages();
            }}
          />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.label}>Upload Images</Text>
              <View style={styles.imagePickerButton}>
                {loading ? (
                  <ActivityIndicator size={'small'} color={'#2A2A2A'} />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 20,
                      width: '50%',
                      alignSelf: 'center',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleImagePick('gallery')}
                    >
                      <EmptyImage style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleImagePick('camera')}>
                      <CameraIcon style={{ height: 35, width: 35 }} />
                    </TouchableOpacity>
                  </View>
                )}

                <Text style={styles.imagePickerText}>
                  Select Images from gallery or take photos with camera
                </Text>
                <Text style={styles.imagePickerNote}>
                  Max. 5 images & image size is 2MB
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imagesRow}
              >
                {Array.isArray(afterPhotos) &&
                  afterPhotos.length > 0 &&
                  afterPhotos.map((img, idx) => (
                    <View key={idx} style={styles.imageThumbnail}>
                      <Image
                        source={{
                          uri: img,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                      />

                      <TouchableOpacity
                        style={styles.removeImageBtn}
                        onPress={() => removeImage(idx)}
                      >
                        <CloseDrawer
                          style={{ height: 13, width: 13 }}
                          fill="#151515"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
              </ScrollView>

              {afterPhotos.length > 0 && (
                <Button
                  text={'Remove all'}
                  onPress={removeAllImages}
                  backgroundColor={'#F7F7F7'}
                  borderColor={'#E1E1E1'}
                  borderWidth={1}
                  color={'#151515'}
                  fontFamily={PopinsFont.regular}
                  fontSize={FontSizes.m}
                  lineHeight={Spacing.m}
                  width={'100%'}
                  height={44}
                  marginVertical={10}
                  borderRadius={Spacing.s}
                />
              )}
            </View>
            <Button
              text={jobActionLoading ? '' : 'Complete Job'}
              backgroundColor={'#009FD9'}
              height={44}
              width={'100%'}
              color={jobActionLoading ? 'transparent' : '#FFFFFF'}
              fontFamily={PopinsFont.regular}
              fontSize={FontSizes.s}
              lineHeight={Spacing.xl}
              borderRadius={Spacing.s}
              leftIcon={
                jobActionLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  <DoubleCheck style={styles.sideIcon} fill={'#FFFFFF'} />
                )
              }
              onPress={() => handleCompleteJob()}
              marginVertical={10}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    width: '100%',
    maxHeight: '90%',
  },
  title: {
    fontSize: 20,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    marginBottom: 8,
    lineHeight: Spacing.l,
  },
  imagePickerButton: {
    borderWidth: 2,
    borderColor: '#C3C3C3',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderStyle: 'dashed',
    height: 160,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imagePickerText: {
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.medium,
    color: '#6A6A6A',
    marginTop: 8,
    textAlign: 'center',
  },
  imagePickerNote: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    marginTop: 4,
  },
  imagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeImageBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  sideIcon: { height: 18, width: 18 },
  infoNote: {
    backgroundColor: '#E6F6FC',
    borderWidth: 1,
    borderColor: '#009FD9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
});

export default PhotosBeforeJobCompleteModal;
