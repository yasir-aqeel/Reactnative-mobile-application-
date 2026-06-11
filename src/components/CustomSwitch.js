import React, { useRef, useEffect } from 'react';
import { View, Pressable, Animated, StyleSheet, Text } from 'react-native';
import AppColor from '../helpers/AppColor';
import { PopinsFont } from '../helpers/Fonts';
import { FontSizes, Spacing } from '../helpers/sizeHelper';

const CustomSwitch = ({
  value = false,
  onValueChange = () => {},

  trackWidth = 40,
  trackHeight = 24,
  thumbSize = 18,
  padding = 2,

  activeTrackColor = '#009FD9',
  inactiveTrackColor = '#A6A6A6',
  thumbColor = '#fff',

  label = '',
  labelPosition = 'right',
  labelStyle = {},

  trackStyle = {},
  thumbStyle = {},
  containerStyle = {},
}) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value ? 1 : 0,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const toggle = () => {
    onValueChange(!value);
  };

  const maxTranslate = trackWidth - thumbSize - padding * 2;

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [padding, maxTranslate - 2],
  });

  const activeOpacity = anim;
  const inactiveOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const renderLabel = () =>
    label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null;

  return (
    <Pressable onPress={toggle} style={[styles.container, containerStyle]}>
      {labelPosition === 'left' && renderLabel()}

      <View
        style={[
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            overflow: 'hidden',
            justifyContent: 'center',
            padding,
          },
          trackStyle,
        ]}
      >
        {/* Inactive Layer */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: inactiveTrackColor,
              opacity: inactiveOpacity,
            },
          ]}
        />

        {/* Active Layer */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: activeTrackColor,
              opacity: activeOpacity,
            },
          ]}
        />

        {/* Thumb */}
        <Animated.View
          style={[
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX }, { scale }],
              elevation: 3,
              paddingHorizontal: 2,
            },
            thumbStyle,
          ]}
        />
      </View>

      {labelPosition === 'right' && renderLabel()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: FontSizes.s,
    color: AppColor.textColor,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
});

export default CustomSwitch;
