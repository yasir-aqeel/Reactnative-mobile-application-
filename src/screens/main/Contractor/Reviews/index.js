import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Design from './Design';
import StatusCard from '../../../../components/Contractor/StatusCard';
import { View } from 'react-native';
import {
  filterFeedbacksByDate,
  filterFeedbacksBySentiment,
  reviewOptions,
  reviewsFilterStatus,
} from '../../../../helpers/Data';
import ReviewsCard from '../../../../components/Contractor/ReviewsCard';
import styles from './style';
import { useSelector } from 'react-redux';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import apiClient from '../../../../helpers/apiClient';
import { useIsFocused } from '@react-navigation/native';

const Reviews = ({ navigation }) => {
  const isFocused = useIsFocused();
  const userData = useSelector(state => state.auth.data.userData);

  const [reviewsData, setReviewsData] = useState(null);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState(
    reviewsFilterStatus[0].value,
  );

  const [selectedDays, setSelectedDays] = useState(reviewOptions[0].value);

  const filteredReviews = useMemo(() => {
    const list = reviewsData?.feedbacks ?? [];

    return filterFeedbacksBySentiment(
      filterFeedbacksByDate(list, selectedDays),
      statusFilter,
    );
  }, [reviewsData?.feedbacks, selectedDays, statusFilter]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 5 ? '' : prev + '.'));
    }, 50);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (isFocused) {
      fetchReviews();
    }
  }, [isFocused]);

  const fetchReviews = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      setIsFirstLoading(false);
      return;
    }

    try {
      const userId = userData?.user?.id;
      const getReviewsData = await apiClient.get(`feedback/to/${userId}`);
      if (getReviewsData.status === 200) {
        setReviewsData(getReviewsData.data);
      }
    } catch (error) {
      showToast('error', error?.response?.message || 'Something went wrong');
      console.log('fetchItems error', error);
    } finally {
      setIsFirstLoading(false);
      setRefreshing(false);
    }
  };

  const renderStatus = ({ item, index }) => {
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
  const renderReviewsData = ({ item }) => {
    return (
      <View style={styles.actionCard}>
        <ReviewsCard item={item} />
      </View>
    );
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setIsFirstLoading(true);
    await fetchReviews();
  }, []);
  return (
    <Design
      navigation={navigation}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      renderStatus={renderStatus}
      filteredReviews={filteredReviews}
      reviewsData={reviewsData}
      renderReviewsData={renderReviewsData}
      selectedDays={selectedDays}
      setSelectedDays={setSelectedDays}
      refreshing={refreshing}
      onRefresh={onRefresh}
      isFirstLoading={isFirstLoading}
      dots={dots}
    />
  );
};

export default Reviews;
