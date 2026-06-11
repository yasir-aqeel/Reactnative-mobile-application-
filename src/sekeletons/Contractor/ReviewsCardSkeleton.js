import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Spacing, FontSizes } from '../../helpers/sizeHelper';

const { width } = Dimensions.get('window');

const Skeleton = ({ style }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.skeleton, style, animatedStyle]} />;
};
const renderSekeleton = () => {
  return (
    <View style={styles.card}>
      {/* Top Team Row */}
      <View style={styles.view1}>
        <Skeleton style={styles.teamText} />
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} style={styles.avatar} />
        ))}
      </View>

      {/* Name + Rating Row */}
      <View style={styles.tagsRow}>
        <View style={styles.view2}>
          <Skeleton style={styles.name} />
          <Skeleton style={styles.date} />
        </View>

        <View style={styles.ratingRow}>
          <Skeleton style={styles.star} />
          <Skeleton style={styles.rating} />
        </View>
      </View>

      {/* Review Text */}
      <View style={styles.view3}>
        <Skeleton style={styles.reviewLine1} />
        <Skeleton style={styles.reviewLine2} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Job ID */}
      <View style={styles.view4}>
        <Skeleton style={styles.jobLabel} />
        <View style={styles.grayView}>
          <Skeleton style={styles.jobId} />
          <Skeleton style={styles.arrow} />
        </View>
      </View>
    </View>
  );
};
const ReviewsCardSkeleton = () => {
  const data = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderSekeleton}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    gap: 12, // spacing between skeleton cards
  },
  card: {
    backgroundColor: '#fff',
    paddingTop: Spacing.s,
    borderRadius: Spacing.s,
    width: '100%',
  },

  skeleton: {
    backgroundColor: '#E6E6E6',
    borderRadius: 6,
  },

  /* Team row */
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: Spacing.s,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    gap: 6,
    width: '35%',
    marginLeft: 8,
  },

  teamText: {
    width: 40,
    height: 12,
  },

  avatar: {
    width: 25,
    height: 25,
    borderRadius: 30,
  },

  /* Name + rating */
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xs,
    marginVertical: 16,
  },

  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  name: {
    width: 80,
    height: 14,
  },

  date: {
    width: 50,
    height: 12,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  star: {
    width: 17,
    height: 17,
    borderRadius: 4,
  },

  rating: {
    width: 20,
    height: 14,
  },

  /* Review text */
  view3: {
    paddingHorizontal: 10,
    marginBottom: 12,
    gap: 8,
  },

  reviewLine1: {
    width: '90%',
    height: 12,
  },

  reviewLine2: {
    width: '70%',
    height: 12,
  },

  divider: {
    height: 1,
    backgroundColor: '#E1E1E1',
    width: '100%',
  },

  /* Job row */
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 8,
    marginLeft: 5,
  },

  jobLabel: {
    width: 60,
    height: 12,
  },

  grayView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  jobId: {
    width: 70,
    height: 12,
  },

  arrow: {
    width: 12,
    height: 12,
  },
});
export default ReviewsCardSkeleton;
