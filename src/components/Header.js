import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { PopinsFont } from '../helpers/Fonts';
import AppColor from '../helpers/AppColor';
import {
  LeftArrow,
  MessageIcon,
  NotificationIcon,
  SettingsIcon,
} from '../assets/svg';
import { images } from '../assets/images';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FastImage from '@d11/react-native-fast-image';
import { FontSizes, Spacing } from '../helpers/sizeHelper';
const Header = ({
  title,
  navigation,
  showixrliIcon,
  showBackIcon,
  showOtherIcons,
}) => {
  const route = useRoute();
  const userData = useSelector(state => state.auth.data.userData);
  const chats = useSelector(state => state.chat.chats);
  const notificationsData = useSelector(
    state => state.contractor?.data?.allNotifications,
  );

  const totalUnread = useMemo(() => {
    return chats.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0);
  }, [chats]);

  const navigateToNotifications = async () => {
    navigation.navigate('Notifications');
  };
  const navigateToMessages = async () => {
    navigation.navigate('MessagesScreen');
  };
  const navigateToProfile = async () => {
    navigation.navigate('Profile');
  };
  const navigateToSettings = async () => {
    navigation.navigate('Settings');
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.row1}>
          {showixrliIcon && (
            <View style={styles.fixrliHeading}>
              <FastImage
                source={images.fixrliGif}
                style={{
                  height: 45,
                  width: 45,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          )}
          {showBackIcon && (
            <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
              <LeftArrow
                style={{
                  height: 20,
                  width: 15,
                }}
                fill={'#151515'}
              />
            </TouchableOpacity>
          )}
          {title && (
            <View style={styles.fixrliHeading}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
        </View>
        {showOtherIcons && (
          <View style={styles.icons}>
            <TouchableOpacity
              disabled={route.name === 'MessagesScreen'}
              style={[
                styles.iconTouch,
                {
                  backgroundColor:
                    route.name === 'MessagesScreen' ? '#009FD9' : '#F7F7F7',
                },
              ]}
              onPress={navigateToMessages}
            >
              <MessageIcon
                style={styles.icon}
                fill={route.name === 'MessagesScreen' ? '#FFF' : '#2A2A2A'}
              />
              {totalUnread > 0 && (
                <View
                  style={[
                    styles.unreadDot,
                    {
                      backgroundColor:
                        route.name === 'MessagesScreen' ? '#FFFFFF' : '#009FD9',
                      borderColor:
                        route.name === 'MessagesScreen' ? '#009FD9' : '#F7F7F7',
                    },
                  ]}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={route.name === 'Notifications'}
              style={[
                styles.iconTouch,
                {
                  backgroundColor:
                    route.name === 'Notifications' ? '#009FD9' : '#F7F7F7',
                },
              ]}
              onPress={navigateToNotifications}
            >
              <NotificationIcon
                style={styles.icon}
                fill={route.name === 'Notifications' ? '#FFF' : '#2A2A2A'}
              />
              {notificationsData?.unreadCount > 0 && (
                <View
                  style={[
                    styles.unreadDot,
                    {
                      backgroundColor:
                        route.name === 'Notifications' ? '#FFFFFF' : '#009FD9',
                      borderColor:
                        route.name === 'Notifications' ? '#009FD9' : '#F7F7F7',
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
            {route.name === 'Settings' || route.name === 'Profile' ? (
              <TouchableOpacity
                disabled={route.name === 'Settings'}
                onPress={() => navigateToSettings()}
                style={[
                  styles.iconTouch,
                  {
                    backgroundColor:
                      route.name === 'Settings' ? '#009FD9' : '#F7F7F7',
                  },
                ]}
              >
                <SettingsIcon
                  style={{ height: 30, width: 30 }}
                  fill={route.name === 'Settings' ? '#FFF' : '#2A2A2A'}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigateToProfile()}
                style={styles.nameContainer}
              >
                {userData.user.avatar !== null ? (
                  <Image
                    source={{ uri: userData.user.avatar }}
                    style={styles.HeaderProfileImg}
                  />
                ) : (
                  <View style={styles.HeaderProfileImg}>
                    <Text style={styles.userName}>
                      {userData.user.firstName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: AppColor.white },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row1: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  logo: {
    fontSize: 17,
    fontFamily: PopinsFont.bold,
    color: AppColor.primaryBlue,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  HeaderProfileImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#0000000D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 100,
    padding: 5,
    height: 35,
    width: 35,
  },
  icon: { height: 20, width: 20 },
  fixrliHeading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 5,
  },
  userName: {
    color: AppColor.primaryBlue,
    fontSize: 25,
    fontFamily: PopinsFont.medium,
    lineHeight: Spacing.xl,
  },
  nameContainer: { justifyContent: 'center', alignItems: 'center' },
  title: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.xl,
    lineHeight: Spacing.xl4,
    color: AppColor.textColor,
  },
  iconTouch: {
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 45,
    width: 45,
    borderRadius: Spacing.s,
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 7,
    width: 12,
    height: 12,
    borderRadius: 100,
    borderWidth: 2,
  },
});
