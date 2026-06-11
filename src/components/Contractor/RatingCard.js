import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';

const RatingCard = ({ item }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const cardWidth = isLandscape ? width * 0.428 : width * 0.4;

  const Icon = item.icon;
  return (
    <View key={item.key} style={[styles.innerView, { width: cardWidth }]}>
      <View style={styles.innerBox}>
        <View style={styles.box}>
          <Text style={styles.value}>{item.name}</Text>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text}>{item.value}</Text>
        </View>
      </View>
    </View>
  );
};

export default RatingCard;

const styles = StyleSheet.create({
  innerView: {
    // width is set dynamically, remove fixed width
    marginHorizontal: 5, // optional spacing
  },
  innerBox: {
    backgroundColor: '#FFF',
    height: 70,
    borderRadius: Spacing.s,
    padding: Spacing.s,
    justifyContent: 'space-between',
    width: '100%', // fill the dynamic width
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  boxIcon: { height: 20, width: 20 },
  value: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#2A2A2A',
  },
  text: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.l,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  greenView: {
    backgroundColor: '#B2E5CE',
    borderColor: '#64CB9D',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  greenValue: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: AppColor.textColor,
  },
});
