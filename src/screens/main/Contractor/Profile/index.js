import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Design from './Design';
import { useSelector } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import ReviewsCard from '../../../../components/Contractor/ReviewsCard';
import { Image } from 'react-native';
import { images } from '../../../../assets/images';
import { RatingStart } from '../../../../assets/svg';
import { useIsFocused } from '@react-navigation/native';
import apiClient from '../../../../helpers/apiClient';
import { showToast } from '../../../../helpers/ToastConfig';
import { hasInternet } from '../../../../helpers/services';
import FastImage from '@d11/react-native-fast-image';
const Profile = ({ navigation }) => {
  const userData = useSelector(state => state.auth.data.userData);
  const isFocused = useIsFocused();

  const status = [
    { value: 5, name: '5' },
    { value: 4, name: '4' },
    { value: 3, name: '3' },
    { value: 2, name: '2' },
    { value: 1, name: '1' },
  ];
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const flatListRef = useRef(null);
  const currentOffset = useRef(0);
  const [reviewsData, setReviewsData] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingBreakdown: [],
    feedbacks: [],
  });

  useEffect(() => {
    if (isFocused) {
      fetchReviews();
    }
  }, [isFocused]);

  const fetchReviews = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      const userId = userData?.user?.id;
      const response = await apiClient.get(`feedback/to/${userId}`);
      const contractorGallery = await apiClient.get(
        `jobs/profile-gallery/contractor/${userId}`,
      );

      if (response.status === 200) {
        setReviewsData(response.data);
      }
      if (
        contractorGallery.status === 200 &&
        contractorGallery?.data?.photos.length > 0
      ) {
        setGalleryPhotos(contractorGallery?.data?.photos);
      }
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
      console.log('fetchReviews error', error);
    } finally {
      setIsFirstLoading(false);
      setRefreshing(false);
    }
  };

  const filteredFeedbacks = useMemo(() => {
    if (!reviewsData.feedbacks) return [];
    if (statusFilter === null) return reviewsData.feedbacks;
    return reviewsData.feedbacks.filter(fb => fb.rating === statusFilter);
  }, [reviewsData.feedbacks, statusFilter]);

  // Build rating filter options with counts
  const ratingOptions = useMemo(() => {
    const breakdownMap = new Map();
    reviewsData.ratingBreakdown?.forEach(item => {
      breakdownMap.set(item.stars, item.count);
    });
    // Always include all stars 5..1 with default count 0
    return [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: breakdownMap.get(stars) || 0,
    }));
  }, [reviewsData.ratingBreakdown]);
  const onScroll = event => {
    currentOffset.current = event.nativeEvent.contentOffset.x;
  };
  const scrollLeft = () => {
    flatListRef.current?.scrollToOffset({
      offset: Math.max(currentOffset.current - 150, 0),
      animated: true,
    });
  };

  const scrollRight = () => {
    flatListRef.current?.scrollToOffset({
      offset: currentOffset.current + 150,
      animated: true,
    });
  };

  const renderData = ({ item }) => {
    return (
      <View style={styles.actionCard}>
        <ReviewsCard item={item} />
      </View>
    );
  };

  const renderStatus = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setStatusFilter(item.value)}
        style={[
          styles.renderView,
          {
            backgroundColor:
              statusFilter === item.value ? '#FF8D28' : '#FFFFFF',
            borderColor: statusFilter === item.value ? '#FF8D28' : '#E1E1E1',
          },
        ]}
      >
        <RatingStart
          style={{ height: 18, width: 18 }}
          fill={statusFilter === item.value ? '#FFF' : '#FF8D28'}
        />
        <Text
          style={[
            styles.renderText,
            { color: statusFilter === item.value ? '#FFF' : '#989898' },
          ]}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 10 }}>
        <View
          style={{
            width: 150,
            height: 100,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <FastImage
            source={{ uri: item.url }}
            style={{ width: '100%', height: '100%' }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    );
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setIsFirstLoading(true);
    await fetchReviews();
  }, []);
  const renderReviewsData = ({ item }) => {
    return (
      <View style={styles.actionCard}>
        <ReviewsCard item={item} />
      </View>
    );
  };

  return (
    <Design
      navigation={navigation}
      userData={userData}
      renderData={renderData}
      reviewsData={reviewsData}
      statusFilter={statusFilter}
      renderStatus={renderStatus}
      renderItem={renderItem}
      scrollRight={scrollRight}
      scrollLeft={scrollLeft}
      status={status}
      flatListRef={flatListRef}
      onScroll={onScroll}
      refreshing={refreshing}
      onRefresh={onRefresh}
      isFirstLoading={isFirstLoading}
      renderReviewsData={renderReviewsData}
      filteredFeedbacks={filteredFeedbacks}
      galleryPhotos={galleryPhotos}
    />
  );
};

export default Profile;
