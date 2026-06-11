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

const MessagesInboxSkeleton = () => {
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

  const BubbleSkeleton = ({ isMe = false, lines = 2 }) => {
    return (
      <View
        style={[
          styles.messageWrapper,
          {
            alignSelf: isMe ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: isMe ? '#F2F2F2' : '#E9F7FC',
              borderColor: isMe ? '#E1E1E1' : '#D7EEF7',
              alignSelf: isMe ? 'flex-end' : 'flex-start',
            },
          ]}
        >
          {/* MESSAGE LINES */}
          <View style={styles.messageContainer}>
            {[...Array(lines)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.messageLine,
                  {
                    width:
                      index === lines - 1 ? (isMe ? '55%' : '70%') : '100%',
                  },
                ]}
              />
            ))}
          </View>

          {/* TIME */}
          <View
            style={[
              styles.timeRow,
              {
                alignSelf: isMe ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <View style={styles.timeSkeleton} />

            {isMe && <View style={styles.tickSkeleton} />}
          </View>

          {/* SHIMMER */}
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
      </View>
    );
  };

  const DATA = [
    { id: 1, isMe: false, lines: 2 },
    { id: 2, isMe: true, lines: 1 },
    { id: 3, isMe: false, lines: 3 },
    { id: 4, isMe: true, lines: 2 },
    { id: 5, isMe: false, lines: 1 },
    { id: 6, isMe: true, lines: 2 },
    { id: 7, isMe: false, lines: 2 },
    { id: 8, isMe: true, lines: 1 },
    { id: 9, isMe: false, lines: 1 },
    { id: 10, isMe: true, lines: 2 },
  ];

  return (
    <FlatList
      data={DATA}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <BubbleSkeleton isMe={item.isMe} lines={item.lines} />
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MessagesInboxSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 30,
  },

  messageWrapper: {
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 12,
  },

  card: {
    width: '80%',
    borderRadius: 12,
    padding: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },

  messageContainer: {
    marginBottom: 12,
  },

  messageLine: {
    height: 12,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  timeSkeleton: {
    width: 42,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },

  tickSkeleton: {
    width: 18,
    height: 10,
    borderRadius: 6,
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
