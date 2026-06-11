import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';
import semver from 'semver';
import AppColor from '../helpers/AppColor';
import { PopinsFont } from '../helpers/Fonts';
import { FontSizes, Spacing } from '../helpers/sizeHelper';
import { hasInternet } from '../helpers/services';

const AppUpdateChecker = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState(null);

  const checkForUpdate = useCallback(latestStoreVersion => {
    try {
      const currentVersion = DeviceInfo.getVersion();
      const isValidStoreVersion = semver.valid(latestStoreVersion);
      const shouldShowUpdate =
        isValidStoreVersion && semver.gt(latestStoreVersion, currentVersion);

      if (shouldShowUpdate) {
        setIsUpdateAvailable(true);
      }
    } catch (error) {
      console.log('Error checking app version:', error);
    }
  }, []);

  const fetchLatestVersion = useCallback(async () => {
    const isConnected = await hasInternet();

    if (!isConnected) {
      console.log('No internet, skipping update check');
      return;
    }

    try {
      const storeVersion = await VersionCheck.getLatestVersion({
        forceUpdate: true,
      });

      setLatestVersion(storeVersion);
      checkForUpdate(storeVersion);
    } catch (error) {
      console.error('Error fetching latest version:', error);
    }
  }, [checkForUpdate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLatestVersion();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fetchLatestVersion]);

  const getFallbackStoreUrl = () => {
    const packageName = VersionCheck.getPackageName();

    return Platform.select({
      ios: `https://apps.apple.com/app/id${packageName}`,
      android: `https://play.google.com/store/apps/details?id=${packageName}`,
      default: '',
    });
  };

  const goToStore = async () => {
    try {
      const storeUrl = await VersionCheck.getStoreUrl();

      if (storeUrl) {
        const canOpen = await Linking.canOpenURL(storeUrl);

        if (canOpen) {
          await Linking.openURL(storeUrl);
          return;
        }
      }

      await Linking.openURL(getFallbackStoreUrl());
    } catch (error) {
      console.log('Store redirect error:', error);
      await Linking.openURL(getFallbackStoreUrl());
    }
  };

  return (
    <Modal
      visible={isUpdateAvailable}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Update Available</Text>

          <Text style={styles.appInfo}>{DeviceInfo.getApplicationName()}</Text>
          <Text style={styles.appInfo}>
            Current Version: {DeviceInfo.getVersion()}
          </Text>
          <Text style={styles.message}>
            {`A new version (${latestVersion}) is available. Please update to continue.`}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.updateButton} onPress={goToStore}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: FontSizes.l,
    fontFamily: PopinsFont.medium,
    color: AppColor.textDark,
    lineHeight: Spacing.xl,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  appInfo: {
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
    color: AppColor.textDark,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: PopinsFont.semiBold,
  },
  message: {
    fontSize: FontSizes.s,
    color: AppColor.textLight1,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: PopinsFont.regular,
    paddingHorizontal: 20,
  },
  actions: {
    alignItems: 'center',
    width: '100%',
  },
  updateButton: {
    backgroundColor: AppColor.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  updateButtonText: {
    color: AppColor.white,
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.medium,
  },
});

export default AppUpdateChecker;
