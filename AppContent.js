import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/helpers/ToastConfig';
import notifee from '@notifee/react-native';
import { useAuthWatcher } from './src/helpers/useAuthWatcher';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { StatusBar } from 'react-native';
import AppColor from './src/helpers/AppColor';
import { SocketProvider } from './src/helpers/SocketContext';
import { navigationRef } from './src/helpers/NavigationService';
import AppUpdateChecker from './src/components/AppUpdateChecker';
const AppContent = () => {
  useAuthWatcher();
  useEffect(() => {
    async function setupNotifications() {
      try {
        // Request permissions (required for iOS)
        await notifee.requestPermission();

        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          sound: 'default',
          importance: 4,
          vibration: true,
        });

        const settings = await notifee.getNotificationSettings();
        // AuthorizationStatus values: 0 = denied, 1 = authorized, 2 = provisional, 3 = ephemeral
        if (settings.authorizationStatus === 1) {
          console.log('Notification permission authorized');
        } else if (settings.authorizationStatus === 0) {
          console.log('Notification permission denied');
          // Optionally request permission on iOS:
          // await notifee.requestPermission();
        } else {
          console.log(
            'Notification permission status:',
            settings.authorizationStatus,
          );
        }

        // 3. Check if the channel is blocked (Android)
        const channel = await notifee.getChannel('default');
        if (channel && channel.blocked) {
          console.log('Channel is disabled');
        } else {
          console.log('Channel is enabled');
        }
      } catch (error) {
        console.error('Failed to setup notifications:', error);
      }
    }

    setupNotifications();
  }, []);
  return (
    <KeyboardProvider>
      <SocketProvider>
        <MenuProvider skipInstanceCheck={true} style={{ flex: 1 }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <StatusBar
                barStyle="dark-content"
                backgroundColor={AppColor.primaryBlue}
              />
              <NavigationContainer ref={navigationRef}>
                <AppUpdateChecker />
                <RootNavigation />
              </NavigationContainer>
              <Toast config={toastConfig} topOffset={65} />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </MenuProvider>
      </SocketProvider>
    </KeyboardProvider>
  );
};

export default AppContent;
