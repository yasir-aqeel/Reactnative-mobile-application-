import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Spacing } from '../../helpers/sizeHelper';

const { width } = Dimensions.get('window');

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const SkeletonItem = () => {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {
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
    <View style={styles.actionCard}>
      <View style={styles.card}>
        <View style={styles.roleNamePlaceholder}>
          <View style={styles.basePlaceholder} />
          <AnimatedGradient
            colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.shimmer, animatedStyle]}
          />
        </View>

        <View style={styles.rightSection}>
          <View style={styles.countPlaceholder}>
            <View style={styles.basePlaceholder} />
            <AnimatedGradient
              colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.shimmer, animatedStyle]}
            />
          </View>

          <View style={styles.iconPlaceholder}>
            <View style={styles.basePlaceholder} />
            <AnimatedGradient
              colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.shimmer, animatedStyle]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const RolesCardSkeleton = () => {
  return (
    <FlatList
      data={Array.from({ length: 10 }, (_, index) => index)}
      keyExtractor={item => item.toString()}
      renderItem={() => <SkeletonItem />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  actionCard: {
    margin: 8,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.s,
    paddingVertical: Spacing.ms,
    borderRadius: Spacing.s,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    width: '100%',
  },

  roleNamePlaceholder: {
    width: 140,
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  countPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },

  iconPlaceholder: {
    width: 15,
    height: 15,
    borderRadius: 3,
    overflow: 'hidden',
  },

  basePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E5E5E5',
  },

  shimmer: {
    width: width * 0.4,
    height: '100%',
  },
});

export default RolesCardSkeleton;
