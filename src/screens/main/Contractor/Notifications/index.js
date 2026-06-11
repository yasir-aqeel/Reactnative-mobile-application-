import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getAllNotificationsData } from '../../../../redux/actions/contractorActions';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import Design from './Design';
import axios from 'axios';
import { BASE_URL } from '../../../../helpers/BASE_URL';
import NotificationCard from '../../../../components/Contractor/NotificationCard';
import { useSocket } from '../../../../helpers/SocketContext';
import { onDisplayNotification } from '../../../../helpers/NotificationSender';
import moment from 'moment';

const Notifications = ({ navigation }) => {
  // const { socket } = useSocket();
  const dispatch = useDispatch();
  // const isFocused = useIsFocused();
  const userData = useSelector(state => state.auth.data.userData);
  const token = userData?.access_token;
  const isLoading = useSelector(state => state.contractor.isLoading);
  const notifications = useSelector(
    state => state.contractor?.data?.allNotifications?.notifications,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false); // ✅ NEW
  useEffect(() => {
    setNotificationsData(notifications || []);
  }, [notifications]);
  // const initialLoadDone = useRef(false);

  // useEffect(() => {
  //   if (isFocused && !initialLoadDone.current) {
  //     initialLoadDone.current = true;
  //     setIsFirstLoading(true);
  //     fetchNotifications();
  //   }
  // }, [isFocused]);

  // // 🔔 Listen for new notifications
  // useEffect(() => {
  //   if (!socket) return;

  //   const handleNotification = async data => {
  //     console.log('🔔 New notification received:', data);
  //     setNotificationsData(prev => [data, ...prev]);
  //     await onDisplayNotification(data);
  //   };

  //   socket.on('notification', handleNotification);

  //   return () => {
  //     socket.off('notification', handleNotification);
  //   };
  // }, [socket]);

  const fetchNotifications = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      setIsFirstLoading(false);
      return;
    }

    try {
      const response = await dispatch(getAllNotificationsData());
      if (response?.notifications) {
        setNotificationsData(response.notifications);
      }
    } catch (error) {
      showToast('error', error.response?.message || 'Something went wrong');
      console.log('fetchNotifications error', error);
    } finally {
      setIsFirstLoading(false);
      setRefreshing(false);
    }
  };

  const markNotificationRead = async item => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    const notification = notificationsData.find(n => n.id === item.id);
    if (notification?.isRead && !['SYSTEM'].includes(notification?.type)) {
      navigation.navigate('MyJobsDetail', {
        selectedJobId: item.payload?.jobId,
      });
      return;
    }
    try {
      await axios.patch(
        `${BASE_URL}notifications/${item.id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNotificationsData(prev =>
        prev.map(noti =>
          noti.id === item.id
            ? { ...noti, isRead: true, readAt: new Date() }
            : noti,
        ),
      );
      showToast('success', 'Notification marked as read');
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
      console.log('markNotificationRead error', error);
    }
  };

  const markAllNotificationsRead = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    const unread = notificationsData.some(item => !item.isRead);
    if (!unread) {
      showToast('info', 'All notifications already read');
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNotificationsData(prev =>
        prev.map(item => ({ ...item, isRead: true, readAt: new Date() })),
      );
      showToast('success', 'All notifications marked as read');
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
      console.log('markAllNotificationsRead error', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsFirstLoading(true);
    fetchNotifications();
  }, []);

  const renderNotifications = ({ item, index }) => (
    <NotificationCard
      item={item}
      index={index}
      markNotificationRead={markNotificationRead}
    />
  );

  const sections = useMemo(() => {
    const grouped = { Today: [], Yesterday: [], Older: [] };
    notificationsData.forEach(msg => {
      const date = moment(msg.createdAt || msg.sentAt);
      if (date.isSame(moment(), 'day')) grouped.Today.push(msg);
      else if (date.isSame(moment().subtract(1, 'day'), 'day'))
        grouped.Yesterday.push(msg);
      else grouped.Older.push(msg);
    });
    return Object.keys(grouped)
      .map(key => ({ title: key, data: grouped[key] }))
      .filter(section => section.data.length > 0);
  }, [notificationsData]);

  // ✅ Show loading skeleton during first load or when Redux loading is true and no data yet
  const showLoading =
    isFirstLoading ||
    (isLoading && notificationsData.length === 0 && !refreshing);

  return (
    <Design
      navigation={navigation}
      sections={sections}
      renderNotifications={renderNotifications}
      isLoading={showLoading}
      onRefresh={onRefresh}
      refreshing={refreshing}
      markAllNotificationsRead={markAllNotificationsRead}
    />
  );
};

export default Notifications;
