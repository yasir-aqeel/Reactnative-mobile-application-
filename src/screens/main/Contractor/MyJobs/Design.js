import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './style';
import Header from '../../../../components/Header';
import AppColor from '../../../../helpers/AppColor';
import { FlashList } from '@shopify/flash-list';
import { NoRecordFound, SearchIcon } from '../../../../assets/svg';
import { filterStatus, getStatusLabel } from '../../../../helpers/Data';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
import CardSekeletoon from '../../../../sekeletons/Contractor/CardSekeletoon';
const Design = props => {
  return (
    <View style={styles.container}>
      <Header title={'My Jobs'} navigation={props.navigation} showOtherIcons />

      <View style={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <SearchIcon style={{ height: 15, width: 15 }} />
            </View>

            <TextInput
              placeholder="Search job with ID"
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
            data={filterStatus}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            key={'_'}
            contentContainerStyle={styles.filterList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={props.renderStatus}
          />
        </View>

        <View style={styles.flatlistView}>
          {!props.isLoading && (
            <Text style={styles.headingText}>
              {getStatusLabel(props.statusFilter)}(
              {props.filteredData.length ?? 0})
            </Text>
          )}

          <View style={styles.flatlist}>
            {props.isLoading ? (
              <CardSekeletoon />
            ) : (
              <FlashList
                data={props.filteredData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={props.renderJobsData}
                contentContainerStyle={{
                  paddingTop: 5,
                  flexGrow: props.filteredData?.length === 0 ? 1 : undefined,
                  paddingBottom: 100,
                }}
                estimatedItemSize={200}
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
                  if (!props.isLoading && props.filteredData?.length === 0) {
                    return (
                      <View style={styles.footer1}>
                        <NoRecordFound style={{ height: 100, width: 100 }} />
                        <Text style={styles.text}>No Jobs found</Text>
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
            )}
          </View>
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
