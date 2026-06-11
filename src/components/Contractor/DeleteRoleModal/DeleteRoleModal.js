import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { DeleteIcon } from '../../../assets/svg';
import Button from '../../Button';
import { useDispatch, useSelector } from 'react-redux';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
import apiClient from '../../../helpers/apiClient';
const DeleteRoleModal = ({ visible, onClose, state }) => {
  const [loading, setLoading] = useState(false);
  if (!visible || !state) {
    return null;
  }
  const selectedRole = state?.selectedRole;
  const handleDeleteRole = async () => {
    try {
      const internetStatus = await hasInternet();
      if (!internetStatus) {
        onClose();
        showToast('info', 'No Internet Connection');
        return;
      }
      setLoading(true);
      const isRoleDeleted = await apiClient.delete(
        `contractor-roles/${selectedRole.id}`,
      );
      if (isRoleDeleted.status === 200 && isRoleDeleted.data.deleted) {
        // console.log('isRoleDeleted ', isRoleDeleted);
        onClose();
        showToast('success', 'Role Deleted Successfully');
        await state?.refreshAllRoles();
      }
    } catch (error) {
      console.log(error);
      onClose();
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
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Delete Role'} onPress={onClose} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.box}>
              <DeleteIcon style={{ height: 30, width: 30 }} fill={'#FF383C'} />
            </View>
            <Text style={styles.message}>
              Are you sure you want to delete {selectedRole?.name}? This action
              cannot be undone.
            </Text>

            <View style={styles.buttonRow}>
              <Button
                text={'Not Now'}
                height={44}
                width={'49%'}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                color={'#2A2A2A'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={onClose}
              />
              <Button
                text={loading ? '' : 'Delete'}
                height={44}
                width={'49%'}
                backgroundColor={'#FFECEC'}
                borderWidth={1}
                borderColor={'#FFD7D8'}
                color={loading ? 'transparent' : '#CC2D30'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={handleDeleteRole}
                leftIcon={
                  loading ? (
                    <ActivityIndicator size={'small'} color={'#CC2D30'} />
                  ) : null
                }
              />
            </View>
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
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    paddingVertical: 15,
  },

  message: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#151515',
    lineHeight: 23,
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#FFECED',
    borderColor: '#FFD7D8',
    height: 60,
    width: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
});

export default DeleteRoleModal;
