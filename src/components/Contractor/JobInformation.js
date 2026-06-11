import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowDown,
  CurvedArrow,
  DirectionIcon,
  DownloadIcon,
  EmptyImage,
  EyeIcon,
  FileIcon,
  ImageCount,
  MessageIcon,
  RatingStart,
  RejectIcon,
  VerifiedIcon,
} from '../../assets/svg';
import sizeHelper, { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import Button from '../../components/Button';
import { images } from '../../assets/images';
import moment from 'moment';
import { iconColors } from '../../helpers/Data';
import { deadlineParts, getFileName } from '../../helpers/services';
import FastImage from '@d11/react-native-fast-image';
import { showToast } from '../../helpers/ToastConfig';

const JobInformation = ({ props }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const validImages =
    props.jobDetails?.jobPhoto?.filter(
      image => image?.url && !failedImages[image.id],
    ) || [];
  const safeOpenMap = async () => {
    try {
      const lat = props?.jobDetails?.property?.latitude;
      const lng = props?.jobDetails?.property?.longitude;

      if (lat == null || lng == null) {
        showToast(
          'info',
          'Property owner did not provide property location details',
        );
        return;
      }

      const url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
        android: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      });

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast('error', 'Unable to open map application');
      }
    } catch (e) {
      console.log('Map error:', e);
      showToast('error', 'Unable to open location');
    }
  };

  return (
    <View style={styles.infoContainer}>
      {validImages.length > 0 ? (
        <View style={styles.bigImage}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToAlignment="center"
            onScroll={e => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x /
                  e.nativeEvent.layoutMeasurement.width,
              );

              setCurrentImage(index);
            }}
            scrollEventThrottle={16}
          >
            {validImages.map((image, index) => (
              <View
                key={image.id || index}
                style={{
                  width: sizeHelper.screenWidth - 40,
                  alignItems: 'center',
                }}
              >
                <FastImage
                  source={{ uri: image.url.trim() }}
                  style={styles.propertyImage}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={() => {
                    console.log('Failed Image:', image.url);

                    setFailedImages(prev => ({
                      ...prev,
                      [image.id]: true,
                    }));
                  }}
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.imageCountContainer}>
            <ImageCount style={{ height: 18, width: 18 }} />
            <Text style={styles.imageCountText}>
              {currentImage + 1}/{validImages.length}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyImageView}>
          <EmptyImage style={{ height: 24, width: 28 }} fill={'#888888'} />
        </View>
      )}

      <View style={styles.dateView}>
        <Text style={styles.dateText}>
          Posted on:{' '}
          {moment(props.jobDetails?.postedBy.createdAt).format(
            'MMM. DD, YYYY - HH:mm',
          )}
        </Text>
      </View>

      <View style={styles.detailsBox}>
        <View style={styles.infoView}>
          <TouchableOpacity
            onPress={() => setShowDetails(!showDetails)}
            style={styles.infoTouch}
          >
            <Text style={styles.hideText}>Description</Text>
            <View>
              <ArrowDown
                style={{
                  height: 9,
                  width: 16,
                  transform: [{ rotate: showDetails ? '180deg' : '0deg' }],
                }}
              />
            </View>
          </TouchableOpacity>
          {showDetails && (
            <Text style={styles.text}>{props.jobDetails?.description}</Text>
          )}
        </View>
      </View>

      <View style={styles.descriptionRow}>
        {/* <Button
          text={'View'}
          color={'#555555'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.s}
          lineHeight={Spacing.s}
          height={44}
          backgroundColor={'#F7F7F7'}
          borderWidth={1}
          borderColor={'#E1E1E1'}
          width={'49%'}
          borderRadius={Spacing.s}
          leftIcon={<EyeIcon style={styles.sideIcon} />}
          iconSpacing={5}
        /> */}
        <Button
          text={'Directions'}
          color={'#FFF'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.s}
          lineHeight={Spacing.s}
          height={44}
          backgroundColor={'#009FD9'}
          borderWidth={1}
          borderColor={'#009FD9'}
          width={'100%'}
          borderRadius={Spacing.s}
          leftIcon={<DirectionIcon style={styles.sideIcon} />}
          iconSpacing={5}
          onPress={() => safeOpenMap()}
        />
      </View>

      <Text style={styles.sectionTitle}>Job Details</Text>
      <View style={styles.section}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Job Type</Text>
          <Text style={styles.detailValue}>
            {props.jobDetails?.JobType === 'FIXED_BID' ? 'Fixed' : 'T&M'}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Budget</Text>
          <Text style={styles.detailValue}>
            ${props.jobDetails?.bids[0]?.amount ?? 0}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Deadline</Text>
          <Text style={styles.detailValue}>
            {deadlineParts(props.jobDetails?.deadline).absolute}
          </Text>
        </View>
        <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.detailLabel}>Job Category</Text>
          <Text style={styles.detailValue}>
            {props.jobDetails?.categories?.map(item => item.name).join(', ')}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Property</Text>

      <View style={styles.section}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>
            {props.jobDetails?.property?.name}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address</Text>
          <Text style={styles.detailValue}>
            {props.jobDetails?.property?.address}
          </Text>
        </View>
        <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.detailLabel}>Unit / Aprt No</Text>
          <Text style={styles.detailValue}>
            {props.jobDetails?.property?.unitOrApartmentNo || 'N/A'}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Property Owner Details</Text>
      <View style={styles.section}>
        <View style={styles.detailRow}>
          <View style={styles.propertyRow}>
            <View style={styles.rowContainer}>
              <View style={{ marginRight: 8 }}>
                <Image
                  source={
                    props.jobDetails.postedBy?.avatar !== null
                      ? { uri: props.jobDetails.postedBy?.avatar }
                      : images.userImage
                  }
                  style={{ height: 50, width: 50 }}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={[styles.detailLabel, { top: 3, right: 2 }]}>
                  Owner
                </Text>
                <View style={styles.row2}>
                  <Text style={[styles.detailValue, { bottom: 5, right: 2 }]}>
                    {props.jobDetails.postedBy?.firstName +
                      '' +
                      props.jobDetails.postedBy?.lastName}
                  </Text>
                  <VerifiedIcon style={{ height: 16, width: 16, left: 3 }} />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => props.handleStartChat()}
              style={styles.smsIconContainer}
            >
              <MessageIcon style={{ height: 20, width: 20 }} fill={'#2A2A2A'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Jobs</Text>
          <Text style={styles.detailValue}>
            {props?.jobDetails?.postedBy?.totalJobsPosted ?? 0}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Spend</Text>
          <Text style={styles.detailValue}>
            ${props?.jobDetails?.postedBy?.avgRating.totalSpend || 0}
          </Text>
        </View>
        <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
          <View style={styles.starRow}>
            <Text style={styles.detailLabel}>Rating</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <RatingStart
                  key={star}
                  style={styles.sideIcon}
                  fill={
                    star <=
                    Math.round(props?.jobDetails?.postedBy?.avgRating ?? 0)
                      ? '#FF8D28'
                      : '#E0E0E0'
                  }
                />
              ))}
            </View>
          </View>

          <View style={styles.reviewContainer}>
            <Text style={[styles.detailValue]}>
              {Array.isArray(props?.jobDetails?.postedBy?.feedbacksReceived) &&
              props?.jobDetails?.postedBy?.feedbacksReceived.length > 0
                ? props?.jobDetails?.postedBy?.feedbacksReceived.length
                : 0}{' '}
              reviews
            </Text>
            <CurvedArrow style={{ height: 11, width: 11, top: 5, left: 3 }} />
          </View>
          <View style={styles.line} />
        </View>
      </View>
      {Array.isArray(props.jobDetails?.jobNote) &&
        props.jobDetails?.jobNote.length > 0 && (
          <Text style={styles.sectionTitle}>Job Documents</Text>
        )}

      {Array.isArray(props.jobDetails?.jobNote) &&
        props.jobDetails?.jobNote.length > 0 &&
        props.jobDetails?.jobNote.map((file, index) => {
          const color = iconColors[index % iconColors.length];
          return (
            <View key={index} style={styles.documentItem}>
              <View style={[styles.row, { width: '80%' }]}>
                <FileIcon
                  style={[styles.sideIcon, { marginLeft: 10 }]}
                  fill={color}
                />
                <Text style={styles.documentText}>
                  {getFileName(file, index)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  props.handleFilePress(
                    file.url,
                    getFileName(file, index),
                    file.url,
                  )
                }
              >
                {props.loadingFileUrl === file.url ? (
                  <ActivityIndicator size={'small'} color="#121212" />
                ) : (
                  <DownloadIcon style={styles.sideIcon} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}

      <Button
        text={'Terminate Job'}
        leftIcon={<RejectIcon style={styles.sideIcon} fill={'#CC2D30'} />}
        onPress={() =>
          props.openModal('terminate_job', { ...props.jobDetails })
        }
        backgroundColor={'#FFECEC'}
        borderColor={'#FFD7D8'}
        color={'#CC2D30'}
        fontFamily={PopinsFont.regular}
        fontSize={FontSizes.s}
        lineHeight={Spacing.s}
        height={44}
        borderWidth={1}
        width={'100%'}
        borderRadius={Spacing.s}
        iconSpacing={5}
        marginTop={5}
        marginBottom={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    paddingHorizontal: 16,
    backgroundColor: AppColor.white,
  },
  bigImage: { justifyContent: 'center', alignItems: 'center' },
  sectionTitle: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    marginVertical: 10,
    lineHeight: Spacing.l,
    marginLeft: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#000000',
    width: '30%',
    alignSelf: 'flex-start',
  },
  dateView: { marginVertical: 5 },
  dateText: {
    color: '#888888',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textAlign: 'left',
  },
  descriptionRow: {
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 5,
  },
  section: {
    backgroundColor: '#FFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailRow: {
    paddingHorizontal: Spacing.s,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    lineHeight: Spacing.xl,
  },
  detailValue: {
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    marginTop: 10,
  },
  smsIconContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    padding: Spacing.s,
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  documentText: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideIcon: { height: 16, width: 16 },

  infoView: {
    width: '100%',
    alignSelf: 'center',
  },
  infoTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hideText: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  detailsBox: {
    backgroundColor: '#FFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    borderRadius: Spacing.s,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: Spacing.s,
  },
  text: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
    textAlign: 'left',
    marginTop: 12,
  },
  sideIcon: { height: 16, width: 16 },
  bigImage: { justifyContent: 'center', alignItems: 'center' },
  scrollContainer: {
    paddingRight: 10,
  },
  propertyImage: {
    height: 211,
    width: sizeHelper.screenWidth - 50,
    borderRadius: Spacing.l,
  },
  imageCountContainer: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.s,
    paddingVertical: 8,
    borderRadius: Spacing.s,
    gap: 10,
    height: Spacing.xl5,
  },

  imageCountText: {
    color: '#2A2A2A',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  emptyImageView: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.l,
    marginBottom: 12,
    height: 211,
    width: sizeHelper.screenWidth - 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default JobInformation;
