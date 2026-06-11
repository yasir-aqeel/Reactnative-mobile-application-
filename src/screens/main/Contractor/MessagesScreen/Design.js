import React from 'react';
import { View, RefreshControl, TextInput, Text } from 'react-native';
import styles from './style';
import Header from '../../../../components/Header';
import { NoRecordFound, SearchIcon } from '../../../../assets/svg';
import AppColor from '../../../../helpers/AppColor';
import { FlashList } from '@shopify/flash-list';
import MessagesListCardSkeleton from '../../../../sekeletons/Contractor/MessagesListCardSkeleton';
import sizeHelper from '../../../../helpers/sizeHelper';

const Design = props => {
  return (
    <View style={styles.container}>
      <Header title={'Messages'} navigation={props.navigation} showOtherIcons />

      <View style={styles.contentContainer}>
        <View style={styles.searchContainerOuter}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIconView}>
              <SearchIcon style={styles.searchIcon} />
            </View>

            <TextInput
              placeholder="Search Chat"
              placeholderTextColor={'#6A6A6A'}
              style={styles.input}
              value={props.searchText}
              onChangeText={text => {
                props.setSearchText(text);
              }}
              cursorColor={AppColor.primaryBlue}
              textAlignVertical="center"
            />
          </View>
        </View>
        {props.loadingChats ? (
          <MessagesListCardSkeleton />
        ) : (
          <FlashList
            data={props.allChats}
            keyExtractor={(item, index) =>
              `${item?.jobId || 'job'}-${item?.id || index}`
            }
            estimatedItemSize={80}
            showsVerticalScrollIndicator={false}
            renderItem={props.renderChatListCard}
            ListEmptyComponent={() => {
              if (
                !props.loadingChats &&
                (!props.allChats || props.allChats.length === 0)
              ) {
                return (
                  <View style={styles.footer}>
                    <NoRecordFound style={{ height: 100, width: 100 }} />
                    <Text style={styles.text}>No Chats found</Text>
                  </View>
                );
              }

              return null;
            }}
            refreshControl={
              <RefreshControl
                refreshing={props.refreshing}
                onRefresh={props.onRefresh}
                colors={[
                  AppColor.primaryBlue,
                  AppColor.green1,
                  AppColor.redDark,
                  AppColor.purpleLight,
                ]}
                progressBackgroundColor={AppColor.white}
                tintColor={AppColor.primaryBlue}
              />
            }
            contentContainerStyle={{
              paddingBottom: sizeHelper.calHp(2),
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Design;
