import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const TypingIndicator = () => {
  const [dot1] = useState(new Animated.Value(0));
  const [dot2] = useState(new Animated.Value(0));
  const [dot3] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -5, // Move up by 5 units
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0, // Move back down
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot1 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot2 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot3 }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    height: 25,
    width: 35,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: '#949494',
  },
});

export default TypingIndicator;
