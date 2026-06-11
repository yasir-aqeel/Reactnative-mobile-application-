import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  FlatList,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import SubmittedBidsSekeleton from '../../../../sekeletons/Contractor/SubmittedBidsSekeleton';
import styles from './style';
import Header from '../../../../components/Header';
import AppColor from '../../../../helpers/AppColor';
import { NoRecordFound, SearchIcon } from '../../../../assets/svg';
import { getStatusLabel } from '../../../../helpers/Data';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
const Design = props => {
  return (
    <View style={styles.container}>
      <Header title={'My Bids'} navigation={props.navigation} showOtherIcons />

      <View style={styles.scrollContent}>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <SearchIcon style={{ height: 15, width: 15 }} />
            </View>

            <TextInput
              placeholder="Search bid with ID"
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
        <View style={styles.filterOptions}>
          <FlatList
            data={props.status}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            key={'_'}
            contentContainerStyle={styles.filterList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={props.renderStatus}
          />
        </View>
        <View style={styles.flatlistView}>
          {props.isLoading ? (
            <SubmittedBidsSekeleton />
          ) : (
            <>
              <Text style={styles.headingText}>
                {getStatusLabel(props.statusFilter)}(
                {props.filteredData.length ?? 0})
              </Text>
              <View style={styles.flatlist}>
                <FlashList
                  showsVerticalScrollIndicator={false}
                  data={props.filteredData}
                  keyExtractor={item => item.id.toString()}
                  renderItem={props.renderBids}
                  estimatedItemSize={300}
                  onEndReached={props.fetchMore}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    <>
                      {props.isLoading && props.filteredData?.length > 0 ? (
                        <ActivityIndicator
                          size="large"
                          style={{ marginVertical: 20 }}
                          color={AppColor.primaryBlue}
                        />
                      ) : !props.hasMore && props.filteredData?.length > 0 ? (
                        <View style={styles.footer}>
                          <Text style={styles.footerText}>
                            No more content to show
                          </Text>
                        </View>
                      ) : null}
                    </>
                  }
                  ListEmptyComponent={() => {
                    if (
                      !props.isLoading &&
                      (!props.filteredData || props.filteredData.length === 0)
                    ) {
                      return (
                        <View style={styles.footer1}>
                          <NoRecordFound style={{ height: 100, width: 100 }} />
                          <Text style={styles.text}>No Bids found</Text>
                        </View>
                      );
                    }

                    return null;
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
                />
              </View>
            </>
          )}
        </View>
      </View>

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
