import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from './style';
import AppColor from '../../../../helpers/AppColor';
import Header from '../../../../components/Header';
import {
  BackArrow,
  BankIcon,
  JobsIcon,
  NoRecordFound,
} from '../../../../assets/svg';
const { width } = Dimensions.get('window');
import {
  dashboardTabs,
  formatAmount,
  getStatusLabel,
} from '../../../../helpers/Data';
import DateSelectorModal from '../../../../components/Contractor/DateSelectorModal';
import StatsCard from '../../../../components/Contractor/StatsCard';
import CardSekeletoon from '../../../../sekeletons/Contractor/CardSekeletoon';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
const Design = props => {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };
  const topArray = [
    {
      name: 'Active Jobs',
      boost: '20x',
      value: props.isLoading
        ? props.dots
        : props.userData?.user?.totalJobsInProgress ?? 0,
      key: '$1',
      icon: JobsIcon,
      onPress: () =>
        props.navigation.navigate('Dashboard', {
          screen: 'Jobs',
        }),
    },
    {
      name: 'Earnings',
      boost: '20x',
      value: props.isLoading
        ? props.dots
        : `$${formatAmount(props.earningsDetails?.totalEarnings)}`,
      key: '22',
      icon: BankIcon,
      onPress: () =>
        props.navigation.navigate('Dashboard', {
          screen: 'Finance',
        }),
    },
  ];

  return (
    <View style={styles.container}>
      <Header showixrliIcon navigation={props.navigation} showOtherIcons />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
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
      >
        <View style={styles.headerContainer}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>
              {`${
                props.timePeriod +
                ',' +
                '\n' +
                props.userData.user.firstName +
                ' ' +
                props.userData.user.lastName
              }`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.setDateModalVisible(!props.dateModalVisible)}
            style={styles.filterContainer}
          >
            <View style={styles.filterView}>
              <Text style={styles.filterText}>{props.dateLabel}</Text>
              <BackArrow style={styles.icon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.statsView}>
          <ScrollView
            contentContainerStyle={styles.statsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            pointerEvents="none"
          >
            {topArray.map((item, index) => {
              return (
                <StatsCard item={item} index={index} onPress={item.onPress} />
              );
            })}
          </ScrollView>
          <View style={styles.quickView}>
            <Text style={styles.quickText}>Quick Overview</Text>

            <View style={styles.pagination}>
              {[1, 2].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.title}>Action Items</Text>
        <View style={styles.tabView}>
          <FlatList
            data={dashboardTabs(props.actionItemsDataDetails?.data)}
            keyExtractor={item => item.id}
            renderItem={props.renderTabs}
            horizontal
            key={'_'}
            contentContainerStyle={styles.tabContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.flatlistView}>
          {props.isLoading ? (
            <CardSekeletoon />
          ) : (
            <>
              <Text style={styles.headingText}>
                {getStatusLabel(props.statusFilter)}(
                {props?.currentData?.length ?? 0})
              </Text>
              <View style={styles.flatlist}>
                <FlashList
                  ref={props.flatListRef}
                  data={props?.currentData}
                  estimatedItemSize={280}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  keyExtractor={(item, index) => item.id + index}
                  renderItem={props.renderDashboardData}
                  onEndReached={props.loadMore}
                  onEndReachedThreshold={0.3}
                  onScroll={props.handleScroll}
                  scrollEventThrottle={16}
                  ListFooterComponent={
                    !props.isLoading &&
                    props?.currentData?.length > 0 && (
                      <View style={styles.footer}>
                        <Text style={styles.footerText}>
                          No more content to show
                        </Text>
                      </View>
                    )
                  }
                  ListEmptyComponent={() => {
                    if (
                      !props.isLoading &&
                      (!props.actionItemsDataDetails ||
                        props?.currentData?.length === 0)
                    ) {
                      return (
                        <View style={styles.emptyView}>
                          <NoRecordFound style={{ height: 100, width: 100 }} />
                          <Text style={styles.text}>
                            No{' '}
                            {props.statusFilter === 'all'
                              ? 'Action'
                              : getStatusLabel(props.statusFilter)}{' '}
                            found!
                          </Text>
                        </View>
                      );
                    }
                    return null;
                  }}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <DateSelectorModal
        visible={props.dateModalVisible}
        onClose={() => props.setDateModalVisible(false)}
        onSelect={props.handleDateSelect}
        type={'dashboard'}
      />

      <ModalRenderer
        activeModal={props.activeModal}
        closeModal={props.closeModal}
        openModal={props.openModal}
        state={props.state}
        setState={props.setState}
      />
    </View>
  );
};

export default Design;
