import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from './style';
import {
  LeftArrow,
  SendMessage,
  MessagesOptions,
  NoRecordFound,
} from '../../../../assets/svg';
import MessagesMoreOptionsModal from '../../../../components/Contractor/MessagesMoreOptionsModal/MessagesMoreOptionsModal';
import MessagesInboxSkeleton from '../../../../sekeletons/Contractor/MessagesInboxSkeleton';
import TypingIndicator from '../../../../components/TypingIndicator';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';

const Design = props => {
  const ChatHeader = ({ title }) => (
    <View style={styles.headerBoxContainer}>
      <Text style={styles.headerBoxText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View style={styles.backIconContainer}>
            <TouchableOpacity
              style={styles.backIconTouchable}
              onPress={props.handleGoBack}
            >
              <LeftArrow style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.row1}>
              <View style={styles.userImageContainer}>
                <View style={styles.imageView}>
                  {props?.selectedChatPerson?.clientAvatar ? (
                    <Image
                      source={{
                        uri: props?.selectedChatPerson?.clientAvatar,
                      }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.nameContainer}>
                      <Text style={styles.userName}>
                        {props?.selectedChatPerson?.clientName
                          ?.charAt(0)
                          .toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.nameDetails}>
                <Text>{props?.selectedChatPerson?.clientName}</Text>
                <View style={styles.userDetailsContainer}>
                  <View
                    style={[
                      styles.greenDot,
                      {
                        backgroundColor: props?.isOnline
                          ? '#1DBF73'
                          : '#8E8E8E',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.userStatusText,
                      {
                        color: props?.isOnline ? '#1DBF73' : '#8E8E8E',
                      },
                    ]}
                  >
                    {props?.isOnline ? 'online' : 'offline'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.optionsIconContainer}>{props.UserOptions()}</View>
        </View>
      </View>

      <View style={styles.flatlistContainer}>
        {props?.loadingMessages ? (
          <MessagesInboxSkeleton />
        ) : (
          <>
            {Array.isArray(props.flatData) && props.flatData.length > 0 && (
              <FlashList
                ref={props.flatListRef}
                data={props.flatData}
                renderItem={({ item, index }) =>
                  item.type === 'header' ? (
                    <ChatHeader title={item.title} />
                  ) : (
                    props.renderItem({ item, index })
                  )
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) =>
                  item.type === 'header'
                    ? `header-${item.title}`
                    : item.id?.toString() || `msg-${index}`
                }
                onScroll={props.handleScroll}
                estimatedItemSize={200}
                showScrollToEndIndicator={false}
                ListFooterComponent={
                  !props?.loadingMessages &&
                  props.typingUsers && (
                    <View style={styles.footerView1}>
                      {props.selectedChatPerson?.clientAvatar ? (
                        <View style={styles.footerView2}>
                          <Image
                            source={{
                              uri: props.selectedChatPerson?.clientAvatar,
                            }}
                            style={styles.footerImage}
                          />
                          <TypingIndicator />
                        </View>
                      ) : (
                        <View style={styles.footerView3}>
                          <View style={styles.footerView4}>
                            <Text style={styles.footerText}>
                              {props.selectedChatPerson?.clientName
                                ?.charAt(0)
                                .toUpperCase()}
                            </Text>
                          </View>
                          <TypingIndicator />
                        </View>
                      )}
                    </View>
                  )
                }
              />
            )}
          </>
        )}
        {!props.loadingMessages &&
          Array.isArray(props.flatData) &&
          props.flatData.length <= 0 && (
            <View style={styles.emptyView}>
              <NoRecordFound style={styles.icon} />
              <Text style={styles.text}>
                {`Uh-oh! Nothing Found.\nStart Chatting Now.`}
              </Text>
            </View>
          )}
      </View>

      <View
        style={[
          styles.inputContainer,
          {
            paddingBottom:
              props.keyboardHeight > 0 ? props.keyboardHeight + 100 : 10,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => props.toggleMoreOptions()}
          style={styles.smsIconTouchable}
        >
          <MessagesOptions style={styles.smsIcon} />
        </TouchableOpacity>

        <View style={styles.inputContainerInner}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            placeholderTextColor="#8E8E8E"
            value={props.message}
            onChangeText={props.handleTyping}
            multiline
            textAlignVertical="center"
          />
        </View>

        <TouchableOpacity
          onPress={() => props.sendMessage()}
          disabled={!props.message?.trim()}
          style={[
            styles.smsSendIcon,
            !props.message?.trim() && { opacity: 0.5 },
          ]}
        >
          <SendMessage style={styles.sendIcon} />
        </TouchableOpacity>
      </View>

      <MessagesMoreOptionsModal
        visible={props.moreOptionsVisible}
        onClose={props.toggleMoreOptions}
        handleImagePick={props.handleImagePick}
        handleDocumentPick={props.handleDocumentPick}
      />
      <ModalRenderer
        activeModal={props.activeModal}
        closeModal={props.closeModal}
        openModal={props.openModal}
        state={props.state}
        setState={props.setState}
      />
    </View>
  );
};

export default Design;
