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
import { SearchIcon } from '../../../../assets/svg';
import { getStatusLabel } from '../../../../helpers/Data';
import CardSekeletoon from '../../../../sekeletons/Contractor/CardSekeletoon';
const Design = props => {
  const filteredData = useMemo(() => {
    const searchText = props.searchText?.toLowerCase().trim() || '';

    if (!searchText) return props.invitations || [];

    return (props.invitations || []).filter(item => {
      const job = item?.job;
      const contractor = item?.contractor;
      const requestedBy = item?.requestedBy;

      const values = [
        item?.jobId,
        item?.status,
        item?.id,

        // job fields (IMPORTANT)
        job?.title,
        job?.description,
        job?.displayId,
        job?.jobStatus,
        job?.JobType,
        job?.currency,

        // category name
        job?.categories?.map(c => c?.name).join(' '),

        // contractor fields
        contractor?.firstName,
        contractor?.lastName,
        contractor?.email,

        // requester fields
        requestedBy?.firstName,
        requestedBy?.lastName,
        requestedBy?.email,
      ];

      return values
        .filter(Boolean)
        .some(val => val.toString().toLowerCase().includes(searchText));
    });
  }, [props.invitations, props.searchText]);

  return (
    <View style={styles.container}>
      <Header
        title={'Invitations'}
        navigation={props.navigation}
        showOtherIcons
      />

      <View style={styles.scrollContent}>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIconView}>
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
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <FlatList
            data={props.status}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            key={'_'}
            contentContainerStyle={{
              flexDirection: 'row',
              paddingHorizontal: 5,
              paddingVertical: 10,
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={props.renderStatus}
          />
        </View>

        <View style={styles.flatlistView}>
          <View style={styles.flatlist}>
            {props.isLoading ? (
              <CardSekeletoon />
            ) : (
              <>
                <Text style={styles.headingText}>
                  {getStatusLabel(props.statusFilter)}(
                  {filteredData.length ?? 0})
                </Text>

                <FlashList
                  data={filteredData}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={props.renderInviteCard}
                  estimatedItemSize={280}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingTop: 5,
                    flexGrow: filteredData?.length === 0 ? 1 : undefined,
                    paddingBottom: 100,
                  }}
                  onMomentumScrollBegin={props.onMomentumScrollBegin}
                  onEndReached={() => {
                    if (
                      !props.onEndReachedCalledDuringMomentum?.current &&
                      props.hasMore &&
                      !props.isLoading &&
                      !props.paginationLoading &&
                      filteredData?.length > 0
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
                    if (!props.hasMore && filteredData?.length > 0) {
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
                    if (!props.isLoading) {
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
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Design;
