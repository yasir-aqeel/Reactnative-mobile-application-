import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import ModalHeader from './ModalHeader';
import {
  ActiveBids,
  Invites,
  Teams,
  Reviwes,
  LinkedBank,
  SettingsIcon,
} from '../../assets/svg';
import { useNavigation } from '@react-navigation/native';
import AppColor from '../../helpers/AppColor';

const MoreBottomSheet = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const options = [
    {
      name: 'My Bids',
      icon: ActiveBids,
      onPress: () => {
        navigation.navigate('MyBids');
      },
    },
    {
      name: 'Invitations',
      icon: Invites,
      onPress: () => {
        navigation.navigate('Invitations');
      },
    },
    {
      name: 'Team',
      icon: Teams,
      onPress: () => {
        navigation.navigate('Teams');
      },
    },
    {
      name: 'Reviwes',
      icon: Reviwes,
      onPress: () => {
        navigation.navigate('Reviews');
      },
    },
    {
      name: 'Linked Banks',
      icon: LinkedBank,
      onPress: () => {
        navigation.navigate('LinkBankAccount');
      },
    },
    {
      name: 'Settings',
      icon: SettingsIcon,
      onPress: () => {
        navigation.navigate('Settings');
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <ModalHeader title={'More'} onPress={onClose} />

          <View style={styles.optionsGrid}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => {
                  option.onPress();
                  onClose();
                }}
              >
                <option.icon
                  style={{ height: 25, width: 25 }}
                  fill={'#888888'}
                />
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 50,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: '#F1F1F1',
  },
  title: {
    fontSize: FontSizes.l,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  optionItem: {
    width: '32%', // 3 items per row
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingVertical: Spacing.xs,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    height: 85,
  },
  optionText: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.medium,
    color: '#888888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MoreBottomSheet;
