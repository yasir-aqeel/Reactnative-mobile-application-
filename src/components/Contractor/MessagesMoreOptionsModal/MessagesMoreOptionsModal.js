import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import ModalHeader from '../ModalHeader';
import { SendInvite, EmptyImage, FileIcon } from '../../../assets/svg';

import styles from './style';
const MessagesMoreOptionsModal = ({
  visible,
  onClose,
  handleImagePick,
  handleDocumentPick,
}) => {
  const options = [
    // {
    //   name: 'Send Invitation',
    //   icon: SendInvite,
    //   onPress: () => {},
    // },
    {
      name: 'Images',
      icon: EmptyImage,
      onPress: () => {
        handleImagePick();
      },
    },
    {
      name: 'Documents',
      icon: FileIcon,
      onPress: () => {
        handleDocumentPick();
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
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

export default MessagesMoreOptionsModal;
