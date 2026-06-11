import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import React, { memo, useRef, useState } from 'react';
import moment from 'moment';
import { Spacing } from '../../../helpers/sizeHelper';
import {
  DeleteIcon,
  DoubleTick,
  FileIcon,
  DownloadIcon,
} from '../../../assets/svg';
import styles from './style';
import { useSelector } from 'react-redux';
import { handleCopyText } from '../../../helpers/services';
import { downloadAndOpen } from '../../../helpers/fileHandler';
import FastImage from '@d11/react-native-fast-image';

const MessagesInboxCard = ({ item, handleDeleteMessage }) => {
  const userData = useSelector(state => state.auth.data.userData);
  const isMe = item?.senderId === userData?.user?.id;
  const [loadingFileUrl, setLoadingFileUrl] = useState(null);
  const animationSMS = useRef(new Animated.Value(0)).current;
  const [isExpandedSMS, setIsExpandedSMS] = useState(false);

  // ✅ Safe isImage check
  const isImage = type => {
    if (!type || typeof type !== 'string') return false;
    return type.startsWith('image/');
  };

  const toggleExpandSMS = () => {
    const newValue = !isExpandedSMS;
    setIsExpandedSMS(newValue);
    Animated.timing(animationSMS, {
      toValue: newValue ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const truncateText = (text, maxWords = 100) => {
    if (typeof text !== 'string' || !text || text.length == 0) return null;
    const words = text.trim().split(' ');
    if (words.length <= maxWords) {
      return <Text style={styles.smsText}>{text}</Text>;
    }
    const shortText = words.slice(0, maxWords).join(' ');

    return (
      <View>
        <Text style={styles.smsText}>{shortText}...</Text>
        <TouchableOpacity onPress={toggleExpandSMS}>
          <Text style={styles.text}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleFilePress = async (fileUrl, fileName, uniqueId) => {
    if (!fileUrl) return;
    if (loadingFileUrl) return;
    setLoadingFileUrl(uniqueId);
    try {
      await downloadAndOpen(fileUrl, fileName);
    } catch (error) {
      console.log('Error opening file:', error);
    } finally {
      setLoadingFileUrl(null);
    }
  };

  const renderAttachment = () => {
    if (!item?.attachmentUrl) return null;
    const uniqueId = item.attachmentUrl;
    const isLoading = loadingFileUrl === uniqueId;

    if (isImage(item.fileType)) {
      return (
        <TouchableOpacity
          onPress={() =>
            handleFilePress(
              item.attachmentUrl,
              item.fileName || 'image',
              uniqueId,
            )
          }
          disabled={isLoading}
          activeOpacity={0.7}
        >
          <View style={styles.imageAttachmentContainer}>
            <FastImage
              source={{
                uri: item?.attachmentUrl,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.imageAttachment}
              resizeMode={FastImage.resizeMode.cover}
            />
            {isLoading && (
              <View style={styles.loaderOverlay}>
                <ActivityIndicator size="large" color="#009FD9" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.attchmentContainer}
        onPress={() =>
          handleFilePress(item.attachmentUrl, item.fileName || 'file', uniqueId)
        }
        disabled={isLoading}
      >
        <View style={styles.row}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#009FD9" />
          ) : (
            <FileIcon style={styles.sideIcon} fill={'#009FD9'} />
          )}
          <Text style={styles.documentText}>{item.fileName || 'Document'}</Text>
        </View>
        {!isLoading && <DownloadIcon style={styles.sideIcon} fill="#009FD9" />}
      </TouchableOpacity>
    );
  };

  // ✅ Safe copy handler – pass empty string if message is null
  const handleLongPress = () => {
    if (
      !item?.message ||
      typeof item.message !== 'string' ||
      item.message.length === 0
    ) {
      return;
    }

    handleCopyText(item?.message || '');
  };

  return (
    <Pressable onLongPress={handleLongPress}>
      {isMe && (
        <TouchableOpacity
          onPress={() => handleDeleteMessage(item?.id)}
          style={{
            position: 'absolute',
            right: 25,
            top: 5,
            zIndex: 1,
          }}
        >
          <DeleteIcon style={{ height: 15, width: 15 }} />
        </TouchableOpacity>
      )}

      <View
        style={[
          styles.card,
          {
            backgroundColor: isMe ? '#F7F7F7' : '#E6F6FC',
            borderColor: isMe ? '#E1E1E1' : '#CCECF7',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <View style={{ paddingHorizontal: Spacing.xs }}>
          {renderAttachment()}
          {item?.message !== null && (
            <>
              {isExpandedSMS ? (
                <View>
                  <Text style={styles.smsText}>{item.message}</Text>
                  <TouchableOpacity onPress={toggleExpandSMS}>
                    <Text style={styles.text}>Read Less</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                truncateText(item.message, 100)
              )}
            </>
          )}
          {/* {typeof item?.message === 'string' &&
            typeof item?.message === 'string' &&
            item.message.trim().length > 0 &&
            (isExpandedSMS ? (
              <View>
                <Text style={styles.smsText}>{item.message}</Text>
                <TouchableOpacity onPress={toggleExpandSMS}>
                  <Text style={styles.text}>Read Less</Text>
                </TouchableOpacity>
              </View>
            ) : (
              truncateText(item.message, 100)
            ))} */}
        </View>

        <View
          style={[
            styles.timeView,
            {
              alignSelf: isMe ? 'flex-end' : 'flex-start',
            },
          ]}
        >
          <Text
            style={[styles.timeText, { color: isMe ? '#6A6A6A' : '#007FAE' }]}
          >
            {item?.createdAt ? moment(item.createdAt).format('LT') : ''}
          </Text>
          {isMe && (
            <DoubleTick
              style={{ width: 21, height: 9 }}
              fill={item?.read ? '#009FD9' : '#888888'}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default memo(MessagesInboxCard);
