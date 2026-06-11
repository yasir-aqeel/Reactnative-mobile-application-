import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { RedCross } from '../../../assets/svg';
import Button from '../../Button';
const WithdrawDownpaymntRequestModal = ({ visible, onClose, state }) => {
  if (!visible || !state) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Withdraw request'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                backgroundColor: '#FFECED',
                borderColor: '#FFD7D8',
                height: 60,
                width: 60,
                borderRadius: 26,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 16,
                borderWidth: 1,
              }}
            >
              <RedCross style={{ height: 30, width: 30 }} fill={'#FF383C'} />
            </View>
            <Text style={styles.message}>
              Are you sure you want to withdraw down payment request?
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
                onPress={() => onClose()}
              />
              <Button
                text={'Withdraw'}
                height={44}
                width={'49%'}
                backgroundColor={'#009FD9'}
                color={'#FFF'}
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
});

export default WithdrawDownpaymntRequestModal;
