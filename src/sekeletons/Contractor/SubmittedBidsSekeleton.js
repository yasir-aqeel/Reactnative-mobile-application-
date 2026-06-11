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
      withTiming(width * 2, {
        duration: 1200,
      }),
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
          colors={['transparent', 'rgba(255,255,255,0.9)', 'transparent']}
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
      <Shimmer
        style={{
          width: '65%',
          height: 18,
          marginBottom: 8,
        }}
      />

      <Shimmer
        style={{
          width: '90%',
          height: 14,
          marginBottom: 6,
        }}
      />

      <Shimmer
        style={{
          width: '70%',
          height: 14,
          marginBottom: 14,
        }}
      />

      <View style={styles.tagsRow}>
        <Shimmer style={styles.tagSkeleton} />

        <Shimmer style={styles.jobIdSkeleton} />

        <Shimmer style={styles.activeSkeleton} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.infoBox}>
              <Shimmer
                style={{
                  width: 60,
                  height: 10,
                }}
              />

              <Shimmer
                style={{
                  width: 70,
                  height: 12,
                  marginTop: 8,
                }}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.infoBox}>
              <Shimmer
                style={{
                  width: 60,
                  height: 10,
                }}
              />

              <Shimmer
                style={{
                  width: 70,
                  height: 12,
                  marginTop: 8,
                }}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Shimmer style={styles.buttonSkeleton} />
        <Shimmer style={styles.buttonSkeleton} />
      </View>
    </View>
  );
};

const SubmittedBidsSekeleton = () => {
  const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
  }));

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
    padding: 14,
    marginBottom: 16,
  },

  base: {
    backgroundColor: '#EAEAEA',
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

  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  tagSkeleton: {
    width: 90,
    height: 28,
    borderRadius: 20,
    marginRight: 10,
  },

  jobIdSkeleton: {
    width: 80,
    height: 28,
    borderRadius: 20,
    marginRight: 10,
  },

  activeSkeleton: {
    width: 90,
    height: 28,
    borderRadius: 20,
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

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },

  buttonSkeleton: {
    flex: 1,
    height: 36,
    borderRadius: 10,
  },
});

export default SubmittedBidsSekeleton;
