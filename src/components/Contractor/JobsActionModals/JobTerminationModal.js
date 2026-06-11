import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { CheckBox, Globe, InfoIcon } from '../../../assets/svg';
import Button from '../../Button';
import apiClient from '../../../helpers/apiClient';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
const JobTerminationModal = ({ visible, onClose, state }) => {
  const [settlementAmount, setSettlementAmount] = useState('');

  const [reason, setReason] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [jobActionLoading, setJobActionLoading] = useState(false);
  if (!visible || !state) {
    return null;
  }
  const jobTerminationHandeler = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      onClose();
      setTimeout(() => {
        showToast('info', 'No Internet Connection');
      }, 200);
      return;
    }
    try {
      setJobActionLoading(true);

      const { data } = await apiClient.post(`jobs/cancel/${state.id}`, {
        reason,
      });

      if (data && data?.message) {
        onClose();

        setTimeout(() => {
          showToast('success', data.message);
        }, 200);
      }
    } catch (err) {
      console.log(err);
      // showToast('error', 'Unable to fetch current location');
    } finally {
      setJobActionLoading(false);
    }
  };
  const acceptedBid = state?.bids?.find(b => b.status === 'ACCEPTED');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Job Termination'} onPress={() => onClose()} />
          <ScrollView
            pointerEvents={jobActionLoading ? 'none' : 'auto'}
            showsVerticalScrollIndicator={false}
          >
            <KeyboardAwareScrollView
              contentContainerStyle={styles.scrollContainer}
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              extraScrollHeight={70}
            >
              <Text style={styles.txt1}>Job Details</Text>

              <View style={styles.jobDetailsCard}>
                <View style={styles.jobTitleRow}>
                  <View>
                    <Text style={styles.title}>
                      {state.title}{' '}
                      <Text style={styles.highlight}>
                        {state.property?.name}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.budgetText}>Budget</Text>
                  </View>
                </View>
                <View style={styles.jobTitleRow}>
                  <View>
                    <View style={styles.tag}>
                      <Globe
                        style={{ height: 12, width: 12 }}
                        fill={'#009FD9'}
                      />
                      <Text style={styles.public}>Public</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.budget}>
                      ${acceptedBid?.amount} (Fixed)
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.infoNote}>
                <View style={styles.infoBox}>
                  <InfoIcon
                    style={{ height: 20, width: 20, right: 10 }}
                    fill={'#005F82'}
                  />
                  <Text style={styles.infoNoteText}>
                    Terminating this job will cancel all future payments, and
                    any unreleased funds will be refunded to the property owner.
                    Note: Funds already released to the contractor (such as the
                    down payment) cannot be automatically reversed by
                    Fixrli.Terminating this job will cancel all future payments,
                    and any unreleased funds will be refunded to the property
                    owner. Note: Funds already released to the contractor (such
                    as the down payment) cannot be automatically reversed by
                    Fixrli. Please propose a final settlement amount below for
                    the work completed. If the settlement is less than the
                    amount already released, the contractor must refund the
                    difference outside of the platform.
                  </Text>
                </View>
              </View>

              <Text style={styles.bill}>Billing Details</Text>
              <View style={styles.billingCard}>
                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>Total Amount:</Text>
                  <Text style={styles.billingValue}>
                    ${acceptedBid?.amount}
                  </Text>
                </View>
                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>
                    Released Down Payment:
                  </Text>
                  <Text style={styles.billingValue}>
                    ${state?.downPaymentAmount ?? 0}
                  </Text>
                </View>
              </View>

              <Text style={styles.proposed}>Proposed Settlement Amount</Text>
              <View style={styles.fieldGroup}>
                <View style={styles.amountInputWrapper}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.amountInput}
                    keyboardType="numeric"
                    value={settlementAmount}
                    onChangeText={setSettlementAmount}
                    placeholder="i.e.89"
                    returnKeyType="done"
                    placeholderTextColor={'#6A6A6A'}
                    textAlignVertical={'center'}
                  />
                </View>
              </View>

              {/* Message */}
              <View style={{ marginVertical: 5 }}>
                <Text style={styles.reason}>
                  Write Reason (This will not be shared with Property Owner)
                </Text>
                <TextInput
                  style={styles.textArea}
                  multiline
                  value={reason}
                  onChangeText={setReason}
                  placeholder="Write a message"
                  textAlignVertical="top"
                  placeholderTextColor={'#6A6A6A'}
                />
              </View>
              <View style={styles.termsView}>
                <TouchableOpacity
                  onPress={() => setTermsAccepted(!termsAccepted)}
                >
                  <CheckBox
                    style={{ height: 25, width: 25, top: 2 }}
                    fill={termsAccepted ? '#009FD9' : '#C3C3C3'}
                  />
                </TouchableOpacity>

                <View style={styles.row}>
                  <Text style={styles.accept}>
                    I accept all the{' '}
                    <TouchableOpacity>
                      <Text style={styles.termsText}>Term and Conditions</Text>
                    </TouchableOpacity>{' '}
                    for refund.
                  </Text>
                </View>
              </View>

              <View style={styles.buttonsContainer}>
                <Button
                  text={jobActionLoading ? '' : 'Terminate Job'}
                  backgroundColor={'#009FD9'}
                  borderRadius={Spacing.s}
                  height={44}
                  width={'100%'}
                  fontFamily={PopinsFont.regular}
                  fontSize={FontSizes.m}
                  lineHeight={Spacing.l}
                  color={jobActionLoading ? 'transparent' : '#FFF'}
                  onPress={jobTerminationHandeler}
                  leftIcon={
                    jobActionLoading ? (
                      <ActivityIndicator size={'small'} color={'#FFF'} />
                    ) : null
                  }
                />
              </View>
            </KeyboardAwareScrollView>
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

  jobDetailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: Spacing.s,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    width: '100%',
  },
  jobTitleRow: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // marginBottom: 8,
    flexDirection: 'row',
    width: '100%',
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
    lineHeight: Spacing.l,
  },
  infoNote: {
    backgroundColor: '#E6F6FC',
    borderWidth: 1,
    borderColor: '#009FD9',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    // marginBottom: 20,
  },
  infoNoteText: {
    fontSize: FontSizes.m,
    color: '#005F82',
    lineHeight: Spacing.l,
    fontFamily: PopinsFont.regular,
    textAlign: 'left',
    right: 7,
  },
  billingCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,

    width: '100%',
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  billingLabel: {
    fontSize: FontSizes.s,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  billingValue: {
    fontSize: FontSizes.m,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },

  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: Spacing.s,
    backgroundColor: '#F1F1F1',
    height: 44,
    overflow: 'hidden',
  },
  currencySymbol: {
    fontSize: FontSizes.m,
    color: '#6A6A6A',
    marginRight: 4,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  amountInput: {
    fontSize: FontSizes.m,
    color: '#6A6A6A',
    paddingVertical: 12,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
    backgroundColor: 'red',
    width: '100%',
    backgroundColor: '#F1F1F1',
    height: 50,
    marginLeft: 5,
    textAlignVertical: 'center',
  },

  textArea: {
    borderRadius: 12,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#F1F1F1',
    height: 80,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    minWidth: 110,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F3F8',
    borderWidth: 1,
    borderColor: '#DFE6EF',
  },
  cancelButtonText: {
    fontWeight: '600',
    color: '#334E6E',
  },
  terminateButton: {
    backgroundColor: '#E03A3A',
    shadowColor: '#E03A3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  terminateButtonText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tag: {
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
  txt1: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    marginBottom: 10,
  },
  public: {
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.m,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  proposed: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    marginVertical: 10,
  },
  reason: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
    fontSize: FontSizes.s,
    marginBottom: 5,
  },
  termsView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accept: {
    color: '#6A6A6A',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  termsText: {
    top: 5,
    color: '#CC7120',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  bill: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    marginVertical: 10,
  },
});

export default JobTerminationModal;
