import React from 'react';
import { View, Text, Image } from 'react-native';
import { EyeIcon, SMSIconButton, VerifiedIcon } from '../../../../assets/svg';
import { FontSizes } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../Button';
import styles from './style';
import { useDispatch } from 'react-redux';
import {
  setSelectedChat,
  setSelectedChatPerson,
  updateChat,
} from '../../../../redux/actions/chatActions';
import { useSocket } from '../../../../helpers/SocketContext';

const MessagesCard = ({ item, navigation }) => {
  const { socket, isConnected } = useSocket();
  const dispatch = useDispatch();
  const clientName =
    item.job?.client?.firstName + ' ' + item.job?.client?.lastName;
  const clientAvatar = item.job?.client?.clientAvatar;
  const jobId = item?.job?.id;
  const handleOpenChat = () => {
    dispatch(setSelectedChat(jobId));
    dispatch(
      setSelectedChatPerson({
        clientId: item.job?.client?.id,
        clientName: clientName,
        clientAvatar: clientAvatar ?? null,
      }),
    );
    navigation.navigate('MessagesInboxScreen');
  };

  const handleMarkAsRead = () => {
    if (!socket || !isConnected || !jobId) return;
    dispatch(
      updateChat({
        jobId,
        data: {
          unreadCount: 0,
        },
      }),
    );
    socket.emit('markAsRead', { jobId });
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.secondRow}>
          <View style={styles.imageView}>
            {clientAvatar ? (
              <>
                <Image
                  source={{ uri: clientAvatar }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </>
            ) : (
              <>
                <View style={styles.nameView}>
                  <Text style={styles.userName}>
                    {clientName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.owner}>Owner</Text>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{clientName}</Text>
              <VerifiedIcon style={styles.verified} fill={'#009FD9'} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Message</Text>
          <Text numberOfLines={2} style={styles.infoValue}>
            {item.title}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          text={'Mark as read'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={1}
          leftIcon={<SMSIconButton style={{ height: 16, width: 16 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.s}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() => handleMarkAsRead()}
        />
        <Button
          text={'View'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={1}
          leftIcon={<EyeIcon style={{ height: 16, width: 16 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.s}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() => handleOpenChat()}
        />
      </View>
    </View>
  );
};

export default MessagesCard;
