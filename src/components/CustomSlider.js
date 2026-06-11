import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import sizeHelper, { Spacing } from '../helpers/sizeHelper';

const SLIDER_WIDTH = sizeHelper.screenWidth - 80;
const handleHeight = 29;
const handleWidth = 36;

const CustomSlider = ({
  min,
  max,
  step,
  initialValue,
  onValueChange,
  filledColor,
  unfilledColor,
}) => {
  const offset = useSharedValue(0);
  const value = useSharedValue(initialValue);

  const MAX_OFFSET = SLIDER_WIDTH - handleWidth;

  useEffect(() => {
    const ratio = (initialValue - min) / (max - min);
    offset.value = ratio * MAX_OFFSET;
    value.value = initialValue;
  }, [initialValue]);

  const pan = Gesture.Pan().onChange(event => {
    let newOffset = offset.value + event.changeX;
    if (newOffset < 0) newOffset = 0;
    if (newOffset > MAX_OFFSET) newOffset = MAX_OFFSET;
    offset.value = newOffset;

    const ratio = newOffset / MAX_OFFSET;
    let newValue = min + ratio * (max - min);

    if (step > 1) {
      newValue = Math.round(newValue / step) * step;
    } else {
      newValue = Math.round(newValue);
    }

    value.value = newValue;

    if (onValueChange) runOnJS(onValueChange)(newValue);
  });

  const handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: offset.value + handleWidth / 2, // fill up to center of handle
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.sliderTrack, { backgroundColor: unfilledColor }]}>
        <Animated.View
          style={[
            styles.sliderFill,
            fillStyle,
            { backgroundColor: filledColor },
          ]}
        />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sliderHandle, handleStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 11,
    borderRadius: Spacing.xxs,
    justifyContent: 'center',
    // overflow: 'hidden',
  },
  sliderFill: {
    position: 'absolute',
    height: '100%',
    borderRadius: Spacing.xxs,
    left: 0,
  },
  sliderHandle: {
    width: handleWidth,
    height: handleHeight,
    borderColor: '#009FD9',
    borderWidth: 3,
    borderRadius: handleHeight / 2,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    top: -9, // center the handle vertically with the track
  },
});

export default CustomSlider;
