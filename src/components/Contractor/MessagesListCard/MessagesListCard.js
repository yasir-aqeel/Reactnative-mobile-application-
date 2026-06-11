import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import styles from './style';
import {
  setSelectedChat,
  setSelectedChatPerson,
  setSelectedJobChat,
} from '../../../redux/actions/chatActions';
import { useDispatch } from 'react-redux';
import { timeAgo } from '../../../helpers/services';
const MessagesListCard = ({ item, navigation }) => {
  const dispatch = useDispatch();

  function truncateText(text, maxChars) {
    if (text.length > maxChars) {
      return text.slice(0, maxChars) + '......';
    } else {
      return text;
    }
  }
  const handleNavigateToChatBox = chat => {
    dispatch(setSelectedChat(chat.jobId));
    dispatch(
      setSelectedJobChat({
        title: chat.title,
        jobStatus: chat.jobStatus,
        description: chat.description,
        budget: chat.budget,
        bidAmount: chat.bidAmount,
        hoursWork: chat.hoursWork,
        location: chat.location,
        vendorId: chat.vendorId,
        JobType: chat.JobType,
      }),
    );
    dispatch(
      setSelectedChatPerson({
        clientId: item?.clientId,
        clientName: item?.clientName,
        clientAvatar: item?.clientAvatar ?? null,
      }),
    );
    navigation.navigate('MessagesInboxScreen');
  };
  return (
    <TouchableOpacity
      onPress={() => handleNavigateToChatBox(item)}
      style={[
        styles.card,
        { backgroundColor: item.unreadCount > 0 ? '#F7F7F7' : '#FFFFFF' },
      ]}
    >
      <View style={styles.view1}>
        <View style={styles.row}>
          <View style={styles.imageView}>
            {item?.clientAvatar ? (
              <>
                <Image
                  source={{ uri: item?.clientAvatar }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </>
            ) : (
              <>
                <View style={styles.nameContainer}>
                  <Text style={styles.userName}>
                    {item?.clientName?.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </>
            )}
            <View
              style={[
                styles.greenDot,
                { backgroundColor: item?.online ? '#3DBE84' : '#888888' },
              ]}
            />
          </View>

          <View style={styles.contentView} key={item.clientId}>
            <Text style={styles.name}>{item?.clientName}</Text>
            <Text style={styles.lastMessageText}>
              {truncateText(item?.lastMessage, 30)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.endView}>
        <Text style={styles.timeText}>{timeAgo(item.updatedAt)}</Text>
        {item?.unreadCount > 0 && (
          <View style={styles.countView}>
            <Text style={styles.countText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MessagesListCard);
