import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AppColor from '../../helpers/AppColor';
import ModalHeader from './ModalHeader';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { RedCross } from '../../assets/svg';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { hasInternet } from '../../helpers/services';
import { showToast } from '../../helpers/ToastConfig';
import { withdrawBid } from '../../redux/actions/contractorActions';
import { useNavigation } from '@react-navigation/native';
const WithdrawBidModal = ({ visible, onClose, state }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const [loading, setLoading] = useState(false);
  const userId = userData?.user?.id;
  const handleWithdrawBid = async bid => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }
    if (!bid?.status === 'PENDING') {
      showToast('info', 'Not able to Withdraw');
      return;
    }
    setLoading(true);
    try {
      const isBidWithdrawn = await dispatch(withdrawBid(bid?.id, userId));
      // console.log('isBidWithdrawn', isBidWithdrawn);

      if (isBidWithdrawn.status === 200 && isBidWithdrawn?.data?.id) {
        if (bid?.refreshBids) {
          await bid.refreshBids();
        }
        onClose();
        setTimeout(() => {
          showToast('success', 'Bid Withdraw Successfully');
        }, 500);
      }
    } catch (error) {
      showToast('error', error.message);
      console.log('handleWithdrawBid error', error);
      onClose();
    } finally {
      setLoading(false);
    }
  };
  const selectedBid = state;
  if (!visible || !selectedBid) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Withdraw Bid'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.box}>
              <RedCross style={{ height: 30, width: 30 }} fill={'#FF383C'} />
            </View>
            <Text style={styles.message}>
              Are you share to withdraw the bid?
            </Text>

            <View style={styles.buttonRow}>
              <Button
                text={loading ? '' : 'Withdraw'}
                height={44}
                width={'49%'}
                backgroundColor={'#FFECEC'}
                borderColor={'#FFD7D8'}
                borderWidth={1}
                color={loading ? 'transparent' : '#CC2D30'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={() => handleWithdrawBid(selectedBid)}
                rightIcon={
                  loading ? (
                    <ActivityIndicator size={'small'} color={'#CC2D30'} />
                  ) : null
                }
              />
              <Button
                text={'Cancel'}
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
                onPress={() => onClose()}
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

export default WithdrawBidModal;
