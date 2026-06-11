import React, { useMemo } from 'react';
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
    <View style={[styles.base, style]}>
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

const SkeletonItem = () => {
  return (
    <View style={styles.card}>
      {/* Title */}
      <Shimmer style={{ width: '90%', height: 18, borderRadius: 6 }} />

      {/* Address */}
      <Shimmer
        style={{
          width: '55%',
          height: 14,
          marginTop: 8,
          borderRadius: 6,
        }}
      />

      {/* Tags row */}
      <View style={styles.tagsRow}>
        <Shimmer style={{ width: 70, height: 16, borderRadius: 8 }} />
        <Shimmer style={{ width: 90, height: 16, borderRadius: 8 }} />
        <Shimmer style={{ width: 80, height: 16, borderRadius: 8 }} />
      </View>

      {/* Info grid */}
      <View style={styles.infoRow}>
        <Shimmer style={{ width: '30%', height: 14, borderRadius: 6 }} />
        <Shimmer style={{ width: '30%', height: 14, borderRadius: 6 }} />
        <Shimmer style={{ width: '30%', height: 14, borderRadius: 6 }} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Shimmer style={{ width: '48%', height: 36, borderRadius: 8 }} />
        <Shimmer style={{ width: '48%', height: 36, borderRadius: 8 }} />
      </View>
    </View>
  );
};

const CardSekeletoon = () => {
  const data = Array.from({ length: 10 }).map((_, i) => ({ id: i }));
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => <SkeletonItem />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default CardSekeletoon;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  base: {
    backgroundColor: '#E6E8EB',
    overflow: 'hidden',
  },
});
