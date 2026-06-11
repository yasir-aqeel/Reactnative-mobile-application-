import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import AppColor from '../../../helpers/AppColor';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import Button from '../../Button';

const PauseJobInChangeOrderModal = ({ visible, onClose, setPauseJob }) => {
  const onNo = () => {
    setPauseJob(false);
    onClose();
  };
  const onYes = () => {
    setPauseJob(true);
    onClose();
  };

  if (!visible) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer]}>
          <ModalHeader title={'Pause This Job'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text
              style={{
                color: '#6A6A6A',
                fontSize: FontSizes.s,
                fontFamily: PopinsFont.regular,
                lineHeight: Spacing.l,
              }}
            >
              Do you want to pause this job while the change order is requested?
            </Text>

            <View style={styles.buttonRow}>
              <Button
                text={'Pause'}
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
                onPress={onYes}
              />
              <Button
                text={'No'}
                height={44}
                width={'49%'}
                backgroundColor={'#009FD9'}
                color={'#FFF'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={onNo}
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
    // paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default PauseJobInChangeOrderModal;
