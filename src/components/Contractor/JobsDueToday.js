import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MyJobsSkeleton from '../../sekeletons/Contractor/MyJobsSkeleton';
import AppColor from '../../helpers/AppColor';
import { PopinsFont } from '../../helpers/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getStatusColor, hasInternet } from '../../helpers/services';
import { getJobsDueTodayData } from '../../redux/actions/contractorActions';
const JobsDueToday = () => {
  const userData = useSelector(state => state.auth.data.userData);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const jobsDueToday = useSelector(state => state.contractor.data.jobsDueToday);

  const token = userData.access_token;
  const [refreshing, setRefreshing] = useState(false);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (jobsDueToday?.jobs) {
      setJobs(jobsDueToday.jobs);
    }
  }, [jobsDueToday]);

  // Load initial jobs when screen is focused
  useEffect(() => {
    loadDueJobs(); // page 1, reset with current filters
  }, [isFocused]); // re-run when filters change

  // Refresh function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDueJobs();
    setRefreshing(false);
  }, []);

  // Main loader
  const loadDueJobs = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    try {
      const response = await dispatch(getJobsDueTodayData(token));

      console.log(response.jobs.length);
    } catch (error) {
      showToast('error', error?.response?.message || error.message);
      console.log('loadNewJobs error', error);
    }
  };
  const truncateAddress = (address, maxLength = 25) => {
    if (!address) return '';

    if (address.length <= maxLength) {
      return address;
    }

    return address.substring(0, maxLength) + '...';
  };
  const renderJob = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.displayIdView}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.displayText}>({item.displayId})</Text>
          </View>
          {/* {renderIcons(item.jobStatus)} */}
        </View>

        <View style={styles.badgeRow}>
          <View
            style={[
              styles.dot,
              { backgroundColor: getStatusColor(item.jobStatus) },
            ]}
          />
          <Text style={styles.typeText}>
            {item.jobStatus?.replace(/_/g, ' ')}
          </Text>

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.JobType}</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: AppColor.grayBackground,
            marginVertical: 5,
            alignSelf: 'center',
          }}
        />
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>Owner</Text>
            <Text style={styles.name} numberOfLines={1}>
              {item.postedBy?.firstName}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
              {truncateAddress(item.location)}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.name}>${item.downPaymentAmount ?? 0}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContent}>
        {isLoading ? (
          <MyJobsSkeleton />
        ) : (
          <FlashList
            data={jobsDueToday.jobs}
            estimatedItemSize={400}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={renderJob}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[
                  AppColor.primaryBlue,
                  AppColor.green1,
                  AppColor.redDark,
                  AppColor.purpleLight,
                ]}
                progressBackgroundColor={AppColor.white}
                tintColor={AppColor.primaryBlue}
              />
            }
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              jobs.length > 1 &&
              !isLoading && (
                <TouchableOpacity
                  onPress={restoreLastJob}
                  style={styles.previousButton}
                >
                  <Text style={styles.previousButtonText}>Previous</Text>
                </TouchableOpacity>
              )
            }
            ListEmptyComponent={
              !isLoading &&
              (jobs.length ?? 0) === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: AppColor.white,
                    height: 500,
                  }}
                >
                  <Text style={styles.noRecord}>No New Jobs Found!</Text>
                </View>
              )
            }
          />
        )}
      </View>
    </View>
  );
};

export default JobsDueToday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  scrollContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignItems: 'center',
  },

  dashboardTitle: {
    fontSize: 17,
    fontFamily: PopinsFont.semiBold,
    color: AppColor.black,
  },

  sectionTitle: {
    fontSize: 15,
    color: AppColor.white,
    fontFamily: PopinsFont.medium,
  },

  card: {
    backgroundColor: '#F2F2F2',
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 1,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  jobTitle: {
    fontSize: 15,
    fontFamily: PopinsFont.medium,
    color: AppColor.black,
  },
  displayIdView: { flexDirection: 'row', gap: 2, alignItems: 'center' },
  displayText: {
    color: AppColor.primaryBlue,
    fontFamily: PopinsFont.regular,
    fontSize: 10,
    marginLeft: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  badge: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignItems: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginRight: 5,
  },

  badgeText: {
    fontSize: 12,
    fontFamily: PopinsFont.regular,
    color: AppColor.black,
  },

  typeBadge: {
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 10,
  },

  typeText: {
    fontSize: 12,
    fontFamily: PopinsFont.regular,
    color: AppColor.black,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 15,
    alignItems: 'center',
  },

  label: {
    fontSize: 12,
    color: '#AFAFAF',
    fontFamily: PopinsFont.medium,
  },

  name: {
    fontSize: 12,
    color: AppColor.black,
    fontFamily: PopinsFont.bold,
  },
  address: {
    fontSize: 12,
    color: AppColor.black,
    fontFamily: PopinsFont.regular,
    flexShrink: 1,
  },

  iconRow: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: AppColor.white,
    borderWidth: 1,
    borderColor: AppColor.green1,
    padding: 5,
  },
  view1: {
    backgroundColor: AppColor.primaryBlue,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
