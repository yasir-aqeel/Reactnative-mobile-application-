import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import AppColor from '../../../helpers/AppColor';

import ModalHeader from '../ModalHeader';
import { RatingStart } from '../../../assets/svg';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import Button from '../../Button';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
import { useSelector } from 'react-redux';
import apiClient from '../../../helpers/apiClient';
export function combinedReviewRating(quality, communication) {
  if (!quality || !communication) return;
  const avg = (quality + communication) / 2;
  return Math.min(5, Math.max(1, Math.round(avg)));
}

const RatingBar = ({ label, value, onChange }) => {
  const total = 5;
  const containerWidth = useRef(0);

  const updateRating = x => {
    if (!containerWidth.current) return;

    let newValue = Math.ceil((x / containerWidth.current) * total);

    newValue = Math.max(1, Math.min(total, newValue));
    onChange(newValue);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        updateRating(evt.nativeEvent.locationX);
      },
      onPanResponderMove: evt => {
        updateRating(evt.nativeEvent.locationX);
      },
    }),
  ).current;

  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={styles.ratingRow}
        onLayout={e => {
          containerWidth.current = e.nativeEvent.layout.width;
        }}
        {...panResponder.panHandlers}
      >
        {[...Array(total)].map((_, index) => {
          const filled = index < value;

          return (
            <View
              key={index}
              style={[
                styles.segment,
                { backgroundColor: filled ? '#F58220' : '#E5E5E5' },
              ]}
            />
          );
        })}

        {/* Star Indicator */}
        <View
          style={[
            styles.starCircle,
            {
              position: 'absolute',
              left: `${(value / total) * 100}%`,
              transform: [{ translateX: -18 }],
            },
          ]}
        >
          <RatingStart style={{ height: 20, width: 20 }} fill="#fff" />
        </View>
      </View>
    </View>
  );
};
const ReviewRatingModal = ({ visible, onClose, state }) => {
  // console.log('state in review modal', state);
  const userData = useSelector(state => state?.auth?.data?.userData);
  const [experience, setExperience] = useState(4);
  const [communication, setCommunication] = useState(5);
  const [review, setReview] = useState('');
  const [jobActionLoading, setJobActionLoading] = useState(false);

  const handlesubmitReview = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }

    setJobActionLoading(true);
    const rating = combinedReviewRating(experience, communication);
    try {
      const payload = {
        jobId: state.id,
        fromUserId: userData?.user.id,
        toUserId: state?.postedById,
        rating: rating,
        comment: review.trim() || undefined,
      };
      console.log('Review Payload:', payload);
      const { data } = await apiClient.post(`feedback`, payload);
      // console.log('Review Response:', data);
      if (data && data.id) {
        onClose();
        setTimeout(() => {
          showToast('success', 'Review submitted successfully');
        }, 500);
      }
      return data;
    } catch (err) {
      console.log(err, 'Could not start this job.');
    } finally {
      setJobActionLoading(false);
    }
  };
  if (!visible || !state) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <ModalHeader title={'Review'} onPress={() => onClose()} />

          <View
            pointerEvents={jobActionLoading ? 'none' : 'auto'}
            style={{ paddingHorizontal: 10 }}
          >
            <RatingBar
              label="Experience working with owner"
              value={experience}
              onChange={setExperience}
            />

            <RatingBar
              label="Communication"
              value={communication}
              onChange={setCommunication}
            />

            <Text style={styles.label}>Review (Optional)</Text>

            <TextInput
              placeholder="Write a review"
              value={review}
              onChangeText={setReview}
              multiline
              style={styles.input}
              placeholderTextColor="#6A6A6A"
            />

            <Button
              text={jobActionLoading ? '' : 'Submit review'}
              backgroundColor={'#009FD9'}
              color={jobActionLoading ? 'transparent' : '#FFFFFF'}
              borderRadius={Spacing.s}
              height={44}
              width={'100%'}
              fontFamily={PopinsFont.regular}
              fontSize={FontSizes.m}
              lineHeight={Spacing.xl}
              onPress={() => handlesubmitReview()}
              leftIcon={
                jobActionLoading ? (
                  <ActivityIndicator size={'small'} color={'#FFFFFF'} />
                ) : null
              }
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    width: '100%',
    // maxHeight: '90%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
  },

  label: {
    fontSize: FontSizes.s,
    color: '#6A6A6A',
    marginBottom: 10,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  segment: {
    height: 10,
    flex: 1,
    marginRight: 6,
    borderRadius: 5,
  },

  starCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F58220',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    height: 120,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 12,
    width: '100%',
    maxHeight: 150,
  },
});
export default ReviewRatingModal;
