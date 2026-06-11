import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from './style';
import Header from '../../../../components/Header';
import {
  ArrowDown,
  BankIcon,
  GenerateReportIcon,
  TotalEarningsIcon,
} from '../../../../assets/svg';
import { PopinsFont } from '../../../../helpers/Fonts';
import { Spacing, FontSizes } from '../../../../helpers/sizeHelper';
import {
  financeFilterStatus,
  formatAmount,
  getStatusLabel,
} from '../../../../helpers/Data';
import Button from '../../../../components/Button';
import DateSelectorModal from '../../../../components/Contractor/DateSelectorModal';
import ReceiptModal from '../../../../components/Contractor/ReceiptModal';
import StatsCard from '../../../../components/Contractor/StatsCard';
import AppColor from '../../../../helpers/AppColor';
import CardSekeletoon from '../../../../sekeletons/Contractor/CardSekeletoon';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
const Design = props => {
  const topArray = useMemo(() => {
    return [
      {
        name: 'Total Earning',
        boost: '20x',
        value: props.isLoading
          ? props.dots
          : `$${formatAmount(props.earnings?.totalEarnings)}`,
        key: '$1',
        icon: TotalEarningsIcon,
      },
      {
        name: 'Pending',
        boost: '20x',
        value: props.isLoading
          ? props.dots
          : `$${(props.earnings?.totalPendingPayouts || 0).toLocaleString()}`,
        key: '22',
        icon: BankIcon,
      },
    ];
  }, [props.earnings]);

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title={'Finance'} showOtherIcons />
      {props?.reportDownloading && (
        <View style={styles.downloadingOverlay}>
          <ActivityIndicator size="large" color={AppColor.primaryBlue} />
        </View>
      )}
      <View style={styles.statsView}>
        <ScrollView
          contentContainerStyle={styles.statsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pointerEvents="none"
        >
          {topArray.map((item, index) => {
            return <StatsCard item={item} index={index} />;
          })}
        </ScrollView>
        <View style={styles.quickView}>
          <Text style={styles.quickText}>Quick Overview</Text>
        </View>
      </View>
      <View style={styles.dropDowncontainer}>
        <TouchableOpacity
          onPress={() => props.setDateModalVisible(true)}
          style={styles.dropdown}
        >
          <Text style={styles.placeholderStyle}>Last 7 days</Text>
          <ArrowDown style={{ width: 12, height: 6 }} fill={'#2A2A2A'} />
        </TouchableOpacity>
      </View>
      <View style={styles.statusView}>
        <FlatList
          data={financeFilterStatus}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          key={'_'}
          contentContainerStyle={styles.statusContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={props.renderStatus}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlist}>
            {props.isLoading ? (
              <CardSekeletoon />
            ) : (
              <FlashList
                data={props.financeFilter}
                keyExtractor={(item, index) => item.id + index.toString()}
                renderItem={props.renderEarningsCard}
                ListHeaderComponent={
                  <>
                    <Text style={styles.headingText}>
                      {getStatusLabel(props.statusFilter)} (
                      {props.financeFilter.length})
                    </Text>
                  </>
                }
                estimatedItemSize={280}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                onEndReached={props.fetchMore}
                onEndReachedThreshold={0.3}
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
                ListFooterComponent={() => {
                  // Only show footer if there is data
                  if (props.financeFilter.length === 0) return null;

                  if (props.paginationLoading) {
                    return (
                      <View style={styles.footer}>
                        <ActivityIndicator
                          size="small"
                          color={AppColor.primaryBlue}
                        />
                      </View>
                    );
                  }

                  if (!props.hasMore) {
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
                ListEmptyComponent={props.ListEmptyComponent}
              />
            )}
          </View>
        </View>
      </View>
      {!props.isLoading && (
        <View style={styles.button}>
          <Button
            text={'Generate Report'}
            color={'#555555'}
            fontFamily={PopinsFont.regular}
            fontSize={FontSizes.s}
            lineHeight={Spacing.xl}
            height={44}
            backgroundColor={'#F7F7F7'}
            borderWidth={1}
            borderColor={'#E1E1E1'}
            width={'100%'}
            borderRadius={Spacing.s}
            leftIcon={<GenerateReportIcon style={styles.sideIcon} />}
            iconSpacing={8}
            onPress={() => props.setDateModalVisible(true)}
          />
        </View>
      )}

      <DateSelectorModal
        visible={props.dateModalVisible}
        onClose={() => props.setDateModalVisible(false)}
        onSelect={props.handleDateSelect}
        type={'finance'}
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
