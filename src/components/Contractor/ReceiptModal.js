import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import AppColor from '../../helpers/AppColor';
import ModalHeader from './ModalHeader';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { CopyIcon, CurvedArrow, Globe, MessageIcon } from '../../assets/svg';
import { getStatusLabel, statusColors } from '../../helpers/Data';
import { handleCopyText } from '../../helpers/services';
const Info = ({ label, value, showDot }) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {showDot && (
          <View
            style={{
              height: 11,
              width: 11,
              borderRadius: 10,
              backgroundColor: statusColors[value?.toUpperCase()],
            }}
          />
        )}

        <Text numberOfLines={1} style={styles.infoValue}>
          {showDot ? getStatusLabel(value) : value}
        </Text>
      </View>
    </View>
  );
};
const ReceiptModal = ({ visible, onClose, state }) => {
  if (!visible || !state) {
    return null;
  }
  // console.log('=====', state);
  const jobData = {
    title: 'Cleaning Job at',
    visibility: 'Public',
    budget: 89,
    totalAmount: 89,
    releasedDownPayment: 45,
    location: 'Farmhouse',
    jobId: '9209F5F',
  };
  const paymentArray = [
    {
      name: 'Job Payment',
      value: `$${state?.jobAmount || 0}`,
      id: 'Job Payment',
    },
    // {
    //   name: 'Change order',
    //   value: `$${state?.jobAmount || 0}`,
    //   id: 'Change order',
    // },
    {
      name: 'Platform Fee',
      value: `$${state?.fixrliFee || 0}`,
      id: 'Platform Fee',
    },
    // {
    //   name: 'Tax or GST',
    //   value: '$9.78',
    //   id: 'Tax or GST',
    // },
    // {
    //   name: 'Down Payment',
    //   value: '-$30',
    //   id: 'Down Payment',
    // },
  ];
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Receipt'} onPress={() => onClose()} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollContainer}>
              <Text style={styles.label}>Job Details</Text>

              <View style={styles.jobDetailsCard}>
                <View style={styles.jobTitleRow}>
                  <View>
                    <Text style={styles.title}>
                      {state?.jobTitle}{' '}
                      {/* <Text style={styles.highlight}>{jobData.location}</Text> */}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.budgetText}>Budget</Text>
                  </View>
                </View>
                <View style={styles.jobTitleRow}>
                  <View style={styles.topRow}>
                    <View style={styles.globe}>
                      <Globe
                        style={{ height: 12, width: 12 }}
                        fill={'#009FD9'}
                      />
                      <Text style={styles.public}>Public</Text>
                    </View>
                    <View style={styles.grayView}>
                      <Text style={styles.grayText}>{state?.displayId}</Text>
                      <CurvedArrow style={{ height: 11, width: 11 }} />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.budget}>
                      ${state?.jobAmount} (Fixed)
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.jobDetailsCard}>
                <View style={styles.jobTitleRow}>
                  <View>
                    <Text style={styles.label}>Property Owner</Text>
                    <Text style={styles.budget}>{state?.customer}</Text>
                  </View>
                  <View style={styles.messageContainer}>
                    {/* <MessageIcon
                      style={{ height: 22, width: 22 }}
                      fill={'#000000'}
                    /> */}
                  </View>
                </View>
              </View>

              <Text style={styles.label}>Type & Status</Text>
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Info label="Status" value={state?.status} showDot={true} />
                  <Info label="Type" value={'Contractor Payout'} />
                </View>
                <View style={styles.datetime}>
                  <Text style={styles.label}>Date & Time</Text>
                  <Text style={styles.budget}>
                    {moment(state?.payoutDate).format('MM/DD/YYYY, HH:mm')}
                  </Text>
                </View>
              </View>

              <Text style={styles.label}>Billing Details</Text>
              <View style={styles.rowContainer}>
                {paymentArray.map((payment, index) => {
                  return (
                    <View style={styles.row}>
                      <Text style={styles.payment}>{payment.name}</Text>
                      <Text style={styles.payment}>{payment.value}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalAmount}>${state?.netPayout || 0}</Text>
              </View>
              <Text style={styles.label}>Transaction Details</Text>
              <View style={styles.jobDetailsCard}>
                <Text style={styles.label}>Transaction ID</Text>

                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    gap: 5,
                  }}
                >
                  <Text style={styles.budget}>{state?.jobId || 'N/A'}</Text>
                  <TouchableOpacity
                    onPress={() => handleCopyText('cmkldw02u0019s60dn82gzvig')}
                  >
                    <CopyIcon
                      style={{ height: 18, width: 18 }}
                      fill={'#6A6A6A'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '90%',
    paddingVertical: 15,
    width: '100%',
  },
  label: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    marginBottom: 12,
  },
  jobDetailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: Spacing.s,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    width: '100%',
    marginBottom: 12,
  },
  jobTitleRow: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  globe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    backgroundColor: '#FFF',
    borderRadius: Spacing.s,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.xs,
    width: 75,
    alignSelf: 'flex-start',
    marginVertical: 5,
    gap: 5,
  },
  public: {
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.m,
  },
  title: {
    color: '#2A2A2A',
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
  },

  highlight: {
    color: '#009FD9',
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },

  budgetText: {
    fontSize: FontSizes.s,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  budget: {
    fontSize: FontSizes.m,
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    lineHeight: Spacing.xl,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },

  grayView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    width: '100%',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  infoBox: {
    paddingHorizontal: Spacing.xs,
    borderRightWidth: 1,
    borderColor: '#E1E1E1',
    width: '50%',
  },

  infoLabel: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    paddingTop: 10,
  },

  infoValue: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.s,
    color: AppColor.textColor,
    fontFamily: PopinsFont.medium,
    paddingVertical: 10,
  },
  rowContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: Spacing.s,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payment: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  totalView: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: Spacing.s,
  },
  totalText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
  },
  totalAmount: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.l,
    lineHeight: Spacing.l,
  },
  datetime: {
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
    padding: Spacing.xs,
  },
  messageContainer: { alignItems: 'center', alignSelf: 'center' },
  grayText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
});

export default ReceiptModal;
