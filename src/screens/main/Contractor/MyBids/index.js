import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Design from './Design';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import { useDispatch, useSelector } from 'react-redux';
import { allSubmittedBidsData } from '../../../../redux/actions/contractorActions';
import { View } from 'react-native';
import BidsCard from '../../../../components/Contractor/DashboardCards/BidsCard/BidsCard';
import StatusCard from '../../../../components/Contractor/StatusCard';
import styles from './style';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';

const MyBids = ({ navigation }) => {
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const userData = useSelector(state => state.auth.data.userData);
  const userID = userData.user.id;
  const [searchText, setSearchText] = useState('');
  const status = [
    { label: 'All', value: 'all' },
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Rejected', value: 'REJECTED' },
  ];
  const [statusFilter, setStatusFilter] = useState(status[0].value);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [allBids, setAllBids] = useState([]);
  const [showDidDetailsModal, setBidDetialsModal] = useState(false);
  const initialLoaded = useRef(false);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true); // ✅ NEW

  useFocusEffect(
    useCallback(() => {
      if (!initialLoaded.current) {
        initialLoaded.current = true;
        setPage(1);
        setHasMore(true);
        setIsFirstLoading(true); // ✅ show skeleton immediately
        loadBids(1, true);
      }
      return () => {};
    }, []),
  );

  const refreshBids = async () => {
    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true); // ✅ show skeleton on refresh
    await loadBids(1, true);
  };

  const loadBids = async (pageNumber = 1, reset = false) => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      setIsFirstLoading(false);
      return;
    }

    if (!reset && (!hasMore || paginationLoading)) {
      return;
    }

    try {
      if (pageNumber > 1) {
        setPaginationLoading(true);
      }

      const response = await dispatch(
        allSubmittedBidsData(pageNumber, 10, '', userID, '', ''),
      );

      const bids = response?.bids || [];
      const totalPages = response?.totalPages || 1;

      setPage(pageNumber);
      setHasMore(pageNumber < totalPages);

      if (reset || pageNumber === 1) {
        setAllBids(bids);
      } else {
        setAllBids(prev => [...prev, ...bids]);
      }
    } catch (error) {
      showToast('error', error?.response?.message || error?.message);
      console.log('loadBids error', error);
    } finally {
      setRefreshing(false);
      setPaginationLoading(false);
      setIsFirstLoading(false); // ✅ first load finished
    }
  };

  const fetchMore = () => {
    if (hasMore && !isLoading && !paginationLoading && !refreshing) {
      loadBids(page + 1);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true); // ✅ show skeleton on refresh
    await loadBids(1, true);
  }, []);

  const filteredData = useMemo(() => {
    if (!Array.isArray(allBids) || allBids.length === 0) {
      return [];
    }
    const text = searchText?.toLowerCase()?.trim() || '';
    return allBids.filter(bid => {
      if (
        statusFilter !== 'all' &&
        bid?.status?.toUpperCase() !== statusFilter
      ) {
        return false;
      }
      if (!text) {
        return true;
      }
      const values = [
        bid?.id,
        bid?.jobId,
        bid?.job?.displayId,
        bid?.job?.title,
        bid?.job?.description,
        bid?.job?.jobStatus,
        bid?.job?.JobType,
        bid?.job?.budget,
        bid?.status,
        bid?.amount,
        bid?.contractor?.firstName,
        bid?.contractor?.lastName,
        bid?.job?.postedBy?.firstName,
        bid?.job?.postedBy?.lastName,
      ];

      return values
        .filter(value => value !== null && value !== undefined && value !== '')
        .some(value => String(value).toLowerCase().includes(text));
    });
  }, [allBids, searchText, statusFilter]);

  const renderStatus = useCallback(
    ({ item }) => {
      return (
        <View>
          <StatusCard
            item={item}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </View>
      );
    },
    [statusFilter],
  );

  const renderBids = useCallback(
    ({ item }) => {
      return (
        <View style={styles.actionCard}>
          <BidsCard
            item={item}
            navigation={navigation}
            openModal={openModal}
            setState={setState}
            refreshBids={refreshBids}
          />
        </View>
      );
    },
    [navigation, openModal, setState, refreshBids],
  );

  // ✅ Determine if we should show loading skeleton
  const showLoading =
    isFirstLoading || (isLoading && allBids.length === 0 && !refreshing);

  return (
    <Design
      navigation={navigation}
      isLoading={showLoading} // ✅ override with custom loading state
      refreshing={refreshing}
      onRefresh={onRefresh}
      filteredData={filteredData}
      status={status}
      setStatusFilter={setStatusFilter}
      statusFilter={statusFilter}
      searchText={searchText}
      setSearchText={setSearchText}
      renderStatus={renderStatus}
      renderBids={renderBids}
      showDidDetailsModal={showDidDetailsModal}
      setBidDetialsModal={setBidDetialsModal}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      fetchMore={fetchMore}
      state={state}
      setState={setState}
      paginationLoading={paginationLoading}
      hasMore={hasMore}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum.current = false;
      }}
      onEndReachedCalledDuringMomentum={onEndReachedCalledDuringMomentum}
    />
  );
};

export default MyBids;
