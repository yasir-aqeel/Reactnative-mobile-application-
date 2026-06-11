import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';

const StatsCard = ({ item, onPress }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const cardWidth = isLandscape ? width * 0.428 : width * 0.4;

  const Icon = item.icon;
  return (
    <TouchableOpacity
      disabled={!onPress}
      key={item.key}
      style={[styles.innerView, { width: cardWidth }]}
      onPress={() => onPress()}
    >
      <View style={styles.innerBox}>
        <View style={styles.box}>
          {Icon && <Icon style={styles.boxIcon} fill={'#2A2A2A'} />}
          <Text style={styles.value}>{item.value}</Text>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text}>{item.name}</Text>
          {/* {item.boost && (
            <View style={styles.greenView}>
              <Text style={styles.greenValue}>{item.boost}</Text>
            </View>
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  innerView: {
    // width is set dynamically, remove fixed width
    marginHorizontal: 5, // optional spacing
  },
  innerBox: {
    backgroundColor: '#FFF',
    height: 105,
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
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.xl4,
    lineHeight: FontSizes.xl4,
  },
  text: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    color: AppColor.textColor,
    lineHeight: Spacing.l,
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
