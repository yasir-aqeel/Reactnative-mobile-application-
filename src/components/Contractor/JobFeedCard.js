import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import {
  ArrowDown,
  EmptyImage,
  Globe,
  RatingStart,
  VerifiedIcon,
} from '../../assets/svg';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import moment from 'moment';
const Info = ({ label, value }) => {
  return (
    <View style={[styles.infoBox]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text numberOfLines={1} style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
};
const JobFeedCard = ({ job, navigation }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageUrl = job?.jobPhoto?.[0]?.url?.trim();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('JobFeedDetails', { selectedJobId: job.id })
        }
      >
        {imageUrl && !imageError ? (
          <ImageBackground
            source={{ uri: imageUrl }}
            style={styles.img}
            resizeMode="cover"
            onError={e => {
              console.log('Image Error:', imageUrl, e.nativeEvent);
              setImageError(true);
            }}
          >
            {!job.isPrivate && (
              <View style={styles.publicBadge}>
                <Globe style={{ height: 16, width: 16 }} fill="#009FD9" />
                <Text style={styles.publicText}>Public</Text>
              </View>
            )}
          </ImageBackground>
        ) : (
          <View style={styles.emptyImageView}>
            <EmptyImage style={{ height: 24, width: 28 }} fill="#888888" />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.postedView}>
        <Text style={styles.postedText}>
          Posted • {moment(job?.createdAt).fromNow()}
        </Text>
      </View>
      <Text style={styles.title}>
        {job.title} at <Text style={styles.highlight}>{job.property.name}</Text>
      </Text>
      <Text style={styles.address}>{job.property.address}</Text>
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
          {showDetails && <Text style={styles.text}>{job.description}</Text>}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Info label="Budget" value={job.budget} />
          <Info
            label="Job Type"
            value={`${job?.JobType === 'FIXED_BID' ? 'FIXED' : 'T&M'}`}
          />
          <View style={styles.lastRow}>
            <Text style={styles.clientName}>
              {job.postedBy.firstName + ' ' + job.postedBy.lastName}
            </Text>
            <View style={styles.clientRow}>
              <View style={styles.ratingContainer}>
                <RatingStart
                  style={{ height: 14, width: 14 }}
                  fill={'#FECB55'}
                />
                <Text style={styles.ratingText}>{job.postedBy?.avgRating}</Text>
              </View>
              {job.postedBy.emailVerified && (
                <VerifiedIcon
                  style={{ height: 14, width: 14 }}
                  fill={'#009FD9'}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: Spacing.l,
    marginBottom: 16,
    padding: 10,
  },
  publicBadge: {
    backgroundColor: '#FFFFFF',
    height: 32,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: Spacing.xl5,
    margin: 10,
  },
  publicText: {
    fontSize: FontSizes.s,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  title: {
    fontSize: FontSizes.m,
    lineHeight: FontSizes.xl,
    fontFamily: PopinsFont.medium,
    color: AppColor.textColor,
  },

  highlight: {
    color: '#009FD9',
    fontSize: FontSizes.m,
    lineHeight: FontSizes.m,
    fontFamily: PopinsFont.medium,
  },
  postedView: {
    backgroundColor: '#F7F7F7',
    marginVertical: 12,
    borderRadius: Spacing.m,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  postedText: {
    color: '#2A2A2A',
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    fontFamily: PopinsFont.regular,
  },
  address: {
    fontSize: FontSizes.s,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
    marginBottom: 12,
  },

  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  clientName: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.medium,
    color: '#151515',
    lineHeight: Spacing.xl,
  },
  lastRow: {
    marginLeft: 8,
    width: '54%',
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: Spacing.xxs,
    borderRadius: Spacing.ms,
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: FontSizes.s,
    color: '#151515',
    marginLeft: 4,
    lineHeight: Spacing.l,
    fontFamily: PopinsFont.medium,
  },

  infoRow: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    width: '100%',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: Spacing.s,
    overflow: 'hidden',
    marginBottom: 12,
  },
  infoBox: {
    paddingHorizontal: Spacing.xs,
    borderRightWidth: 1,
    borderColor: '#E1E1E1',
    width: '23%',
  },

  infoLabel: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    paddingTop: 10,
  },

  infoValue: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.s,
    color: AppColor.textColor,
    fontFamily: PopinsFont.medium,
    paddingVertical: 10,
  },
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
    lineHeight: Spacing.xl,
    textAlign: 'left',
    marginTop: 12,
  },
  img: {
    borderRadius: Spacing.l,
    overflow: 'hidden',
    marginBottom: 12,
    width: '100%',
    height: 220,
  },
  emptyImageView: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.l,
    alignSelf: 'center',
    marginBottom: 12,
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default React.memo(JobFeedCard);
