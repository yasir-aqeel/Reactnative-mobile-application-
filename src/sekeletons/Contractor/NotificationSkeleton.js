import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const NUM_SKELETONS = 8;

// Shimmer animation
const Shimmer = ({ style }) => {
  const translateX = useSharedValue(-width);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1200 }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.skeletonBase, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={['#E6E8EB', '#F4F6F8', '#E6E8EB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: width, height: '100%' }}
        />
      </Animated.View>
    </View>
  );
};

const NotificationSkeleton = () => {
  return (
    <View>
      {Array.from({ length: NUM_SKELETONS }).map((_, index) => (
        <View style={styles.card} key={index}>
          {/* Title + Time */}
          <View style={styles.row}>
            <Shimmer style={{ width: '60%', height: 16, borderRadius: 4 }} />
            <Shimmer style={{ width: 60, height: 12, borderRadius: 4 }} />
          </View>

          {/* Message line 1 */}
          <Shimmer
            style={{
              width: '90%',
              height: 14,
              marginTop: 10,
              borderRadius: 4,
            }}
          />

          {/* Message line 2 */}
          <Shimmer
            style={{
              width: '70%',
              height: 14,
              marginTop: 6,
              borderRadius: 4,
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default NotificationSkeleton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#0000000A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonBase: {
    backgroundColor: '#E6E8EB',
    overflow: 'hidden',
    padding: 10,
  },
});
