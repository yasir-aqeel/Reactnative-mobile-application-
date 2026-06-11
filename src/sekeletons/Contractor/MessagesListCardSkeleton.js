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

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const MessagesListCardSkeleton = () => {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {
        duration: 1400,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const SkeletonItem = () => {
    return (
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.row}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar} />
              <View style={styles.greenDot} />
            </View>

            {/* Content */}
            <View style={styles.contentView}>
              <View style={styles.nameSkeleton} />
              <View style={styles.messageSkeleton} />
            </View>
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.endView}>
          <View style={styles.timeSkeleton} />
          <View style={styles.countSkeleton} />
        </View>

        {/* Shimmer */}
        <AnimatedLinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.35)',
            'rgba(255,255,255,0)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.shimmer, animatedStyle]}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => <SkeletonItem />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default MessagesListCardSkeleton;

const styles = StyleSheet.create({
  container: {},

  card: {
    padding: 12,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    overflow: 'hidden',
  },

  leftSection: {
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatarWrapper: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },

  greenDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    height: 12,
    width: 12,
    borderRadius: 100,
    backgroundColor: '#CFCFCF',
    borderWidth: 2,
    borderColor: '#ECECEC',
  },

  contentView: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  nameSkeleton: {
    height: 14,
    width: 120,
    borderRadius: 6,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
  },

  messageSkeleton: {
    height: 12,
    width: 180,
    borderRadius: 6,
    backgroundColor: '#D9D9D9',
  },

  endView: {
    width: '15%',
    alignItems: 'center',
  },

  timeSkeleton: {
    width: 40,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
  },

  countSkeleton: {
    width: 18,
    height: 18,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },

  shimmer: {
    position: 'absolute',
    top: 0,
    left: -width,
    width: width * 0.4,
    height: '100%',
  },
});
