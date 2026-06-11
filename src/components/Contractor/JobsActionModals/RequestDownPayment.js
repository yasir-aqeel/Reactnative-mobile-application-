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
import { InfoIcon } from '../../../assets/svg';
import Button from '../../Button';
import { numericValue } from '../../../helpers/Data';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
import apiClient from '../../../helpers/apiClient';
const RequestDownPayment = ({ visible, onClose, state }) => {
  if (!visible || !state) {
    return null;
  }
  const [loading, setLoading] = useState(false);
  const bidAmount = numericValue(state.bids?.[0]?.amount, 0);

  const downPaymentAmount = Math.round(bidAmount * 0.5);

  const handleRequestDownPayment = async () => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }

    setLoading(true);

    try {
      const jobId = state?.id;

      const { data } = await apiClient.post(
        `jobs/${jobId}/request-down-payment`,
        {},
      );

      onClose();
      console.log('Down payment response:', data);
      showToast('success', data?.message);

      return data;
    } catch (err) {
      console.log('Down payment error:', err);
      onClose();
      showToast('error', err?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader
            title={'Down Payment Request'}
            onPress={() => onClose()}
          />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                backgroundColor: '#E6F6FC',
                height: 100,
                width: 100,
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 16,
              }}
            >
              <InfoIcon style={{ height: 40, width: 40 }} fill={'#009FD9'} />
            </View>
            <Text style={styles.message}>
              <Text style={styles.amountLabel}>Important :</Text> Request for a
              down payment will release 50% of the net payout for the job. The
              owner reserves the right to not release the down payment.
            </Text>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Down Payment</Text>
              <Text style={styles.amountValue}>${downPaymentAmount}</Text>
            </View>
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
                text={loading ? '' : 'Request'}
                height={44}
                width={'49%'}
                backgroundColor={'#009FD9'}
                color={loading ? 'transparent' : '#FFF'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={() => handleRequestDownPayment()}
                leftIcon={
                  loading ? (
                    <ActivityIndicator size={'small'} color={'#FFF'} />
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
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    padding: Spacing.s,
    width: '100%',
  },
  amountLabel: {
    fontSize: 16,
    fontFamily: PopinsFont.medium,
    color: '#6A6A6A',
    lineHeight: Spacing.l,
  },
  amountValue: {
    fontSize: 20,
    fontFamily: PopinsFont.medium,
    color: '#151515',
    lineHeight: Spacing.l,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
});

export default RequestDownPayment;
