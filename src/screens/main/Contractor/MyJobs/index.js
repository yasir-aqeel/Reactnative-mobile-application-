import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Design from './Design';
import styles from './style';
import { getMyAppliedJobsData } from '../../../../redux/actions/contractorActions';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import { filterStatus } from '../../../../helpers/Data';
import JobsCard from '../../../../components/Contractor/DashboardCards/JobsCard/JobsCard';
import StatusCard from '../../../../components/Contractor/StatusCard';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';

const MyJobs = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const didInitialLoad = useRef(false);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const userData = useSelector(state => state.auth.data.userData);
  const isLoading = useSelector(state => state.contractor.isLoading);
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(filterStatus[0].value);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const statusLabel = filterStatus.find(
    item => item.value === statusFilter,
  ).label;
  useEffect(() => {
    if (isFocused && !activeModal) {
      setPage(1);
      setHasMore(true);
      setIsFirstLoading(true);
      loadJobs(1);
    }
  }, [isFocused, activeModal]);
  useEffect(() => {
    if (!isFocused) return;

    didInitialLoad.current = true;
    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true);
    loadJobs(1);
  }, [isFocused, statusFilter]);
  const refreshJobs = async () => {
    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true); // ✅ show skeleton on refresh
    await loadBids(1, true);
  };

  const loadJobs = useCallback(
    async (pageNumber = 1) => {
      const internetStatus = await hasInternet();
      if (!internetStatus) {
        showToast('info', 'No Internet Connection');
        setIsFirstLoading(false);
        return;
      }
      if (paginationLoading) return;
      try {
        if (pageNumber > 1) {
          setPaginationLoading(true);
        }
        const response = await dispatch(
          getMyAppliedJobsData(
            userData?.user?.id,
            pageNumber,
            10,
            statusFilter,
          ),
        );
        const newJobs = response?.data || [];
        const currentPage = response?.page;
        const totalPages = response?.totalPages;
        setHasMore(currentPage < totalPages);
        setPage(currentPage);
        setJobs(prev => (pageNumber === 1 ? newJobs : [...prev, ...newJobs]));
      } catch (error) {
        showToast('error', error?.response?.message || 'Something went wrong');
      } finally {
        setPaginationLoading(false);
        setRefreshing(false);
        setIsFirstLoading(false); // ✅ first load finished
      }
    },
    [dispatch, userData?.user?.id, statusFilter, paginationLoading],
  );

  const fetchMore = useCallback(() => {
    if (!hasMore || isLoading || paginationLoading) return;
    loadJobs(page + 1);
  }, [hasMore, isLoading, paginationLoading, loadJobs, page]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true); // ✅ show loading on refresh
    await loadJobs(1);
  }, [loadJobs]);

  const filteredData = useMemo(() => {
    const text = searchText?.toLowerCase()?.trim() || '';
    let data =
      statusFilter === 'all'
        ? jobs
        : jobs.filter(job => job?.jobStatus === statusFilter);

    if (!text) return data;

    return data.filter(job => {
      const searchableValues = [
        job?.id,
        job?.displayId,
        job?.title,
        job?.description,
        job?.jobStatus,
        job?.JobType,
        job?.budget,
        job?.deadline,
        job?.property?.name,
        job?.property?.address,
        job?.postedBy?.firstName,
        job?.postedBy?.lastName,
        `${job?.postedBy?.firstName || ''} ${job?.postedBy?.lastName || ''}`,
        ...(job?.categories?.map(cat => cat?.name) || []),
      ];
      return searchableValues
        .filter(v => v !== null && v !== undefined && v !== '')
        .some(v => String(v).toLowerCase().includes(text));
    });
  }, [jobs, searchText, statusFilter]);

  const renderStatus = useCallback(
    ({ item }) => (
      <View>
        <StatusCard
          item={item}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </View>
    ),
    [statusFilter],
  );

  const renderJobsData = useCallback(
    ({ item }) => (
      <View style={styles.actionCard}>
        <JobsCard
          item={item}
          navigation={navigation}
          openModal={openModal}
          setState={setState}
          refreshJobs={refreshJobs}
        />
      </View>
    ),
    [navigation, openModal],
  );

  // ✅ Show loading skeleton during first load or when redux loading is true and no jobs exist
  const showLoading =
    isFirstLoading || (isLoading && jobs.length === 0 && !refreshing);

  return (
    <Design
      navigation={navigation}
      filteredData={filteredData}
      fetchMore={fetchMore}
      isLoading={showLoading} // ✅ overrides the original isLoading prop
      refreshing={refreshing}
      onRefresh={onRefresh}
      setStatusFilter={setStatusFilter}
      statusFilter={statusFilter}
      searchText={searchText}
      setSearchText={setSearchText}
      renderStatus={renderStatus}
      renderJobsData={renderJobsData}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      state={state}
      setState={setState}
      statusLabel={statusLabel}
      paginationLoading={paginationLoading}
      hasMore={hasMore}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum.current = false;
      }}
      onEndReachedCalledDuringMomentum={onEndReachedCalledDuringMomentum}
    />
  );
};
export default MyJobs;
