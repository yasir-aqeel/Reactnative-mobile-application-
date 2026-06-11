import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { CheckBox } from '../../../assets/svg';
import { formatMoney } from '../../../helpers/services';
import { calculateCommission } from '../../../helpers/FeeCalculation';
const CongratulationsOnBudgetIncreaseModal = ({ visible, onClose, state }) => {
  if (!visible || !state) {
    return null;
  }
  const changeOrderAmount = state?.changeOrders?.find(
    co => co.status === 'APPROVED',
  );
  const acceptedChangeOrderAmount = formatMoney(
    changeOrderAmount?.amount,
    changeOrderAmount?.currency ?? 'USD',
  );
  const acceptedBid = state?.bids?.find(b => b.status === 'ACCEPTED');

  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Congratulations'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.box}>
              <CheckBox style={{ height: 30, width: 30 }} fill={'#3DBE84'} />
            </View>
            <Text style={styles.message}>
              Job has been updated successfully and budget for this job has been
              increase by:
            </Text>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Budget increase by</Text>
              <Text style={styles.amountValue}>
                {acceptedChangeOrderAmount}
              </Text>
            </View>
            <Text style={styles.totalValue}>
              Fee : $
              {calculateCommission(Number(acceptedBid?.amount) * 100, 0, 0)
                .commissionCents / 100}{' '}
              • You will receive : $
              {calculateCommission(Number(acceptedBid?.amount) * 100, 0, 0)
                .netCents / 100}
            </Text>
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
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    lineHeight: Spacing.xl,
  },
  amountValue: {
    fontSize: 20,
    fontFamily: PopinsFont.medium,
    color: '#151515',
    lineHeight: Spacing.l,
  },
  box: {
    backgroundColor: '#ECF9F3',
    height: 64,
    width: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    borderColor: '#B2E5CE',
    borderWidth: 1,
  },
  totalValue: {
    color: '#009FD9',
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textAlign: 'center',
    fontFamily: PopinsFont.regular,
  },
});

export default CongratulationsOnBudgetIncreaseModal;
