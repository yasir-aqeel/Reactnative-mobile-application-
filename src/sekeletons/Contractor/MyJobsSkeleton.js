import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Shimmer = ({ style }) => {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width * 2, { duration: 1200 }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.base, style]}>
      <Animated.View style={[styles.shimmerWrapper, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.9)', 'transparent']} // ✅ FIXED VISIBILITY
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const SkeletonCard = () => {
  return (
    <View style={styles.card}>
      <Shimmer style={styles.image} />

      <View style={styles.posted}>
        <Shimmer style={{ width: 120, height: 12 }} />
      </View>

      <Shimmer style={{ width: '70%', height: 16, marginBottom: 6 }} />
      <Shimmer style={{ width: '45%', height: 14, marginBottom: 6 }} />
      <Shimmer style={{ width: '60%', height: 12, marginBottom: 10 }} />

      <View style={styles.box}>
        <View style={styles.row}>
          <Shimmer style={{ width: 90, height: 12 }} />
          <Shimmer style={{ width: 16, height: 10 }} />
        </View>

        <Shimmer style={{ width: '100%', height: 10, marginTop: 10 }} />
        <Shimmer style={{ width: '90%', height: 10, marginTop: 6 }} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Shimmer style={{ width: 50, height: 10 }} />
            <Shimmer style={{ width: 70, height: 12, marginTop: 6 }} />
          </View>

          <View style={styles.infoBox}>
            <Shimmer style={{ width: 60, height: 10 }} />
            <Shimmer style={{ width: 60, height: 12, marginTop: 6 }} />
          </View>

          <View style={styles.infoBox}>
            <Shimmer style={{ width: 50, height: 10 }} />
            <Shimmer style={{ width: 50, height: 12, marginTop: 6 }} />
          </View>
        </View>
      </View>

      <View style={styles.clientRow}>
        <Shimmer style={{ width: 100, height: 14 }} />
        <Shimmer style={{ width: 30, height: 14 }} />
      </View>
    </View>
  );
};

const JobFeedCardSkeleton = () => {
  const data = Array.from({ length: 10 }).map((_, i) => ({ id: i }));

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={() => <SkeletonCard />}
      showsVerticalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
  },

  base: {
    backgroundColor: '#EAEAEA', // ✅ IMPORTANT (not pure white)
    overflow: 'hidden',
    borderRadius: 6,
  },

  shimmerWrapper: {
    width: width * 2,
    height: '100%',
    position: 'absolute',
    left: -width,
  },

  gradient: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
  },

  posted: {
    width: 120,
    height: 18,
    marginBottom: 10,
  },

  box: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
  },

  infoBox: {
    width: '33.33%',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#E1E1E1',
  },

  clientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingTop: 4,
  },
});
export default JobFeedCardSkeleton;
