import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import CustomSwitch from '../../CustomSwitch';
import Button from '../../Button';
import styles from './styles';
import { hasInternet } from '../../../helpers/services';
import apiClient from '../../../helpers/apiClient';
import { showToast } from '../../../helpers/ToastConfig';
const AddNewRoleModal = ({ visible, onClose, state }) => {
  const [isDefault, setIsDefault] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (visible) {
      setName(state?.name || '');
      setIsDefault(state?.isDefault || false);
    }
  }, [visible, state]);
  const isUpdating = state?.isUpdating;
  if (!visible || !state) {
    return null;
  }
  const handleSubmit = async () => {
    try {
      const internetStatus = await hasInternet();
      if (!internetStatus) {
        showToast('info', 'No Internet Connection');
        return;
      }

      setLoading(true);

      const payload = {
        name: name.trim(),
        isDefault,
      };

      let response;

      if (isUpdating) {
        response = await apiClient.patch(
          `contractor-roles/${state.id}`,
          payload,
        );
      } else {
        response = await apiClient.post('contractor-roles', payload);
      }

      if (response?.status >= 200 && response?.status < 300) {
        showToast(
          'success',
          isUpdating
            ? 'Role updated successfully.'
            : 'Role added successfully.',
        );

        onClose();
      }
    } catch (error) {
      console.log(error);

      showToast(
        'error',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay} activeOpacity={1}>
        <View style={styles.modalContainer}>
          <ModalHeader
            title={isUpdating ? 'Update Role' : 'Add New Role'}
            onPress={() => onClose()}
          />

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputView}>
              <TextInput
                style={styles.textArea}
                placeholder="Enter Role Name"
                placeholderTextColor={'#6A6A6A'}
                value={name}
                onChangeText={text => setName(text)}
                textAlignVertical="center"
                textAlign="left"
                cursorColor={AppColor.primaryBlue}
              />
            </View>
            <View style={styles.view1}>
              <View>
                <Text style={styles.defaultText}>Default Role</Text>
                <Text style={styles.defaultTextValue}>
                  Select this role by default in the roles list.
                </Text>
              </View>

              <CustomSwitch
                value={isDefault}
                onValueChange={value => setIsDefault(value)}
              />
            </View>
            <View style={styles.buttonRow}>
              <Button
                text={'Not Now'}
                color={'#2A2A2A'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                height={44}
                borderRadius={12}
                width={'49%'}
                onPress={() => onClose()}
              />
              <Button
                text={loading ? '' : isUpdating ? 'Update Role' : 'Add Role'}
                color={loading ? 'transparent' : '#FFF'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                backgroundColor={'#009FD9'}
                height={44}
                borderRadius={12}
                width={'49%'}
                leftIcon={
                  loading ? (
                    <ActivityIndicator size={'small'} color={'#FFF'} />
                  ) : null
                }
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddNewRoleModal;
