import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CurvedArrow, EyeIcon, Globe } from '../../assets/svg';
import { Spacing, FontSizes } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import Button from '../Button';
import { getStatusLabel, statusColors } from '../../helpers/Data';

const Info = ({ label, value, showDot }) => {
  return (
    <View style={styles.infoBox}>
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
          {showDot ? getStatusLabel(value) : value}
        </Text>
      </View>
    </View>
  );
};

const MemberJobCard = ({ item, navigation, openModal, toggleModal }) => {
  const handleOpenModal = item => {
    toggleModal(item);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.name} <Text style={styles.highlight}>{item.location}</Text>
      </Text>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.tagsRow}>
        <View style={[styles.tag, { backgroundColor: '#FFF' }]}>
          <Globe style={styles.globe} />
          <Text style={styles.typeText}>{item.type}</Text>
        </View>

        <View style={styles.grayView}>
          <Text style={styles.grayText}>{item?.jobId}</Text>
          <CurvedArrow style={styles.curve} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Info label={'Deadline'} value={item.deadline} />
          <Info label="Status" value={item.status} showDot />
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
          leftIcon={<EyeIcon style={styles.sideIcon} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.s}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() => navigation.navigate('MyJobsDetail')}
        />
      </View>
    </View>
  );
};

export default MemberJobCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingTop: Spacing.s,
    paddingBottom: Spacing.xs,
    paddingLeft: Spacing.xs,
    paddingRight: Spacing.xs,
    borderRadius: Spacing.s,
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

  tagsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 8,
  },

  tag: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },

  grayView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  grayText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
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

  typeText: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#555555',
  },
  globe: { height: 12, width: 12 },
  address: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: AppColor.textColor,
    fontFamily: PopinsFont.regular,
    marginTop: 5,
  },
  curve: { height: 11, width: 11 },
  sideIcon: { height: 16, width: 16 },
});
