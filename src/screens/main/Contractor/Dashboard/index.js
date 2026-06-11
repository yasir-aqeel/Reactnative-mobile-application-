import { View, AppState } from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import Design from './Design';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStripeStatus,
  getTimePeriod,
  getUserLocationService,
  hasInternet,
} from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import {
  actionItemsData,
  contractorEarnings,
  getAllNotificationsData,
  getNotificationsPreferences,
} from '../../../../redux/actions/contractorActions';
import styles from './style';
import TabsCard from '../../../../components/Contractor/TabsCard';
import ChangeOrderCard from '../../../../components/Contractor/DashboardCards/ChangeOrderCard/ChangeOrderCard';
import InvitationsCard from '../../../../components/Contractor/DashboardCards/InvitationsCard/InvitationsCard';
import MessagesCard from '../../../../components/Contractor/DashboardCards/MessagesCard/MessagesCard';
import { getAllChats } from '../../../../redux/actions/chatActions';
import { getUserData } from '../../../../redux/actions/authActions';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';

const allowedTypes = ['changeOrder', 'message', 'invitation'];

const Dashboard = ({ navigation }) => {
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const userData = useSelector(state => state.auth.data.userData);
  const token = userData?.access_token;
  const actionItemsDataDetails = useSelector(
    state => state.contractor.data.actionItemData,
  );
  const earningsDetails = useSelector(
    state => state.contractor.data.contractorEarnings,
  );
  // console.log(earningsDetails);
  const status = [
    { label: 'All', value: 'all' },
    { label: 'New Invites', value: 'NEW_INVITES' },
    { label: 'Change Order', value: 'CHANGE_ORDER' },
    { label: 'Messages', value: 'MESSAGE' },
  ];

  const [statusFilter, setStatusFilter] = useState(status[0].value);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    search: '',
    from: '',
    to: '',
    page: 1,
    limit: 10,
  });
  const [dateLabel, setDateLabel] = useState('Select Date');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 5 ? '' : prev + '.'));
    }, 50);

    return () => clearInterval(interval);
  }, []);
  const appState = useRef(AppState.currentState);
  useFocusEffect(
    useCallback(() => {
      handleGetStripeAccountStatus();
    }, []),
  );
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (!userData.user.isStripeOnboarded && !userData.user.stripeAccountId) {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App came back → rechecking Stripe status');
          dispatch(getUserData());
          handleGetStripeAccountStatus();
        }
      }

      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  const handleGetStripeAccountStatus = async () => {
    try {
      const internetStatus = await hasInternet();
      if (!internetStatus) {
        showToast('info', 'No Internet Connection');
        return;
      }
      if (!userData.user.isStripeOnboarded && !userData.user.stripeAccountId) {
        const stripeStatus = await getStripeStatus(token);
        console.log('stripeStatus', stripeStatus);
        // ✅ handle null account safely
        if (stripeStatus?.account?.id) {
          console.log('Stripe account id:', stripeStatus.account.id);
        } else {
          openModal('stripe_setup_modal');
        }
      }
    } catch (error) {
      console.log('handleGetStripeAccountStatus error:', error);
      showToast('error', 'Failed to fetch Stripe status');
      openModal('stripe_setup_modal');
    }
  };

  useEffect(() => {
    if (userData?.user) {
      const timer = setTimeout(() => {
        if (userData?.user?.requiresPasswordUpdate) {
          showToast('info', 'Your Password is Weak Kindly Update It');
          navigation.navigate('updatePassword');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userData, navigation]);

  // ====================== DATE SELECTION ======================
  const handleDateSelect = range => {
    console.log('Selected date range:', range);
    setDateLabel(range.label);
    setFilters(prev => ({
      ...prev,
      from: range.from,
      to: range.to,
      page: 1,
    }));
    setDateModalVisible(false);
    fetchItems(true);
  };

  // ====================== FILTERED DATA (CLIENT-SIDE) ======================
  const currentData = useMemo(() => {
    const allData = actionItemsDataDetails?.data || [];
    return allData
      .filter(item => allowedTypes.includes(item?.type?.toLowerCase()))
      .filter(item => {
        if (statusFilter === 'all') return true;
        return item?.type?.toLowerCase() === statusFilter?.toLowerCase();
      });
  }, [actionItemsDataDetails?.data, statusFilter]);

  // ====================== LIVE CLOCK ======================
  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  // ====================== LOCATION ======================
  useEffect(() => {
    const timer = setTimeout(() => getUserLocationService(dispatch), 5000);
    return () => clearTimeout(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const timePeriod = getTimePeriod(currentHour);

  // ====================== PAGINATION (LOAD MORE) ======================
  const loadMore = () => {
    const list = actionItemsDataDetails?.data || [];
    if (
      !isLoading &&
      list.length > 0 &&
      list.length < (actionItemsDataDetails?.total || 0)
    ) {
      setFilters(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // ====================== MAIN DATA FETCH (RUNS ON EVERY FOCUS) ======================
  const fetchItems = async (reset = false) => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      setIsFirstLoading(false);
      return;
    }

    if (reset) {
      setIsFirstLoading(true);
      setFilters(prev => ({ ...prev, page: 1 }));
    }

    try {
      await Promise.all([
        dispatch(getUserData()),
        dispatch(getAllChats()),
        dispatch(getAllNotificationsData()),
        dispatch(
          actionItemsData({
            ...filters,
            page: reset ? 1 : filters.page,
          }),
        ),
        dispatch(contractorEarnings({ page: 1, limit: 10 })),
        dispatch(getNotificationsPreferences()),
      ]);
    } catch (error) {
      showToast('error', error?.response?.message || 'Something went wrong');
      console.log('fetchItems error', error);
    } finally {
      setIsFirstLoading(false);
      setRefreshing(false);
    }
  };

  // 👉 REFRESH ON EVERY SCREEN FOCUS (no one‑time guard)
  useEffect(() => {
    if (isFocused) {
      fetchItems(true);
    }
  }, [isFocused]);

  // 👉 REFETCH WHEN PAGINATION PAGE CHANGES
  useEffect(() => {
    if (filters.page > 1) {
      fetchItems(false);
    }
  }, [filters.page]);

  // ====================== PULL‑TO‑REFRESH ======================
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setDateLabel('Select Date');
    await fetchItems(true);
  }, []);

  const scrollToTop = () =>
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

  const handleScroll = event => {
    const { contentOffset } = event.nativeEvent;
    setShowScrollToTop(contentOffset.y > 50);
  };

  // ====================== RENDERERS ======================
  const renderTabs = ({ item }) => (
    <View style={styles.actionCard}>
      <TabsCard
        item={item}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </View>
  );

  const renderDashboardData = ({ item }) => (
    <View style={styles.actionCard}>
      {item.type === 'changeOrder' ? (
        <ChangeOrderCard item={item} navigation={navigation} />
      ) : item.type === 'message' ? (
        <MessagesCard item={item} navigation={navigation} />
      ) : item.type === 'invitation' ? (
        <InvitationsCard item={item} navigation={navigation} />
      ) : null}
    </View>
  );

  const showLoading =
    isFirstLoading ||
    (isLoading && !actionItemsDataDetails?.data?.length && !refreshing);

  return (
    <Design
      navigation={navigation}
      isLoading={showLoading}
      actionItemsDataDetails={actionItemsDataDetails}
      refreshing={refreshing}
      loadMore={loadMore}
      onRefresh={onRefresh}
      scrollToTop={scrollToTop}
      handleScroll={handleScroll}
      showScrollToTop={showScrollToTop}
      flatListRef={flatListRef}
      timePeriod={timePeriod}
      userData={userData}
      renderTabs={renderTabs}
      currentData={currentData}
      renderDashboardData={renderDashboardData}
      dateModalVisible={dateModalVisible}
      setDateModalVisible={setDateModalVisible}
      handleDateSelect={handleDateSelect}
      statusFilter={statusFilter}
      dateLabel={dateLabel}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      state={state}
      setState={setState}
      earningsDetails={earningsDetails}
      dots={dots}
    />
  );
};

export default Dashboard;
