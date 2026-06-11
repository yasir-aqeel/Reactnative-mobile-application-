import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Design from './Design';
import JobFeedCard from '../../../../components/Contractor/JobFeedCard';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableJobsForContractorData } from '../../../../redux/actions/contractorActions';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
const DEFAULT_FILTERS = {
  page: 1,
  limit: 10,
  search: '',
  city: '',
  minBudget: '',
  maxBudget: '',
  jobTypes: [],
  metrics: [],
  service: [],
  sortBy: '',
  sortOrder: '',
  latitude: '',
  longitude: '',
  zip: '',
  miles: '',
};
const JobFeed = ({ navigation }) => {
  const userData = useSelector(state => state.auth.data.userData);
  const initialLoaded = useRef(false);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [areaModalVisible, setAreaModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true); // ✅ NEW
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    if (isFocused && !initialLoaded.current) {
      initialLoaded.current = true;
      setIsFirstLoading(true);
      loadJobs(1, filters, true);
    }
  }, [isFocused]);

  const loadJobs = async (
    pageNumber = 1,
    customFilters = filters,
    reset = false,
  ) => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      setIsFirstLoading(false);
      return;
    }
    if (!reset && (!hasMore || paginationLoading)) return;
    try {
      if (pageNumber > 1) setPaginationLoading(true);

      const updatedFilters = { ...customFilters, page: pageNumber };
      setFilters(updatedFilters);
      const jobResponse = await dispatch(
        getAvailableJobsForContractorData(updatedFilters),
      );
      const jobs = jobResponse?.data || [];
      const totalPages = jobResponse?.totalPages || 1;

      setPage(pageNumber);
      setHasMore(pageNumber < totalPages);
      if (reset || pageNumber === 1) setFilteredJobs(jobs);
      else setFilteredJobs(prev => [...prev, ...jobs]);
    } catch (error) {
      showToast('error', error?.message || 'Something went wrong');
      console.log('loadJobs error', error);
    } finally {
      setRefreshing(false);
      setPaginationLoading(false);
      setIsFirstLoading(false);
    }
  };
  const filteredData = useMemo(() => {
    const search = searchText?.toLowerCase().trim() || '';

    let jobs = filteredJobs || [];

    if (switchValue) {
      jobs = jobs.filter(job => job?.postedBy?.identityVerified);
    }

    return jobs.filter(job => {
      const values = [
        job?.id,
        job?.displayId,
        job?.title,
        job?.description,
        job?.budget,
        job?.jobStatus,
        job?.JobType,
        job?.currency,
        job?.postedBy?.firstName,
        job?.postedBy?.lastName,
        job?.postedBy?.email,
        ...(job?.categories?.map(cat => cat?.name) || []),
      ];

      return values
        .filter(val => val !== null && val !== undefined && val !== '')
        .some(val => val.toString().toLowerCase().includes(search));
    });
  }, [filteredJobs, searchText, switchValue]);
  const fetchMore = () => {
    if (hasMore && !isLoading && !paginationLoading && !refreshing) {
      loadJobs(page + 1, filters);
    }
  };

  const applyFilters = useCallback(async appliedFilters => {
    console.log('FILTER APPLIED', appliedFilters);

    const updatedFilters = {
      ...DEFAULT_FILTERS,
      ...appliedFilters,
      page: 1,
      limit: 10,
    };

    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true);

    setFilters(updatedFilters);

    await loadJobs(1, updatedFilters, true);
  }, []);

  const renderJobFeedCard = useCallback(
    ({ item }) => <JobFeedCard job={item} navigation={navigation} />,
    [navigation],
  );

  const toggleFilterModal = () => setFilterModalVisible(!filterModalVisible);
  const toggleAreaModal = () => setAreaModalVisible(!areaModalVisible);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true);
    await loadJobs(1, filters, true);
  }, [filters]);

  const showLoading =
    isFirstLoading || (isLoading && filteredJobs.length === 0 && !refreshing);
  const isFilterApplied = useMemo(() => {
    return Object.keys(DEFAULT_FILTERS).some(key => {
      if (['page', 'limit', 'search'].includes(key)) return false;

      const currentValue = filters[key];
      const defaultValue = DEFAULT_FILTERS[key];

      // array check
      if (Array.isArray(currentValue)) {
        return currentValue.length > 0;
      }

      return currentValue !== defaultValue;
    });
  }, [filters]);
  // console.log('isFilterApplied', isFilterApplied);
  const clearFilters = async () => {
    setFilters(DEFAULT_FILTERS);

    setPage(1);
    setHasMore(true);
    setIsFirstLoading(true);

    await loadJobs(1, DEFAULT_FILTERS, true);
  };
  return (
    <Design
      navigation={navigation}
      filterModalVisible={filterModalVisible}
      setFilterModalVisible={setFilterModalVisible}
      areaModalVisible={areaModalVisible}
      setAreaModalVisible={setAreaModalVisible}
      searchText={searchText}
      setSearchText={setSearchText}
      renderJobFeedCard={renderJobFeedCard}
      applyFilters={applyFilters}
      switchValue={switchValue}
      setSwitchValue={setSwitchValue}
      toggleFilterModal={toggleFilterModal}
      toggleAreaModal={toggleAreaModal}
      filteredData={filteredData}
      fetchMore={fetchMore}
      isLoading={showLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
      paginationLoading={paginationLoading}
      hasMore={hasMore}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum.current = false;
      }}
      onEndReachedCalledDuringMomentum={onEndReachedCalledDuringMomentum}
      clearFilters={clearFilters}
      isFilterApplied={isFilterApplied}
    />
  );
};

export default JobFeed;
