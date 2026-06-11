import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import styles from './style';
import {
  LeftArrow,
  NoRecordFound,
  PencilIcon,
  RightArrow,
  VerifiedIcon,
} from '../../../../assets/svg';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import FastImage from '@d11/react-native-fast-image';
import { images } from '../../../../assets/images';
import { filterStatus, getStatusLabel } from '../../../../helpers/Data';
import ReviewsCardSkeleton from '../../../../sekeletons/Contractor/ReviewsCardSkeleton';
import AppColor from '../../../../helpers/AppColor';
const Design = props => {
  const userImages = [
    {
      image: images.user1,
      id: '1',
    },
    {
      image: images.user2,
      id: '2',
    },
    {
      image: images.user3,
      id: '3',
    },
    {
      image: images.user4,
      id: '4',
    },
  ];
  const role = props?.userData?.user?.role
    ?.toLowerCase()
    ?.replace(/^./, c => c.toUpperCase());
  return (
    <View style={styles.container}>
      <Header title={'Profile'} navigation={props.navigation} showOtherIcons />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoContainer}
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
        <View style={styles.coverWrapper}>
          <FastImage
            source={images.cover}
            style={styles.coverImage}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={{ alignSelf: 'center' }}>
            {props.userData.user.avatar !== null ? (
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: props.userData.user.avatar }}
                  style={styles.profile}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.profileContainer}>
                <Text style={styles.userName}>
                  {props.userData.user.firstName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.contractorView}>
          <View style={styles.nameBox}>
            <Text style={styles.name}>
              {props.userData.user.firstName +
                ' ' +
                props.userData.user.lastName}
            </Text>
            <VerifiedIcon style={{ height: 22, width: 22 }} fill={'#009FD9'} />
          </View>
          <View style={styles.joinView}>
            <Text style={styles.join}>
              {`${role} | Joined Since ${moment(
                props?.userData?.user?.createdAt,
              ).format('YYYY')}`}
            </Text>
          </View>
          <View style={styles.view1}>
            {userImages.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginRight: -10,
                    zIndex: userImages.length - index,
                  }}
                >
                  <Image
                    source={item.image}
                    style={styles.img}
                    resizeMode="cover"
                  />
                </View>
              );
            })}
            <Text style={styles.text1}>Top happy owners hire</Text>
          </View>
        </View>
        <View>
          {Array.isArray(props.galleryPhotos) &&
            props.galleryPhotos.length > 0 && (
              <View style={styles.galleryView}>
                <Text style={styles.gallery}>
                  Gallery ({props.galleryPhotos.length ?? 0})
                </Text>
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    onPress={props.scrollLeft}
                    style={styles.iconView}
                  >
                    <LeftArrow style={styles.icon} />
                  </TouchableOpacity>

                  <FlatList
                    ref={props.flatListRef}
                    data={props.galleryPhotos}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={props.renderItem}
                    contentContainerStyle={{ paddingHorizontal: 5 }}
                    onScroll={props.onScroll}
                    scrollEventThrottle={16}
                  />

                  <TouchableOpacity
                    onPress={props.scrollRight}
                    style={styles.iconView1}
                  >
                    <RightArrow style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

          <View style={styles.statusView}>
            <FlatList
              data={props.status}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              key={'_'}
              contentContainerStyle={styles.content2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={props.renderStatus}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.flatlistView}>
              <View style={styles.flatlist}>
                {props?.isFirstLoading ? (
                  <ReviewsCardSkeleton />
                ) : (
                  <FlatList
                    data={props.filteredFeedbacks}
                    keyExtractor={(item, index) => `${item.stars}-${index}`}
                    renderItem={props.renderReviewsData}
                    ListHeaderComponent={
                      <>
                        <Text style={styles.headingText}>Reviews</Text>
                      </>
                    }
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                      <>
                        {props.filteredFeedbacks.length > 0 && (
                          <View style={styles.footer}>
                            <Text style={styles.footerText}>
                              No more content to show
                            </Text>
                          </View>
                        )}
                      </>
                    }
                    ListEmptyComponent={() => {
                      if (props.filteredFeedbacks.length === 0) {
                        return (
                          <View style={styles.emptyView}>
                            <NoRecordFound
                              style={{ height: 100, width: 100 }}
                            />
                            <Text style={styles.text}>
                              No {props.statusFilter} Start Review Found!
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
        </View>
      </ScrollView>
      {/* 
      <View style={styles.button}>
        <Button
          leftIcon={<VerticalDots style={{ height: 6, width: 22 }} />}
          height={44}
          backgroundColor={'#F7F7F7'}
          borderWidth={1}
          borderColor={'#E1E1E1'}
          width={'18%'}
          borderRadius={Spacing.s}
        />
        <Button
          text={'Send Message'}
          color={'#404040'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.s}
          lineHeight={Spacing.xl}
          height={44}
          backgroundColor={'#F7F7F7'}
          borderWidth={1}
          borderColor={'#E1E1E1'}
          width={'80%'}
          borderRadius={Spacing.s}
          leftIcon={<SMSIcon style={styles.sideIcon} />}
          iconSpacing={5}
        />
      </View> */}
      <View style={styles.button}>
        <Button
          text={'Edit Profile'}
          color={'#404040'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.m}
          lineHeight={Spacing.xl}
          height={44}
          backgroundColor={'#F7F7F7'}
          borderWidth={1}
          borderColor={'#E1E1E1'}
          width={'100%'}
          borderRadius={Spacing.s}
          leftIcon={<PencilIcon style={styles.sideIcon} />}
          iconSpacing={5}
          onPress={() => props.navigation.navigate('EditProfile')}
        />
      </View>
    </View>
  );
};

export default Design;
