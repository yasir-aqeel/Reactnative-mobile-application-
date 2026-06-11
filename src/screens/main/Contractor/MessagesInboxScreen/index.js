import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getStore } from '../../../../redux/store';
import { Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { showToast } from '../../../../helpers/ToastConfig';
import { useSocket } from '../../../../helpers/SocketContext';
import Design from './Design';
import styles from './style';
import MessagesInboxCard from '../../../../components/Contractor/MessagesInboxCard/MessagesInboxCard';
import { DeleteIcon, InfoIcon, VerticalDots } from '../../../../assets/svg';
import {
  addMessage,
  setLoadingMessages,
  setMessages,
  setTypingUser,
  updateChat,
  deleteChat,
  deleteMessage,
} from '../../../../redux/actions/chatActions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
import { usePicker } from '../../../../helpers/usePicker';
import { uploadFile, uploadImage } from '../../../../helpers/services';
const MessagesInboxScreen = ({ navigation }) => {
  const {
    selectedChatId,
    selectedJobChat,
    selectedChatPerson,
    loadingMessages,
  } = useSelector(state => state.chat);
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const userData = useSelector(state => state.auth.data.userData);
  const token = userData?.access_token;
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const openImagePicker = usePicker('image', setImage);
  const pickDocument = usePicker('documents', setDocument);
  const jobId = selectedChatId;
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();
  const messages = useSelector(state => state.chat.messages?.[jobId] || []);
  const typingUsers = useSelector(state => state.chat.typingUsers?.[jobId]);
  const flatListRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const [message, setMessage] = useState('');
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const isNearBottom = useRef(true);
  const chats = useSelector(state => state?.chat?.chats);
  const currentChat = chats.find(chat => chat.jobId === jobId);
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height - insets.bottom);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [insets.bottom]);
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = (animated = true) => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({ animated });
    });
  };
  const handleScroll = event => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const paddingToBottom = 80;

    isNearBottom.current =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  // 📥 when new messages arrive (like socket)
  useEffect(() => {
    if (isNearBottom.current) {
      scrollToBottom(true);
    }
  }, [messages]);

  const toggleMoreOptions = () => {
    setMoreOptionsVisible(prev => !prev);
  };

  useEffect(() => {
    if (!socket || !isConnected || !jobId) return;
    console.log('Joining room:', jobId);
    socket.emit('joinRoom', jobId);
    socket.emit('getMessages', jobId);
    socket.emit('markAsRead', { jobId });

    dispatch(setLoadingMessages(true));
    const onChatHistory = msgs => {
      dispatch(setMessages(jobId, msgs || []));
      dispatch(setLoadingMessages(false));

      requestAnimationFrame(() => {
        if (isAtBottomRef.current) {
          scrollToBottom();
        }
      });
    };
    const onReceiveMessage = newMsg => {
      if (!newMsg?.jobId) return;
      dispatch(addMessage(newMsg.jobId, newMsg));
      // update last message in chat list
      dispatch(
        updateChat({
          jobId: newMsg.jobId,
          data: {
            lastMessage: newMsg.message,
            updatedAt: newMsg.createdAt || new Date().toISOString(),
          },
        }),
      );

      if (newMsg.jobId === jobId) {
        requestAnimationFrame(() => {
          if (isAtBottomRef.current) {
            scrollToBottom();
          }
        });
      }
    };

    const onMessageSent = data => {
      console.log('Message sent ack', data);
    };

    const onTyping = data => {
      dispatch(
        setTypingUser(
          jobId,
          data.isTyping && data.userId !== userData.user?.id
            ? {
                userId: data.userId,
                userName: data.userName,
                avatar: data.avatar,
              }
            : null,
        ),
      );
    };

    const onUserOnline = ({ userId }) => {
      dispatch(
        updateChat({
          clientId: userId,
          data: {
            online: true,
          },
        }),
      );
    };

    const onUserOffline = ({ userId }) => {
      dispatch(
        updateChat({
          clientId: userId,
          data: {
            online: false,
          },
        }),
      );
    };

    const onUnreadUpdated = ({ jobId, unreadCount }) => {
      dispatch(
        updateChat({
          jobId,
          data: {
            unreadCount,
          },
        }),
      );
    };
    const onChatDeleted = ({ jobId: deletedJobId }) => {
      if (!deletedJobId) return;

      dispatch(deleteChat(deletedJobId));

      if (deletedJobId === jobId) {
        navigation.goBack();
      }
    };
    const onMessageDeleted = payload => {
      const { jobId, messageId, lastMessage, lastMessageAt } = payload || {};
      if (!jobId || !messageId) return;

      const store = getStore();

      // 1. remove message from redux
      store.dispatch(deleteMessage(jobId, messageId));

      // 2. get updated messages AFTER delete (use store.getState() again)
      const updatedMessages = store.getState().chat.messages?.[jobId] || [];

      // 3. if no messages left → delete chat + navigate back
      if (updatedMessages.length === 0) {
        store.dispatch(deleteChat(jobId));
        navigation.goBack(); // navigation must be captured from useNavigation
        return;
      }

      // 4. otherwise update last message (using the payload's lastMessage & lastMessageAt)
      store.dispatch(
        updateChat({
          jobId,
          data: {
            lastMessage: lastMessage || '',
            updatedAt: lastMessageAt || new Date().toISOString(),
          },
        }),
      );
    };

    const onErrorMessage = payload => {
      console.warn('Chat socket error:', payload?.error);
    };
    socket.on('chatDeleted', onChatDeleted);
    socket.on('messageDeleted', onMessageDeleted);
    socket.on('chatHistory', onChatHistory);
    socket.on('receiveMessage', onReceiveMessage);
    socket.on('messageSent', onMessageSent);
    socket.on('userTyping', onTyping);
    socket.on('userOnline', onUserOnline);
    socket.on('userOffline', onUserOffline);
    socket.on('unreadUpdated', onUnreadUpdated);
    socket.on('errorMessage', onErrorMessage);
    return () => {
      socket.off('chatDeleted', onChatDeleted);
      socket.off('messageDeleted', onMessageDeleted);
      socket.off('chatHistory', onChatHistory);
      socket.off('receiveMessage', onReceiveMessage);
      socket.off('messageSent', onMessageSent);
      socket.off('userTyping', onTyping);
      socket.off('userOnline', onUserOnline);
      socket.off('userOffline', onUserOffline);
      socket.off('unreadUpdated', onUnreadUpdated);
      socket.off('errorMessage', onErrorMessage);
      socket.emit('leaveRoom', jobId);
    };
  }, [socket, isConnected, jobId, dispatch]);
  const sections = useMemo(() => {
    const groupedMap = {};

    messages.forEach(msg => {
      const messageDate = moment(msg.createdAt || msg.sentAt).startOf('day');

      let dateLabel = '';

      if (messageDate.isSame(moment(), 'day')) {
        dateLabel = 'Today';
      } else if (messageDate.isSame(moment().subtract(1, 'day'), 'day')) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = messageDate.format('MMMM D, YYYY');
      }

      if (!groupedMap[dateLabel]) groupedMap[dateLabel] = [];
      groupedMap[dateLabel].push(msg);
    });

    return Object.keys(groupedMap).map(date => ({
      title: date,
      data: groupedMap[date],
    }));
  }, [messages]);

  const flatData = useMemo(() => {
    return sections
      .map(section => [
        { type: 'header', title: section.title },
        ...section.data.map(msg => ({ ...msg, type: 'item' })),
      ])
      .flat();
  }, [sections]);
  const sendChatMessage = useCallback(
    async ({ type = 'TEXT', message = '', file = null }) => {
      if (!socket || !isConnected || !jobId) return;

      const safeMessage = typeof message === 'string' ? message : '';
      const trimmedMessage = safeMessage.trim();

      try {
        let attachmentUrl = null;
        let fileName = null;
        let fileType = null;

        if (file) {
          const isImage = type === 'IMAGE';

          const uploadRes = isImage
            ? await uploadImage(file, token)
            : await uploadFile(file, token);

          attachmentUrl = uploadRes.url;
          fileName = file.name;
          fileType = file.type;
        }

        socket.emit('sendMessage', {
          jobId,
          type,
          message: trimmedMessage,
          attachmentUrl,
          fileName,
          fileType,
        });

        setImage(null);
        setDocument(null);
        setMessage('');

        socket.emit('typing', {
          jobId,
          isTyping: false,
        });

        dispatch(setTypingUser(jobId, null));

        if (isAtBottomRef.current) {
          scrollToBottom();
        }
      } catch (err) {
        console.log('sendChatMessage error', err);
        showToast('error', 'Message send failed');
      }
    },
    [socket, isConnected, jobId],
  );
  const sendMessage = useCallback(() => {
    if (!socket || !isConnected) return;

    sendChatMessage({
      type: 'TEXT',
      message: message || '', // ✅ SAFE
    });

    setMessage('');
    dispatch(setTypingUser(jobId, null));

    if (isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [message, sendChatMessage]);

  const handleDeleteChat = () => {
    if (!socket || !jobId) return;
    openModal('delete_chat_modal', {
      currentChat,
    });
  };
  const handleDeleteMessage = messageId => {
    if (!socket || !jobId || !messageId) return;
    socket.emit('deleteMessage', {
      jobId,
      messageId,
    });
  };
  const userOptionsArray = [
    {
      id: 'info',
      title: 'Info',
      icon: InfoIcon,
      iconColor: '#2A2A2A',
    },
    {
      id: 'del',
      title: 'Delete',
      icon: DeleteIcon,
      iconColor: '#CC2D30',
    },
  ];

  const onClickOptions = type => {
    if (type.id === 'info') {
      openModal('chat_info_modal', {
        currentChat,
      });
    } else if (type.id === 'del') {
      handleDeleteChat();
    }
  };

  const UserOptions = () => (
    <Menu onSelect={item => onClickOptions(item)}>
      <MenuTrigger renderTouchable={() => <TouchableOpacity />}>
        <View style={styles.optionsIconTouchable}>
          <VerticalDots style={styles.optionsIcon} />
        </View>
      </MenuTrigger>

      <MenuOptions optionsContainerStyle={styles.optionsContainer}>
        {userOptionsArray.map(item => (
          <MenuOption
            key={item.id}
            value={item}
            renderTouchable={() => <TouchableOpacity />}
          >
            <View style={styles.optionView}>
              <item.icon
                style={{ height: 20, width: 20 }}
                fill={item.iconColor}
              />
              <Text style={styles.optionName}>{item.title}</Text>
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );

  const renderItem = useCallback(
    ({ item }) => (
      <MessagesInboxCard
        item={item}
        handleDeleteMessage={handleDeleteMessage}
      />
    ),
    [navigation],
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTyping = useCallback(
    text => {
      setMessage(text);

      if (!socket) return;

      socket.emit('typing', {
        jobId,
        isTyping: text.trim().length > 0,
      });
    },
    [socket, jobId],
  );
  const handleImagePick = async () => {
    const picked = await openImagePicker();
    // console.log('picked image', picked);
    if (!picked?.length) return;

    const selectedImage = {
      uri: picked[0].uri,
      name: picked[0].name,
      type: picked[0].type,
    };

    setImage(selectedImage);

    // auto send
    sendChatMessage({
      type: 'IMAGE',
      message: message,
      file: selectedImage,
    });
  };

  const handleDocumentPick = async () => {
    const pickedDocs = await pickDocument();
    if (!pickedDocs?.length) return;

    const selectedDoc = {
      uri: pickedDocs[0].uri || pickedDocs[0].path,
      name: pickedDocs[0].name,
      type: pickedDocs[0].type || pickedDocs[0].mime,
    };

    setDocument(selectedDoc);

    // auto send
    sendChatMessage({
      type: 'DOCUMENT',
      message: message,
      file: selectedDoc,
    });
  };

  return (
    <Design
      navigation={navigation}
      UserOptions={UserOptions}
      message={message}
      setMessage={setMessage}
      flatListRef={flatListRef}
      flatData={flatData}
      renderItem={renderItem}
      moreOptionsVisible={moreOptionsVisible}
      toggleMoreOptions={toggleMoreOptions}
      handleGoBack={handleGoBack}
      typingUsers={typingUsers}
      sendMessage={sendMessage}
      selectedJobChat={selectedJobChat}
      selectedChatPerson={selectedChatPerson}
      loadingMessages={loadingMessages}
      isAtBottomRef={isAtBottomRef}
      scrollToBottom={scrollToBottom}
      handleScroll={handleScroll}
      handleTyping={handleTyping}
      keyboardHeight={keyboardHeight}
      isOnline={currentChat?.online}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      state={state}
      setState={setState}
      handleImagePick={handleImagePick}
      handleDocumentPick={handleDocumentPick}
    />
  );
};

export default MessagesInboxScreen;
