import { View, Text, ActivityIndicator } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Design from './Design';
import styles from './style';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../../helpers/ToastConfig';
import FinanceCard from '../../../../components/Contractor/DashboardCards/FinanceCard/FinanceCard';
import { financeFilterStatus, getStatusLabel } from '../../../../helpers/Data';
import StatusCard from '../../../../components/Contractor/StatusCard';
import { hasInternet } from '../../../../helpers/services';
import { contractorEarnings } from '../../../../redux/actions/contractorActions';
import { NoRecordFound } from '../../../../assets/svg';
import AppColor from '../../../../helpers/AppColor';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
import apiClient from '../../../../helpers/apiClient';
import {
  openLocalFile,
  saveBlobToDevice,
} from '../../../../helpers/fileHandler';

const Finance = ({ navigation }) => {
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const userData = useSelector(state => state.auth.data.userData);

  const initialLoaded = useRef(false);
  const [statusFilter, setStatusFilter] = useState(
    financeFilterStatus[0]?.value,
  );
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [earningsState, setEarningsState] = useState({
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    totalEarnings: 0,
    totalPendingPayouts: 0,
    hasMore: true,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    fromDate: '',
    toDate: '',
  });
  const [reportDownloading, setReportDownloading] = useState(false);

  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 5 ? '' : prev + '.'));
    }, 50);

    return () => clearInterval(interval);
  }, []);
  const loadEarnings = useCallback(
    async (pageNumber = 1, customFilters = filters, reset = false) => {
      const internetStatus = await hasInternet();
      if (!internetStatus) {
        setIsFirstLoading(false);
        showToast('info', 'No Internet Connection');
        return;
      }

      // Prevent duplicate load-more calls
      if (!reset && (!earningsState.hasMore || paginationLoading)) return;

      try {
        if (pageNumber > 1) setPaginationLoading(true);

        const updatedFilters = { ...customFilters, page: pageNumber };
        setFilters(updatedFilters);

        const response = await dispatch(contractorEarnings(updatedFilters));

        const {
          data = [],
          total = 0,
          limit = 10,
          totalEarnings = 0,
          totalPendingPayouts = 0,
        } = response;

        const hasMoreData = pageNumber * limit < total;

        if (reset || pageNumber === 1) {
          setEarningsState({
            data,
            page: pageNumber,
            limit,
            total,
            totalEarnings,
            totalPendingPayouts,
            hasMore: hasMoreData,
          });
        } else {
          setEarningsState(prev => ({
            ...prev,
            data: [...prev.data, ...data],
            page: pageNumber,
            hasMore: hasMoreData,
          }));
        }
      } catch (error) {
        showToast('error', error?.message || 'Something went wrong');
        console.log('loadEarnings error', error);
      } finally {
        setIsFirstLoading(false);
        setRefreshing(false);
        setPaginationLoading(false);
      }
    },
    [dispatch, filters, earningsState.hasMore, paginationLoading],
  );

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setIsFirstLoading(true);
    await loadEarnings(1, filters, true);
  }, [loadEarnings, filters]);

  // Load more when reaching end
  const fetchMore = useCallback(() => {
    if (
      earningsState.hasMore &&
      !isLoading &&
      !paginationLoading &&
      !refreshing
    ) {
      loadEarnings(earningsState.page + 1, filters);
    }
  }, [
    earningsState.hasMore,
    earningsState.page,
    isLoading,
    paginationLoading,
    refreshing,
    loadEarnings,
    filters,
  ]);

  // Initial load (only once when screen is focused)
  useEffect(() => {
    if (isFocused && !initialLoaded.current) {
      initialLoaded.current = true;
      loadEarnings(1, filters, true);
    }
  }, [isFocused, loadEarnings, filters]);

  const financeFilter = useMemo(() => {
    if (statusFilter === 'all') return earningsState.data;
    return earningsState.data.filter(item => item.status === statusFilter);
  }, [statusFilter, earningsState.data]);

  const renderEarningsCard = useCallback(
    ({ item }) => (
      <FinanceCard
        item={item}
        showJobId={true}
        navigation={navigation}
        openModal={openModal}
      />
    ),
    [navigation],
  );

  const renderStatus = useCallback(
    ({ item }) => (
      <StatusCard
        item={item}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    ),
    [statusFilter],
  );
  const handleDateSelect = useCallback(async (range, selectedType) => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    setReportDownloading(true);
    try {
      const params = {
        format: selectedType,
        fromDate: new Date(range.from).toISOString(),
        toDate: new Date(range.to).toISOString(),
        search: '',
        status: '',
      };

      const response = await apiClient.get(
        'finance/contractor/earnings/export',
        {
          params,
          responseType: 'blob',
        },
      );

      // ✅ Determine correct MIME type from selectedType
      let mimeType;
      let fileExtension;
      switch (selectedType) {
        case 'pdf':
          mimeType = 'application/pdf';
          fileExtension = 'pdf';
          break;
        case 'excel':
          mimeType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          fileExtension = 'xlsx';
          break;
        case 'csv':
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        default:
          mimeType = 'application/pdf';
          fileExtension = 'pdf';
      }

      const suggestedFileName = `earnings_report_${Date.now()}.${fileExtension}`;

      const blob = response.data;
      const filePath = await saveBlobToDevice(
        blob,
        suggestedFileName,
        mimeType, // ✅ now passes correct MIME type
        '',
      );

      await openLocalFile(filePath, suggestedFileName);
      // showToast('success', 'Report downloaded and opened');
    } catch (error) {
      console.log(error);
      showToast('error', 'Failed to generate report');
    } finally {
      setReportDownloading(false);
    }
  }, []);
  const ListEmptyComponent = useCallback(() => {
    if (!isLoading && (!financeFilter || financeFilter.length === 0)) {
      return (
        <View style={styles.emptyView}>
          <NoRecordFound style={{ width: 100, height: 100 }} />
          <Text style={styles.text}>
            No{' '}
            {statusFilter === 'all' ? 'Earnings' : getStatusLabel(statusFilter)}{' '}
            found!
          </Text>
        </View>
      );
    }
    return null;
  }, [isLoading, financeFilter, statusFilter]);

  const ListFooterComponent = useCallback(() => {
    if (financeFilter.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>No more content to show</Text>
        </View>
      );
    }
    if (paginationLoading) {
      return <ActivityIndicator size={'large'} color={AppColor.primaryBlue} />;
    }
    return null;
  }, [earningsState.hasMore, earningsState.data.length, paginationLoading]);
  const showLoading =
    isFirstLoading ||
    (isLoading && !earningsState?.data?.length && !refreshing);
  return (
    <Design
      navigation={navigation}
      isLoading={showLoading}
      userData={userData}
      financeFilter={financeFilter}
      renderEarningsCard={renderEarningsCard}
      setStatusFilter={setStatusFilter}
      statusFilter={statusFilter}
      renderStatus={renderStatus}
      dateModalVisible={dateModalVisible}
      setDateModalVisible={setDateModalVisible}
      handleDateSelect={handleDateSelect}
      showReceiptModal={showReceiptModal}
      setShowReceiptModal={setShowReceiptModal}
      onRefresh={onRefresh}
      fetchMore={fetchMore}
      paginationLoading={paginationLoading}
      hasMore={earningsState.hasMore}
      earnings={earningsState}
      refreshing={refreshing}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      dots={dots}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      state={state}
      setState={setState}
      reportDownloading={reportDownloading}
    />
  );
};

export default Finance;
