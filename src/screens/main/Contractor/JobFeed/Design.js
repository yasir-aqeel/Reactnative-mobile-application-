import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MyJobsSkeleton from '../../../../sekeletons/Contractor/MyJobsSkeleton';
import styles from './style';
import Header from '../../../../components/Header';
import CustomSwitch from '../../../../components/CustomSwitch';
import AppColor from '../../../../helpers/AppColor';
import { FlashList } from '@shopify/flash-list';

import {
  FilterIcon,
  LocationIcon,
  NoRecordFound,
  SearchIcon,
} from '../../../../assets/svg';
import JobFilterLocationModal from '../../../../components/Contractor/JobFilterLocationModal';
import JobFeedFilterModal from '../../../../components/Contractor/JobFeedFilterModal';

const Design = props => {
  return (
    <View style={styles.container}>
      <Header title={'Job Feed'} navigation={props.navigation} showOtherIcons />

      <View style={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <SearchIcon style={styles.searchIcon} />
            </View>

            <TextInput
              placeholder="search"
              placeholderTextColor={'#6A6A6A'}
              style={styles.input}
              value={props.searchText}
              onChangeText={text => {
                props.setSearchText(text);
              }}
              cursorColor={AppColor.primaryBlue}
              textAlignVertical="center"
            />
          </View>
        </View>
        <View style={styles.filterContainer}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={() => props.toggleFilterModal()}
              style={styles.filterButton}
            >
              <FilterIcon style={styles.filterIcon} fill={'#000000'} />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
            {props.isFilterApplied && (
              <TouchableOpacity
                onPress={() => props.clearFilters()}
                style={styles.clearButton}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterOptions}>
            <CustomSwitch
              value={props.switchValue}
              onValueChange={props.setSwitchValue}
              label={'Verified'}
              labelPosition={'right'}
              labelStyle={styles.text}
            />
            <TouchableOpacity
              onPress={() => props.toggleAreaModal()}
              style={styles.locationButton}
            >
              <LocationIcon style={styles.locationIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.flatlistView}>
          <View style={styles.flatlist}>
            {props.isLoading ? (
              <MyJobsSkeleton />
            ) : (
              <>
                <Text style={styles.headingText}>
                  {props.filteredData?.length ?? 0} results
                </Text>

                <FlashList
                  data={props.filteredData}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={props.renderJobFeedCard}
                  estimatedItemSize={280}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  contentContainerStyle={{
                    paddingTop: 5,
                    flexGrow: props.filteredData?.length === 0 ? 1 : undefined,
                    paddingBottom: 100,
                  }}
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
                  onMomentumScrollBegin={props.onMomentumScrollBegin}
                  onEndReached={() => {
                    if (
                      !props.onEndReachedCalledDuringMomentum.current &&
                      props.hasMore &&
                      !props.isLoading &&
                      !props.paginationLoading &&
                      props.filteredData?.length > 0
                    ) {
                      props.fetchMore();
                      props.onEndReachedCalledDuringMomentum.current = true;
                    }
                  }}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={() => {
                    if (props.paginationLoading) {
                      return (
                        <ActivityIndicator
                          size="large"
                          style={{ marginVertical: 20 }}
                          color={AppColor.primaryBlue}
                        />
                      );
                    }
                    if (!props.hasMore && props.filteredData?.length > 0) {
                      return (
                        <View style={styles.footer}>
                          <Text style={styles.footerText}>
                            No more content to show
                          </Text>
                        </View>
                      );
                    }
                    return null;
                  }}
                  ListEmptyComponent={() => {
                    if (!props.isLoading && props.filteredData?.length == 0) {
                      return (
                        <View style={styles.emptyView}>
                          <NoRecordFound style={{ height: 100, width: 100 }} />
                          <Text style={styles.noText}>No Jobs Found!</Text>
                        </View>
                      );
                    }
                    return null;
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
      <JobFeedFilterModal
        visible={props.filterModalVisible}
        onClose={props.toggleFilterModal}
        onApply={props.applyFilters}
      />
      <JobFilterLocationModal
        visible={props.areaModalVisible}
        onClose={props.toggleAreaModal}
        onApply={props.applyFilters}
      />
    </View>
  );
};

export default Design;
