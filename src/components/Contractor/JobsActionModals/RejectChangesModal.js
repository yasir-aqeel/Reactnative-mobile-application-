import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import Button from '../../Button';
import { Dropdown } from 'react-native-element-dropdown';
import { RejectIcon } from '../../../assets/svg';

const RejectChangesModal = ({ visible, onClose, state }) => {
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [message, setMessage] = useState('');
  if (!visible || !state) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer]}>
          <ModalHeader title={'Reject Changes '} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                color: '#6A6A6A',
                fontSize: FontSizes.s,
                fontFamily: PopinsFont.regular,
                lineHeight: Spacing.l,
              }}
            >
              Reason of no accepting change order
            </Text>

            <View style={styles.dropDowncontainer}>
              <Dropdown
                disable={true}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Reason'}
                value={value}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <Text
              style={{
                color: '#6A6A6A',
                fontSize: FontSizes.s,
                fontFamily: PopinsFont.regular,
                lineHeight: Spacing.l,
                marginBottom: 10,
              }}
            >
              Notes (Optional)
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              value={message}
              onChangeText={setMessage}
              placeholder="Write a message"
              textAlignVertical="top"
              placeholderTextColor={'#6A6A6A'}
            />
            <View style={styles.buttonRow}>
              <Button
                text={'Reject'}
                height={44}
                width={'49%'}
                backgroundColor={'#FFECEC'}
                borderColor={'#FFD7D8'}
                borderWidth={1}
                color={'#CC2D30'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                leftIcon={
                  <RejectIcon
                    style={{ height: 20, width: 20 }}
                    fill={'#CC2D30'}
                  />
                }
              />
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
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    width: '100%',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  //   dropdown
  dropDowncontainer: {
    paddingVertical: 10,
    width: '100%',
  },
  dropdown: {
    height: 44,
    borderRadius: Spacing.s,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 16,

    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  placeholderStyle: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
});

export default RejectChangesModal;
