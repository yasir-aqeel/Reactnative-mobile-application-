import React, { useEffect, useState } from 'react';
import Design from './Design';
import { useDispatch, useSelector } from 'react-redux';
import NotificationSettingsCard from '../../../../components/Contractor/NotificationSettingsCard';
import { useIsFocused } from '@react-navigation/native';
import { updateNotificationItem } from '../../../../redux/actions/contractorActions';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';

const NotificationSettings = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const notificationsPreferences = useSelector(
    state => state.contractor?.data?.notificationsPreferences?.preferences,
  );
  const [loadingType, setLoadingType] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(notificationsPreferences);
  }, [isFocused, notificationsPreferences]);

  const onToggle = async (item, key) => {
    const isConnected = await hasInternet();

    if (!isConnected) {
      showToast('info', 'Internet No Connected');
      return;
    }
    const currentKey = `${item.type}_${key}`;

    setLoadingType(currentKey);
    try {
      await dispatch(updateNotificationItem(item, key));
    } catch (error) {
    } finally {
      setLoadingType(null);
    }
  };
  const renderSettings = ({ item, index }) => {
    return (
      <NotificationSettingsCard
        item={item}
        index={index}
        data={data}
        onToggle={onToggle}
        loadingType={loadingType}
      />
    );
  };
  return (
    <Design
      navigation={navigation}
      userData={userData}
      data={data}
      renderSettings={renderSettings}
    />
  );
};

export default NotificationSettings;
