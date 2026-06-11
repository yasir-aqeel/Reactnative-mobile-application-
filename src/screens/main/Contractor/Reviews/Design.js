import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native';
import { NoRecordFound, RatingStart } from '../../../../assets/svg';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './style';
import {
  getStatusLabel,
  reviewOptions,
  reviewsFilterStatus,
} from '../../../../helpers/Data';
import RatingCard from '../../../../components/Contractor/RatingCard';
import Header from '../../../../components/Header';
import AppColor from '../../../../helpers/AppColor';
import ReviewsCardSkeleton from '../../../../sekeletons/Contractor/ReviewsCardSkeleton';
const Design = props => {
  const topArray = [
    {
      name: 'Rating',
      value: props?.isFirstLoading
        ? props.dots
        : (props?.reviewsData?.averageRating ?? 0).toFixed(1),
      key: '$1',
    },
    {
      name: 'Reviews',
      value: props?.isFirstLoading
        ? props.dots
        : (props?.reviewsData?.totalReviews ?? 0).toFixed(1),
      key: '22',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title={'Reviews'} navigation={props.navigation} showOtherIcons />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.secondContainer}
        contentContainerStyle={{ flexGrow: 1 }}
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
        <View style={styles.statsView}>
          <View style={styles.topBox}>
            <View style={styles.view1}>
              <Text style={styles.text1}>
                {props?.isFirstLoading
                  ? props.dots
                  : (props?.reviewsData?.averageRating ?? 0).toFixed(1)}
              </Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <RatingStart
                    key={star}
                    style={styles.sideIcon}
                    fill={
                      star <= Math.round(props?.reviewsData?.averageRating ?? 0)
                        ? '#FF8D28'
                        : '#E0E0E0'
                    }
                  />
                ))}
              </View>
            </View>
            <View style={styles.view2}>
              <Text style={styles.text2}>Rating</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.content}
            horizontal
            showsHorizontalScrollIndicator={false}
            pointerEvents="none"
          >
            {topArray.map((item, index) => {
              return <RatingCard item={item} index={index} />;
            })}
          </ScrollView>
        </View>
        <View style={{ width: '100%' }}>
          <View style={styles.dropDowncontainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={reviewOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Last 7 Days'}
              value={props.selectedDays}
              onChange={item => {
                props.setSelectedDays(item.value);
              }}
            />
          </View>
          <View style={styles.statusView}>
            <FlatList
              data={reviewsFilterStatus}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              key={'_'}
              contentContainerStyle={styles.content2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={props.renderStatus}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.flatlistView}>
            <View style={styles.flatlist}>
              {props?.isFirstLoading ? (
                <ReviewsCardSkeleton />
              ) : (
                <FlatList
                  data={props.filteredReviews}
                  keyExtractor={(item, index) => item.key + index}
                  renderItem={props.renderReviewsData}
                  ListHeaderComponent={
                    <>
                      <Text style={styles.headingText}>
                        {getStatusLabel(props.statusFilter)}(
                        {props.filteredReviews.length ?? 0})
                      </Text>
                    </>
                  }
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={
                    <>
                      {props.filteredReviews.length > 0 && (
                        <View style={styles.footer}>
                          <Text style={styles.footerText}>
                            No more content to show
                          </Text>
                        </View>
                      )}
                    </>
                  }
                  ListEmptyComponent={() => {
                    if (props.filteredReviews.length === 0) {
                      return (
                        <View style={styles.emptyView}>
                          <NoRecordFound style={{ height: 100, width: 100 }} />
                          <Text style={styles.text}>
                            No{' '}
                            {props.statusFilter === 'all'
                              ? 'Reviews'
                              : getStatusLabel(props.statusFilter)}{' '}
                            found!
                          </Text>
                        </View>
                      );
                    }
                    return null;
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Design;
