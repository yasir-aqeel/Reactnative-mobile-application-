import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from './style';
import AppColor from '../../../../helpers/AppColor';
import Header from '../../../../components/Header';
import {
  AddNewMember,
  JobsIcon,
  RolesIcon,
  Teams,
} from '../../../../assets/svg';
import { PopinsFont } from '../../../../helpers/Fonts';
import { Spacing, FontSizes } from '../../../../helpers/sizeHelper';
const { width } = Dimensions.get('window');
import { getStatusLabel } from '../../../../helpers/Data';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
import Button from '../../../../components/Button';
import StatsCard from '../../../../components/Contractor/StatsCard';
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
      name: 'Total Members',
      value: '29',
      key: '29',
      icon: Teams,
    },
    {
      name: 'Team Jobs',
      boost: '20x',
      value: '200',
      key: '22',
      icon: JobsIcon,
    },
  ];

  return (
    <View style={styles.container}>
      <Header title={'Team'} navigation={props.navigation} showOtherIcons />

      <View style={styles.statsView}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
          pointerEvents="none"
        >
          {topArray.map((item, index) => {
            return <StatsCard item={item} index={index} />;
          })}
        </ScrollView>
        <View style={styles.quickView}>
          <View>
            <Text style={styles.quick}>Quick Overview</Text>
          </View>
          <View>
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
      </View>
      <View style={styles.buttonsView}>
        <Button
          text={'Add Member'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.m}
          lineHeight={Spacing.xl}
          color={'#FFF'}
          backgroundColor={'#009FD9'}
          height={44}
          width={'49%'}
          borderRadius={Spacing.s}
          marginTop={12}
          leftIcon={<AddNewMember style={styles.icon} fill={'#FFFFFF'} />}
          onPress={() => props.openModal('add_new_member_in_team_modal')}
        />
        <Button
          text={'Roles'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.m}
          lineHeight={Spacing.xl}
          color={'#555555'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          height={44}
          width={'49%'}
          borderRadius={Spacing.s}
          marginTop={12}
          leftIcon={<RolesIcon style={styles.rolesIcon} fill={'#2A2A2A'} />}
          onPress={() => props.navigation.navigate('roles')}
        />
      </View>

      <View style={styles.statusView}>
        <FlatList
          data={props.status}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          key={'_'}
          contentContainerStyle={styles.content}
          keyExtractor={(item, index) => index.toString()}
          renderItem={props.renderStatus}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlist}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={props.membersFilter}
              keyExtractor={(item, index) => item.key + index}
              renderItem={props.renderDashboardData}
              ListHeaderComponent={
                <>
                  <View style={styles.topView}>
                    <Text style={styles.actve}>Active Today</Text>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      contentContainerStyle={styles.memberContainer}
                    >
                      {props.membersFilter.map((member, index) => {
                        return (
                          <View key={index} style={{ position: 'relative' }}>
                            <Image
                              source={member.image}
                              style={styles.img}
                              resizeMode="contain"
                            />

                            {member.status === 'ACTIVE' && (
                              <View style={styles.greenDot} />
                            )}
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <Text style={styles.headingText}>
                    {getStatusLabel(props.statusFilter)}(
                    {props.membersFilter.length ?? 0})
                  </Text>
                </>
              }
              // onEndReached={props.loadMore}
              // onEndReachedThreshold={0.3}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={props.refreshing}
              //     onRefresh={props.onRefresh}
              //     colors={[
              //       AppColor.primaryBlue,
              //       AppColor.green1,
              //       AppColor.redDark,
              //       AppColor.purpleLight,
              //     ]}
              //     progressBackgroundColor={AppColor.white}
              //     tintColor={AppColor.primaryBlue}
              //   />
              // }
              // onScroll={props.handleScroll}
              // scrollEventThrottle={16}
              ListFooterComponent={
                <>
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      No more content to show
                    </Text>
                  </View>
                </>
              }
              // ListEmptyComponent={
              //   !props.isLoading &&
              //   (props.actionItemsDataDetails?.data?.length ?? 0) === 0 && (
              //     <View
              //       style={{
              //         justifyContent: 'center',
              //         alignItems: 'center',
              //         backgroundColor: AppColor.white,
              //         height: '80%',
              //       }}
              //     >
              //       <Text style={styles.noRecord}>No Action Items</Text>
              //       <Text style={styles.noText}>
              //         Everything looks good here. No pending tasks.
              //       </Text>
              //     </View>
              //   )
              // }
            />

            {/* {props.showScrollToTop && (
              <TouchableOpacity
                style={styles.scrollToTopButton}
                onPress={props.scrollToTop}
              >
                <Entypo
                  name="arrow-long-up"
                  size={24}
                  color={AppColor.primaryBlue}
                />
              </TouchableOpacity>
            )} */}
          </View>
        </View>
      </View>
      <ModalRenderer
        activeModal={props.activeModal}
        closeModal={props.closeModal}
        openModal={props.openModal}
      />
    </View>
  );
};

export default Design;
