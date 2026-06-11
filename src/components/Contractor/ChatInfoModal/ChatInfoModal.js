import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ModalHeader from '../ModalHeader';
import { CheckBox, Globe, InfoIcon } from '../../../assets/svg';
import Button from '../../Button';
import apiClient from '../../../helpers/apiClient';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
import styles from './style';
const ChatInfoModal = ({ visible, onClose, state }) => {
  const [settlementAmount, setSettlementAmount] = useState('');
  const [reason, setReason] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!visible || !state) {
    return null;
  }
  useEffect(() => {
    getChatDetails();
  }, [visible]);
  const getChatDetails = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      onClose();
      setTimeout(() => {
        showToast('info', 'No Internet Connection');
      }, 200);
      return;
    }
    try {
      setLoading(true);
      const chatDetails = await apiClient.get(
        `chat/thread/${state?.currentChat?.jobId}/info`,
      );
      console.log('chatDetails', chatDetails);
    } catch (err) {
      console.log(err);
      // showToast('error', 'Unable to fetch current location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Conversation info'} onPress={() => onClose()} />
          <ScrollView
            pointerEvents={loading ? 'none' : 'auto'}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.jobDetailsCard}>
              <View style={styles.jobTitleRow}>
                <View>
                  <Text style={styles.title}>
                    12345 <Text style={styles.highlight}>123456</Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.budgetText}>Budget</Text>
                </View>
              </View>
              <View style={styles.jobTitleRow}>
                <View>
                  <View style={styles.tag}>
                    <Globe style={{ height: 12, width: 12 }} fill={'#009FD9'} />
                    <Text style={styles.public}>Public</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.budget}>$10 (Fixed)</Text>
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
                  Terminating this job will cancel all future payments, and any
                  unreleased funds will be refunded to the property owner. Note:
                  Funds already released to the contractor (such as the down
                  payment) cannot be automatically reversed by
                  Fixrli.Terminating this job will cancel all future payments,
                  and any unreleased funds will be refunded to the property
                  owner. Note: Funds already released to the contractor (such as
                  the down payment) cannot be automatically reversed by Fixrli.
                  Please propose a final settlement amount below for the work
                  completed. If the settlement is less than the amount already
                  released, the contractor must refund the difference outside of
                  the platform.
                </Text>
              </View>
            </View>

            <Text style={styles.bill}>Billing Details</Text>
            <View style={styles.billingCard}>
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Total Amount:</Text>
                <Text style={styles.billingValue}>$10</Text>
              </View>
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Released Down Payment:</Text>
                <Text style={styles.billingValue}>$0</Text>
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
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ChatInfoModal;
