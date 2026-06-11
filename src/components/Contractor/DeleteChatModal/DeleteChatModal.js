import React from 'react';
import { Modal, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import ModalHeader from '../ModalHeader';
import { PopinsFont } from '../../../helpers/Fonts';
import { Spacing } from '../../../helpers/sizeHelper';
import { DeleteIcon } from '../../../assets/svg';
import Button from '../../Button';
import { useDispatch, useSelector } from 'react-redux';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';

import styles from './style';
import { deleteChatThread } from '../../../redux/actions/chatActions';
const DeleteChatModal = ({ visible, onClose, state }) => {
  const dispatch = useDispatch();

  const { loadingChats } = useSelector(state => state.chat.loadingChats);
  const { selectedChatPerson, selectedChatId } = useSelector(
    state => state.chat,
  );
  if (!visible || !state) {
    return null;
  }
  const handleDeleteChat = async () => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }

    try {
      const deleteChatResponse = await dispatch(
        deleteChatThread(selectedChatId),
      );
      if (deleteChatResponse.success) {
        showToast('success', 'Chat Deleted Successfully');
      }
    } catch (error) {
      showToast('error', error.message);
      console.log('handleDeleteChat error', error);
    }
  };

  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Delete Chat'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.box}>
              <DeleteIcon style={{ height: 30, width: 30 }} fill={'#FF383C'} />
            </View>
            <Text style={styles.message}>
              Delete this conversation with {selectedChatPerson?.clientName}?
              All messages will be permanently removed for both participants.
              This cannot be undone.
            </Text>

            <View style={styles.buttonRow}>
              <Button
                text={loadingChats ? '' : 'Delete'}
                height={44}
                width={'49%'}
                backgroundColor={'#FFECEC'}
                borderColor={'#FFD7D8'}
                borderWidth={1}
                color={loadingChats ? 'transparent' : '#CC2D30'}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.regular}
                fontSize={Spacing.m}
                lineHeight={Spacing.xl}
                onPress={() => handleDeleteChat()}
                rightIcon={
                  loadingChats ? (
                    <ActivityIndicator size={'small'} color={'#CC2D30'} />
                  ) : null
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
                onPress={() => onClose()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteChatModal;
