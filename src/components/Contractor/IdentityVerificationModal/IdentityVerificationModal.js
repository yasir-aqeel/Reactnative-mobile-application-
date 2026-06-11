import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import styles from './style';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { Spacing } from '../../../helpers/sizeHelper';
import { IdentificationIcon } from '../../../assets/svg';
import Button from '../../Button';
import {
  hasInternet,
  identitySession,
  logoutCurrentSession,
} from '../../../helpers/services';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../helpers/ToastConfig';
import NavigationService from '../../../helpers/NavigationService';
import { logoutUser } from '../../../redux/actions/authActions';
const IdentityVerificationModal = ({ visible, onClose, state }) => {
  const userData = useSelector(state => state.auth.data.userData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  if (!visible || !state) {
    return null;
  }
  const handleIdentity = async () => {
    try {
      const internetStatus = await hasInternet();

      if (!internetStatus) {
        showToast('info', 'No Internet Connection');
        return;
      }

      setLoading(true);

      const identitySessionResponse = await identitySession(
        userData?.access_token,
      );
      console.log('identitySessionResponse', identitySessionResponse);
      if (identitySessionResponse?.url) {
        await Linking.openURL(identitySessionResponse.url);
        onClose();
      } else {
        showToast?.('error', 'Identity URL not found');
      }
    } catch (error) {
      console.log('FULL ERROR:', error);
      onClose();
      showToast('error', error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    onClose();
    NavigationService.reset([{ name: 'auth' }]);
    await logoutCurrentSession();
    showToast('success', 'Logout Successfully');
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={state.title} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.box}>
              <IdentificationIcon
                style={{ height: 50, width: 50 }}
                fill={'#009FD9'}
              />
            </View>
            <Text style={styles.message}>{state.description}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                Current Status: {userData?.user?.identityStatus}
              </Text>
            </View>
            <View style={styles.buttonRow}>
              <Button
                text={'Not Now'}
                height={44}
                width={'49%'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={() => {
                  handleLogout();
                }}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                color={'#2A2A2A'}
              />
              <Button
                text={loading ? '' : 'Verify identity'}
                height={44}
                width={'49%'}
                backgroundColor={'#009FD9'}
                color={loading ? 'transparent' : '#FFF'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={() => handleIdentity()}
                rightIcon={
                  loading ? (
                    <ActivityIndicator size={'small'} color={AppColor.white} />
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

export default IdentityVerificationModal;
