import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
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
  ChangeOrder,
  CloseDrawer,
  EmptyImage,
  InfoIcon,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import PauseJobInChangeOrderModal from './PauseJobInChangeOrderModal';
const RequestChangeOrderModal = ({ visible, onClose, state }) => {
  const [images, setImages] = useState([]);
  const options = [
    {
      label: 'Unforeseen Damage',
      value: 'UNFORESEEN_DAMAGE',
    },
    { label: 'Customer Request', value: 'CUSTOMER_REQUEST' },
    { label: 'Increase Budget', value: 'INCREASE_BUDGET' },
    { label: 'Decrease Budget', value: 'DECREASE_BUDGET' },
    { label: 'Other', value: 'OTHER' },
  ];
  const [value, setValue] = useState(options[0].value);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [pauseJobModal, setPauseJobModal] = useState(false);

  const [evidencePhotos, setEvidencePhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobActionLoading, setJobActionLoading] = useState(false);
  const openImagePicker = usePicker('image', setImages, true);
  const openCamera = usePicker('camera', setImages, true);
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
    try {
      const uploadedImages = [];
      setLoading(true);
      for (const file of limitedImages) {
        const res = await uploadImage(file);

        if (res?.url) {
          uploadedImages.push(res.url);
        }
      }

      // ✅ USE LOCAL STATE ONLY
      setEvidencePhotos(prev => [...prev, ...uploadedImages]);
    } catch (err) {
      console.log('Upload error', err);
    } finally {
      setLoading(false);
    }
  };
  const removeImage = async index => {
    const image = evidencePhotos[index];

    if (!image) return;

    try {
      await deleteImage(image);

      setEvidencePhotos(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.log('Delete error', err);
    }
  };
  const removeAllImages = async () => {
    try {
      if (evidencePhotos.length > 0) {
        setLoading(true);
        await Promise.all(
          evidencePhotos.map(img => deleteImage(img).catch(() => {})),
        );

        setEvidencePhotos([]);
        setLoading(false);
      }
    } catch (err) {
      console.log('Delete all error', err);
    }
  };
  const onPauseJobSelect = async value => {
    setPauseJobModal(false);
    await handleRequestChangeOrder(value);
  };
  const handleRequestChangeOrder = async shouldPause => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }

    setJobActionLoading(true);

    try {
      const jobId = state?.id;

      const payload = {
        type: value,
        description: description?.trim() || '',
        amount: Number(amount),
        pauseJob: Boolean(shouldPause),
        evidencePhotos: evidencePhotos || [],
      };
      console.log('payload', payload);
      const { data } = await apiClient.post(
        `jobs/${jobId}/request-change-order`,
        payload,
      );
      console.log('change order response:', data);
      onClose();
      showToast('success', data?.message);
      return data;
    } catch (err) {
      console.log('change order error:', err);
      removeAllImages();
      setAmount('');
      setDescription('');

      setPauseJobModal(false);
      setLoading(false);
      setJobActionLoading(false);
      onClose();

      // showToast('error', err?.response?.data?.message);
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
            title={'Request Change Order'}
            onPress={() => onClose()}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={70}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 100,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.section}>
                <Text style={styles.changeText}>Change Order Type</Text>

                <View style={styles.dropDowncontainer}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={options}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Reason'}
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                  />
                </View>
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
                      <TouchableOpacity
                        onPress={() => handleImagePick('camera')}
                      >
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
                  {Array.isArray(evidencePhotos) &&
                    evidencePhotos.length > 0 &&
                    evidencePhotos.map((img, idx) => (
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

                {evidencePhotos.length > 0 && (
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
              <View style={styles.infoNote}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <InfoIcon
                    style={{ height: 18, width: 18, right: 10 }}
                    fill={'#005F82'}
                  />
                  <Text numberOfLines={10} style={styles.infoNoteText}>
                    You can accept or decline this change order. Declining may
                    result in the job being paused or terminated.
                  </Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Amount</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.budgetInput}
                    placeholder="i.e. 89"
                    placeholderTextColor={'#6A6A6A'}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    cursorColor={AppColor.primaryBlue}
                    textAlignVertical="center"
                  />
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Additional Note</Text>
                <TextInput
                  style={styles.noteInput}
                  placeholder="Add message related to change order"
                  placeholderTextColor={'#6A6A6A'}
                  multiline
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                  cursorColor={AppColor.primaryBlue}
                />
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
          <View style={{ paddingHorizontal: 10 }}>
            <Button
              text={jobActionLoading ? '' : 'Request Change order'}
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
                  <ActivityIndicator size={'small'} color={'#FFF'} />
                ) : (
                  <ChangeOrder style={styles.sideIcon} fill={'#FFFFFF'} />
                )
              }
              onPress={() => setPauseJobModal(true)}
            />
          </View>
        </View>
        <PauseJobInChangeOrderModal
          visible={pauseJobModal}
          onClose={() => setPauseJobModal(false)}
          setPauseJob={onPauseJobSelect}
        />
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

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#F1F1F1',
  },
  currencySymbol: {
    fontSize: 16,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    marginRight: 8,
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    padding: 0,
    height: 44,
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  calculationRow: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  calculationText: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#009FD9',
    lineHeight: Spacing.l,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    padding: 10,
    minHeight: 120,
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    color: '#2A2A2A',
    textAlignVertical: 'top',
    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  sideIcon: { height: 16, width: 16 },
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
  infoNoteText: {
    fontSize: FontSizes.s,
    color: '#005F82',
    lineHeight: Spacing.l,
    fontFamily: PopinsFont.regular,
    textAlign: 'left',
    right: 7,
  },
  changeText: {
    color: '#6A6A6A',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  //   dropdown
  dropDowncontainer: {
    paddingVertical: 10,
    width: '100%',
  },
  dropdown: {
    height: 44,
    borderRadius: Spacing.s,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 16,

    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  placeholderStyle: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default RequestChangeOrderModal;
