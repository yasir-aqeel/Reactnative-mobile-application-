import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const NUM_SKELETONS = 9;

// Shimmer Animation Component
const Shimmer = ({ style }) => {
  const translateX = useSharedValue(-width);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1300 }),
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

// Skeleton Component without FlatList
const ContractorDashboardSkeleton = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: NUM_SKELETONS }).map((_, index) => (
        <View style={styles.actionCard} key={index}>
          <Shimmer style={styles.image} />
          <View style={{ flex: 1 }}>
            <Shimmer style={{ width: '90%', height: 18, marginBottom: 10 }} />
            <Shimmer style={{ width: '60%', height: 14, marginBottom: 15 }} />
            <Shimmer
              style={{
                width: 110,
                height: 36,
                borderRadius: 20,
                alignSelf: 'flex-end',
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContractorDashboardSkeleton;

const styles = StyleSheet.create({
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: 14,
  },
  skeletonBase: {
    backgroundColor: '#E6E8EB',
    overflow: 'hidden',
  },
});
