import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';

import AppColor from '../../helpers/AppColor';
import ModalHeader from './ModalHeader';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { StripeIcon } from '../../assets/svg';
import Button from '../Button';
import {
  hasInternet,
  logoutCurrentSession,
  urlStripe,
} from '../../helpers/services';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../helpers/ToastConfig';
import { useNavigation } from '@react-navigation/native';
import NavigationService from '../../helpers/NavigationService';
import { logoutUser } from '../../redux/actions/authActions';
const StripeSetupModal = ({ visible, onClose, onDiscard }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const token = userData?.access_token;
  const [loading, setLoading] = useState(false);
  if (!visible) {
    return null;
  }
  const handleSetupAccount = async () => {
    try {
      const internetStatus = await hasInternet?.();

      if (!internetStatus) {
        showToast?.('info', 'No Internet Connection');
        return;
      }

      setLoading(true);

      const stripeUrl = await urlStripe?.(token);

      if (stripeUrl?.url) {
        await Linking.openURL(stripeUrl.url);
        onClose();
      } else {
        showToast?.('error', 'Stripe URL not found');
      }
    } catch (error) {
      console.log('FULL ERROR:', error);
      showToast('error', 'Something went wrong');
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
          <ModalHeader title={'Account Setup'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.box}>
              <StripeIcon style={{ width: 100, height: 100 }} />
            </View>
            <Text style={styles.message}>
              You have received the offers and are able to view them. Please
              connect your{' '}
              <Text
                style={{
                  backgroundColor: 'yellow',
                  fontFamily: PopinsFont.medium,
                }}
              >
                Stripe
              </Text>{' '}
              account to proceed.
            </Text>

            <View style={styles.buttonRow}>
              <Button
                text={loading ? '' : 'Connect Now'}
                height={44}
                width={'49%'}
                backgroundColor={'#009FD9'}
                color={loading ? 'transparent' : '#FFF'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={() => handleSetupAccount()}
                rightIcon={
                  loading ? (
                    <ActivityIndicator size={'small'} color={AppColor.white} />
                  ) : null
                }
              />
              <Button
                text={'Cancel'}
                height={44}
                width={'49%'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={() => handleLogout()}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                color={'#2A2A2A'}
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
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#151515',
    lineHeight: Spacing.l,
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
    borderRadius: Spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default StripeSetupModal;
