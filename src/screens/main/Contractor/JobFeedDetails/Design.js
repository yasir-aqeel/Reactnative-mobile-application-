import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {
  ArrowDown,
  CopyIcon,
  CurvedArrow,
  DirectionIcon,
  DownloadIcon,
  EmptyImage,
  EyeIcon,
  FileIcon,
  Globe,
  ImageCount,
  LeftArrow,
  MakeOfferButtonIcon,
  MessageIcon,
  RatingStart,
  VerifiedIcon,
} from '../../../../assets/svg';
import sizeHelper, { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import { images } from '../../../../assets/images';
import moment from 'moment';
import { iconColors } from '../../../../helpers/Data';
import { getFileName, handleCopyText } from '../../../../helpers/services';
import JobInProgressSkeleton from '../../../../sekeletons/Contractor/JobInProgressSkeleton';
import FastImage from '@d11/react-native-fast-image';
const Design = props => {
  if (props.isFirstLoading) {
    return <JobInProgressSkeleton />;
  }
  const [failedImages, setFailedImages] = useState({});

  const validImages =
    props.job?.jobPhoto?.filter(
      image => image?.url && !failedImages[image.id],
    ) || [];
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backIconContainer}
        >
          <LeftArrow style={styles.leftIcon} />
        </TouchableOpacity>
        {!props.job.isPrivate && (
          <View style={styles.row}>
            <View style={styles.tag}>
              <Globe style={styles.globe} />
              <Text style={styles.public}>Public</Text>
            </View>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoContainer}
      >
        <View style={styles.header}>
          <View style={styles.nameRow}>
            <Text style={styles.title}>
              {props.job.title} at{' '}
              <Text style={styles.highlight}>{props.job.property.name}</Text>
            </Text>
          </View>
          <View style={styles.jobIdRow}>
            <Text style={styles.jobIdLabel}>
              Job ID • {props.job.displayId}
            </Text>
            <TouchableOpacity
              onPress={() => handleCopyText(props.job.displayId)}
            >
              <CopyIcon style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
        </View>

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

                props.setCurrentImage(index);
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
                {props.currentImage + 1}/{validImages.length}
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
            Posted on :
            {' ' + moment(props.job?.createdAt).format('MMM. DD, YYYY - HH:mm')}
          </Text>
        </View>
        <View style={styles.detailsBox}>
          <View style={styles.infoView}>
            <TouchableOpacity
              onPress={() => props.setShowDetails(!props.showDetails)}
              style={styles.infoTouch}
            >
              <Text style={styles.hideText}>Description</Text>
              <View>
                <ArrowDown
                  style={{
                    height: 9,
                    width: 16,
                    transform: [
                      { rotate: props.showDetails ? '180deg' : '0deg' },
                    ],
                  }}
                />
              </View>
            </TouchableOpacity>
            {props.showDetails && (
              <Text style={styles.text}>{props.job.description}</Text>
            )}
          </View>
        </View>
        <Button
          text={'Make an offer'}
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
          leftIcon={<MakeOfferButtonIcon style={styles.sideIcon} />}
          iconSpacing={5}
          onPress={() => props.handleSubmitOffer()}
        />

        <Text style={styles.sectionTitle}>Job Details</Text>
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Job Type</Text>
            <Text style={styles.detailValue}>
              {props.job.JobType === 'FIXED_BID' ? 'FIXED' : 'T&M'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Budget</Text>
            <Text style={styles.detailValue}>${props.job.budget || 0}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Deadline</Text>
            <Text style={styles.detailValue}>
              {moment(props.job?.deadline).format('MMM. DD, YYYY - HH:mm')}
            </Text>
          </View>
          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Job Category</Text>
            <Text style={styles.detailValue}>
              {props.job?.categories?.map(item => item.name).join(', ')}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Property</Text>

        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>Farmhouse</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>
              {props.job.property.address || 'N/A'}
            </Text>
          </View>
          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Unit / Aprt No</Text>
            <Text style={styles.detailValue}>
              {props?.job?.property?.unitOrApartmentNo || 'N/A'}
            </Text>
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
            onPress={() => props.navigation.goBack()}
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
            onPress={() =>
              props.safeOpenMap(
                props?.job?.property?.latitude,
                props?.job?.property?.longitude,
              )
            }
          />
        </View>
        <Text style={styles.sectionTitle}>Property Owner Details</Text>
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <View style={styles.propertyRow}>
              <View style={styles.rowContainer}>
                <View style={{ marginRight: 8 }}>
                  <View style={styles.imageView}>
                    {props.job.postedBy.avatar !== null ? (
                      <>
                        <Image
                          source={{ uri: props.job.postedBy.avatar }}
                          style={styles.img}
                          resizeMode="contain"
                        />
                      </>
                    ) : (
                      <>
                        <View style={styles.nameContainer}>
                          <Text style={styles.userName}>
                            {props.job.postedBy.firstName
                              ?.charAt(0)
                              .toUpperCase()}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={[styles.detailLabel, { top: 3, right: 2 }]}>
                    Owner
                  </Text>
                  <View style={styles.row2}>
                    <Text style={[styles.detailValue, { bottom: 5, right: 2 }]}>
                      {props.job.postedBy.firstName +
                        ' ' +
                        props.job.postedBy.lastName}
                    </Text>
                    {props.job.postedBy.identityVerified && (
                      <VerifiedIcon style={styles.verifiedIcon} />
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => props.handleStartChat()}
                style={styles.smsIconContainer}
              >
                <MessageIcon style={styles.messageIcon} fill={'#2A2A2A'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Jobs</Text>
            <Text style={styles.detailValue}>
              {props.job.postedBy.totalJobsPosted || 0}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Spend</Text>
            <Text style={styles.detailValue}>
              ${props.job.postedBy.totalSpend || 0}
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
                      star <= Math.round(props?.job?.postedBy?.avgRating ?? 0)
                        ? '#FF8D28'
                        : '#E0E0E0'
                    }
                  />
                ))}
              </View>
            </View>
            <View style={styles.reviewContainer}>
              <Text style={[styles.detailValue]}>
                {props?.job?.postedBy?.totalReviews ?? 0}{' '}
                {props?.job?.postedBy?.totalReviews === 1
                  ? 'review'
                  : 'reviews'}
              </Text>
              <CurvedArrow style={styles.curvedIcon} />
            </View>
            <View style={styles.line} />
          </View>
        </View>
        {Array.isArray(props.job?.Files) && props.job?.Files.length > 0 && (
          <Text style={styles.sectionTitle}>Job Documents</Text>
        )}
        {Array.isArray(props.job.Files) &&
          props.job.Files.length > 0 &&
          props.job.Files.map((file, index) => {
            const color = iconColors[index % iconColors.length];
            // console.log('file', file);
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
      </ScrollView>
    </View>
  );
};

export default Design;
