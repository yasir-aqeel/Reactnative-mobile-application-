import React, { useCallback, useEffect, useRef, useState } from 'react';

import Design from './Design';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { directAssignedBids } from '../../../../redux/actions/contractorActions';

import { View } from 'react-native';
import StatusCard from '../../../../components/Contractor/StatusCard';
import InvitationsCard from '../../../../components/Contractor/DashboardCards/InvitationsCard/InvitationsCard';

const status = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Offer Sent', value: 'OFFER_SENT' },
  { label: 'Expired', value: 'EXPIRED' },
];

const Invitations = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.contractor.isLoading);
  const userData = useSelector(state => state.auth.data.userData);

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(status[0].value);

  const [invitations, setInvitations] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const initialLoaded = useRef(false);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // initial load
  useEffect(() => {
    if (isFocused && !initialLoaded.current) {
      initialLoaded.current = true;
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
      return;
    }

    if (!reset && (!hasMore || paginationLoading)) {
      return;
    }

    try {
      if (pageNumber > 1) {
        setPaginationLoading(true);
      }

      const updatedFilters = {
        ...customFilters,
        page: pageNumber,
      };

      setFilters(updatedFilters);

      const jobResponse = await dispatch(
        directAssignedBids(userData.user.id, updatedFilters),
      );

      const jobs = jobResponse?.jobs || [];
      const totalPages = jobResponse?.totalPages || 1;

      if (!isMounted.current) return;

      setPage(pageNumber);
      setHasMore(pageNumber < totalPages);

      if (reset || pageNumber === 1) {
        setInvitations(jobs);
      } else {
        setInvitations(prev => {
          const existingIds = new Set(prev.map(i => i.id));
          const newItems = jobs.filter(j => !existingIds.has(j.id));
          return [...prev, ...newItems];
        });
      }
    } catch (error) {
      showToast('error', error?.message || 'Something went wrong');
      console.log('loadJobs error', error);
    } finally {
      if (isMounted.current) {
        setRefreshing(false);
        setPaginationLoading(false);
      }
    }
  };

  const fetchMore = () => {
    if (onEndReachedCalledDuringMomentum.current) return;

    if (hasMore && !isLoading && !paginationLoading && !refreshing) {
      onEndReachedCalledDuringMomentum.current = true;
      loadJobs(page + 1, filters);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);

    const resetFilters = { ...filters, page: 1 };

    await loadJobs(1, resetFilters, true);
  }, [filters]);
  console.log('invitations', invitations);
  const renderStatus = ({ item }) => {
    return (
      <View>
        <StatusCard
          item={item}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </View>
    );
  };

  const renderInviteCard = useCallback(
    ({ item }) => {
      return (
        <View>
          <InvitationsCard item={item} navigation={navigation} />
        </View>
      );
    },
    [navigation],
  );

  return (
    <Design
      navigation={navigation}
      status={status}
      setStatusFilter={setStatusFilter}
      statusFilter={statusFilter}
      searchText={searchText}
      setSearchText={setSearchText}
      renderStatus={renderStatus}
      invitations={invitations}
      renderInviteCard={renderInviteCard}
      fetchMore={fetchMore}
      isLoading={isLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
      paginationLoading={paginationLoading}
      hasMore={hasMore}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum.current = false;
      }}
    />
  );
};

export default Invitations;
