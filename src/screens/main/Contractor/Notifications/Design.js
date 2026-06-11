import React from 'react';
import {
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from './style';
import Header from '../../../../components/Header';
import AppColor from '../../../../helpers/AppColor';
import NotificationSkeleton from '../../../../sekeletons/Contractor/NotificationSkeleton';
import Button from '../../../../components/Button';
import { Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
const Design = props => {
  return (
    <View style={styles.container}>
      <Header
        title={'Notifications'}
        navigation={props.navigation}
        showOtherIcons
      />
      <View style={styles.listContent}>
        {props.isLoading ? (
          <NotificationSkeleton />
        ) : (
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={props.sections}
            keyExtractor={(item, index) =>
              item.type === 'header'
                ? `header-${item.title}`
                : item.id?.toString()
            }
            renderItem={props.renderNotifications}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
            onRefresh={props.onRefresh}
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
            refreshing={props.refreshing}
          />
        )}
      </View>
      {!props.isLoading && (
        <View style={styles.button}>
          <Button
            text={'Mark all as read'}
            backgroundColor={'#F7F7F7'}
            borderColor={'#E1E1E1'}
            borderWidth={1}
            borderRadius={Spacing.s}
            width={'100%'}
            height={44}
            color={'#404040'}
            fontSize={Spacing.m}
            fontFamily={PopinsFont.regular}
            lineHeight={Spacing.xl}
            onPress={props.markAllNotificationsRead}
          />
        </View>
      )}
    </View>
  );
};

export default Design;
