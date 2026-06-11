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
const NUM_SKELETONS = 1; // number of skeleton cards

// Shimmer Animation
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

// Skeleton mimicking JobCard
const JobCardSkeleton = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: NUM_SKELETONS }).map((_, index) => (
        <View style={styles.jobCard} key={index}>
          {/* Image area */}
          <Shimmer style={styles.propertyImage} />

          {/* Title & Location */}
          <View style={{ padding: 12, alignItems: 'center' }}>
            <Shimmer style={{ width: '60%', height: 22, marginBottom: 6 }} />
            {/* jobTitle */}
            <Shimmer style={{ width: '40%', height: 15, marginBottom: 12 }} />
            {/* jobAddress */}
          </View>

          {/* Tags row */}
          <View style={styles.tagsRow}>
            <Shimmer
              style={{ width: 60, height: 14, marginRight: 6, borderRadius: 7 }}
            />
            <Shimmer style={{ width: 80, height: 14, borderRadius: 7 }} />
          </View>

          {/* Job description */}
          <Shimmer
            style={{
              width: '90%',
              height: 40,
              marginVertical: 12,
              alignSelf: 'center',
            }}
          />

          {/* Meta row */}
          <View style={styles.metaRow}>
            <Shimmer style={{ width: 80, height: 12, borderRadius: 6 }} />
            <Shimmer style={{ width: 80, height: 12, borderRadius: 6 }} />
            <Shimmer style={{ width: 80, height: 12, borderRadius: 6 }} />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Shimmer
              style={{
                width: '95%',
                height: 45,
                borderRadius: 5,
                marginBottom: 10,
              }}
            />
            <Shimmer style={{ width: '95%', height: 45, borderRadius: 5 }} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default JobCardSkeleton;

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    paddingBottom: 12,
  },
  propertyImage: {
    width: '100%',
    height: 300,
  },
  tagsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
    alignSelf: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  skeletonBase: {
    backgroundColor: '#E6E8EB',
    overflow: 'hidden',
  },
});
