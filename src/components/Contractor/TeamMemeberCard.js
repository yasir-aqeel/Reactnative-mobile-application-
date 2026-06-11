import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  AssignMember,
  EyeIcon,
  MessageIcon,
  RatingStart,
  VerifiedIcon,
} from '../../assets/svg';
import { Spacing, FontSizes } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import Button from '../Button';
import { getStatusLabel, statusColors } from '../../helpers/Data';

const Info = ({ label, value, showDot }) => {
  return (
    <View style={[styles.infoBox]}>
      <Text style={styles.infoLabel}>{label}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {showDot && (
          <View
            style={{
              height: 11,
              width: 11,
              borderRadius: 10,
              backgroundColor: statusColors[value?.toUpperCase()],
            }}
          />
        )}

        <Text numberOfLines={1} style={styles.infoValue}>
          {getStatusLabel(value)}
        </Text>
      </View>
    </View>
  );
};
const TeamMemeberCard = ({ item, navigation, openModal }) => {
  const handleOpenModal = item => {
    // console.log('--', item);
    openModal('assign_job_from_team_modal');
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.secondRow}>
          <View style={styles.imageView}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />

            {item.status === 'ACTIVE' && <View style={styles.greenDot} />}
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.text}>{item.memberName}</Text>
              <VerifiedIcon style={styles.verified} fill={'#009FD9'} />
            </View>
            <View style={styles.ratingView}>
              <RatingStart style={styles.rating} />
              <Text style={styles.text}>{item.rating}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.smsContainer}>
          <MessageIcon style={styles.message} fill={'#2A2A2A'} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <>
            <Info label="Roles" value={item.roles} />
            <Info label="Status" value={'ASSIGNED'} showDot />
          </>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          text={'View'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={1}
          leftIcon={<EyeIcon style={{ height: 16, width: 16 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.s}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() => navigation.navigate('TeamMemberDetails')}
        />
        <Button
          text={'Assign Job'}
          backgroundColor={'#009FD9'}
          borderColor={'#009FD9'}
          borderWidth={1}
          color={'#FFF'}
          flex={1}
          leftIcon={
            <AssignMember style={{ height: 16, width: 16 }} fill={'#FFF'} />
          }
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() => handleOpenModal()}
        />
      </View>
    </View>
  );
};

export default TeamMemeberCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingTop: Spacing.s,
    paddingBottom: Spacing.xs,
    paddingLeft: Spacing.xs,
    paddingRight: Spacing.xs,
    borderRadius: Spacing.s,
    marginBottom: 12,
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
    width: '50%',
  },

  infoLabel: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    paddingTop: 5,
  },

  infoValue: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.s,
    color: AppColor.textColor,
    fontFamily: PopinsFont.medium,
    paddingVertical: 10,
  },

  actions: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    width: '100%',
  },
  text: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  secondRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  imageView: { position: 'relative' },
  image: { height: 50, width: 50 },
  greenDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    height: 12,
    width: 12,
    borderRadius: 100,
    backgroundColor: '#3DBE84',
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameContainer: { justifyContent: 'center' },
  nameRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  verified: { height: 17, width: 17 },
  ratingView: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  rating: { height: 13, width: 13 },
  smsContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: Spacing.xl,
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  message: { height: 22, width: 22 },
});
