import React, { useState } from 'react';
import { Modal, View, Text, TextInput, ScrollView } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import AppColor from '../../../helpers/AppColor';
import styles from './style';
import CustomSwitch from '../../CustomSwitch';
const AddNewBankAccountModal = ({ visible, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [makePrimary, setMakePrimary] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader
            title={'Add New Bank Account'}
            onPress={() => onClose()}
          />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.budgetInput}
                  placeholder="i.e. John Doe"
                  placeholderTextColor={'#6A6A6A'}
                  value={fullName}
                  onChangeText={setFullName}
                  cursorColor={AppColor.primaryBlue}
                  textAlignVertical="center"
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Account Number or IBAN</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.budgetInput}
                  placeholder="i.e. AB2943680723579323"
                  placeholderTextColor={'#6A6A6A'}
                  keyboardType="numeric"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  cursorColor={AppColor.primaryBlue}
                  textAlignVertical="center"
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>SWIFT/BIC</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.budgetInput}
                  placeholder="i.e. ABC99345"
                  placeholderTextColor={'#6A6A6A'}
                  keyboardType="numeric"
                  value={cvc}
                  onChangeText={setCvc}
                  cursorColor={AppColor.primaryBlue}
                  textAlignVertical="center"
                />
              </View>
            </View>
            <View style={styles.section}>
              <CustomSwitch
                value={makePrimary}
                onValueChange={value => setMakePrimary(value)}
                label="Make it primary payout bank"
                labelStyle={styles.label1}
              />
            </View>
            <View style={styles.row}>
              <Button
                text={'Not now'}
                backgroundColor={'#F1F1F1'}
                borderWidth={1}
                borderColor={'#E1E1E1'}
                height={44}
                width={'49%'}
                color={'#6A6A6A'}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                borderRadius={Spacing.s}
                onPress={() => onClose()}
              />
              <Button
                text={'Save Bank'}
                backgroundColor={'#009FD9'}
                height={44}
                width={'49%'}
                color={'#FFFFFF'}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                borderRadius={Spacing.s}
                onPress={() => onClose()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddNewBankAccountModal;
