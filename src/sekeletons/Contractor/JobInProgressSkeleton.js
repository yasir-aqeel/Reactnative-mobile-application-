import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const SkeletonBar = ({ style }) => {
  const translateX = useSharedValue(-width);

  useEffect(() => {
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
      <Animated.View style={[styles.shimmer, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.6)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
    </View>
  );
};

const JobInProgressSkeleton = () => {
  const items = Array(9).fill(0);

  return (
    <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
      {/* HEADER SKELETON */}
      <View style={styles.headerContainer}>
        <SkeletonBar style={styles.backButton} />

        <View style={styles.headerRight}>
          <SkeletonBar style={styles.publicTag} />
          <SkeletonBar style={styles.statusTag} />
        </View>
      </View>

      {/* TAB SKELETON */}
      <View style={styles.tabContainer}>
        <SkeletonBar style={styles.tab} />
        <SkeletonBar style={styles.tab} />
      </View>

      {/* TITLE SECTION */}
      <View style={styles.titleContainer}>
        <SkeletonBar style={{ width: '75%', height: 22, marginBottom: 10 }} />

        <View style={styles.jobIdRow}>
          <SkeletonBar style={{ width: 110, height: 12 }} />
          <SkeletonBar
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
            }}
          />
        </View>
      </View>

      {/* QUICK ACTION BUTTON */}
      <View style={styles.quickActionContainer}>
        <SkeletonBar
          style={{
            width: '100%',
            height: 44,
            borderRadius: 12,
          }}
        />
      </View>

      {/* TIMELINE ITEMS */}
      {items.map((_, index) => (
        <View key={index} style={styles.itemContainer}>
          {index !== items.length - 1 && <View style={styles.line} />}

          <View style={styles.timelineIcon}>
            <SkeletonBar style={{ width: 14, height: 14, borderRadius: 7 }} />
          </View>

          <View style={styles.activityItem}>
            <SkeletonBar
              style={{ width: '70%', height: 12, marginBottom: 10 }}
            />

            <SkeletonBar
              style={{ width: '40%', height: 10, marginBottom: 10 }}
            />

            <View style={styles.bottomLine} />

            <SkeletonBar
              style={{ width: '90%', height: 10, marginBottom: 6 }}
            />
            <SkeletonBar
              style={{ width: '80%', height: 10, marginBottom: 10 }}
            />

            <View style={styles.starRow}>
              <SkeletonBar style={{ flex: 1, height: 114 }} />
              <SkeletonBar style={{ flex: 1, height: 114 }} />
            </View>

            <View style={styles.budgetContainer}>
              <View>
                <SkeletonBar
                  style={{ width: 60, height: 10, marginBottom: 6 }}
                />
                <SkeletonBar style={{ width: 80, height: 14 }} />
              </View>

              <SkeletonBar style={{ width: 90, height: 35 }} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },

  /* HEADER */
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },

  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },

  publicTag: {
    width: 90,
    height: 36,
    borderRadius: 20,
  },

  statusTag: {
    width: 130,
    height: 36,
    borderRadius: 20,
  },

  /* TABS */
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    marginTop: 14,
    marginBottom: 14,
    gap: 8,
  },

  tab: {
    flex: 1,
    height: 44,
    borderRadius: 10,
  },

  /* TITLE */
  titleContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },

  jobIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  quickActionContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  /* TIMELINE */
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    position: 'relative',
  },

  line: {
    position: 'absolute',
    top: 20,
    left: 32,
    width: 1,
    height: '200%',
    backgroundColor: '#E0E0E0',
  },

  timelineIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  activityItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
  },

  bottomLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#EAEAEA',
    marginVertical: 8,
  },

  starRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },

  budgetContainer: {
    marginTop: 12,
    backgroundColor: '#F7F7F7',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },

  /* COMMON */
  skeletonBase: {
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    overflow: 'hidden',
  },

  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default JobInProgressSkeleton;
