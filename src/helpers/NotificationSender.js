import notifee from '@notifee/react-native';
export const onDisplayNotification = async notification => {
  console.log('notification', notification);
  // Display a notification
  await notifee.displayNotification({
    title: notification.title,
    body: notification.message,
    android: {
      channelId: 'default',
      smallIcon: '@mipmap/ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};
