import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';

import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import ModalHeader from '../ModalHeader';
import {
  AddMemeber,
  EyeIcon,
  DirectionIcon,
  DoubleCheck,
  CoinIcon,
  PauseIcon,
  ChangeOrder,
  ResumeIcon,
} from '../../../assets/svg';
import { images } from '../../../assets/images';
import Button from '../../Button';
import apiClient from '../../../helpers/apiClient';
import { showToast } from '../../../helpers/ToastConfig';
import { hasInternet } from '../../../helpers/services';
import { useSelector } from 'react-redux';

const QuickActionModal = ({ visible, onClose, openModal, state }) => {
  const userData = useSelector(state => state?.auth?.data.userData);
  const [jobActionLoading, setJobActionLoading] = useState(false);
  if (!visible || !state) {
    return null;
  }
  const userImages = [
    {
      image: images.user1,
      id: '1',
    },
    {
      image: images.user2,
      id: '2',
    },
    {
      image: images.user3,
      id: '3',
    },
    {
      image: images.user4,
      id: '4',
    },
  ];
  const safeOpenMap = async () => {
    const lat = state?.property?.latitude;
    const lng = state?.property?.longitude;
    try {
      const url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
        android: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      });
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (e) {
      console.log('Map error:', e);
    }
  };

  const handleResumeJob = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      onClose();
      setTimeout(() => {
        showToast('info', 'No Internet Connection');
      }, 500);
      return;
    }
    setJobActionLoading(true);
    try {
      // const userCoords = await getFreshUserLocation();
      // const propertyCoords = {
      //   latitude: state?.property?.latitude,
      //   longitude: state?.property?.longitude,
      // };
      // const distance = distanceInMiles(userCoords, propertyCoords);
      // console.log('Fresh Distance:', distance);

      // // 0.2 miles ≈ 320 meters
      // if (isNaN(distance) || distance > 0.2) {
      //   showToast(
      //     'info',
      //     'You must be at the property location to start the job',
      //   );
      //   return;
      // }

      const payload = {
        jobId: state.id,
        jobStatus: 'IN_PROGRESS',
      };
      console.log('payload', payload);
      const { data } = await apiClient.post(`jobs/resume-job`, payload);
      onClose();
      setTimeout(() => {
        showToast('success', data.message);
      }, 500);

      return data;
    } catch (err) {
      console.log(err, 'Could not resume this job.');
    } finally {
      setJobActionLoading(false);
    }
  };
  const jobStatus = state?.jobStatus;
  const actionsArray = [
    {
      name: 'Mark Job as Complete',
      icon: DoubleCheck,
      id: 'job_complete',
      onPress: () => {
        if (jobStatus === 'PAUSED') {
          showToast(
            'info',
            'Job is Paused Start it before mark it as complete',
          );
          return;
        }
        openModal('photos_before_job_complete_modal', state);
      },
      backgroundColor: '#ECF9F3',
      borderColor: '#B2E5CE',
      iconColor: '#31986A',
      textColor: '#2A2A2A',
    },
    {
      name: 'Request Change order',
      icon: ChangeOrder,
      onPress: () => {
        // if (state?.hasPendingChangeOrder) {
        //   onClose();
        //   showToast(
        //     'info',
        //     'Last requested change order is pending, wait for approval!',
        //   );
        //   return;
        // }
        openModal('change_order', state);
      },
      backgroundColor: '#F7F7F7',
      borderColor: '#E1E1E1',
      iconColor: '#2A2A2A',
      textColor: '#555555',
    },
    {
      name: 'Request Down Payment',
      icon: CoinIcon,
      onPress: () => {
        if (
          !userData?.user?.identityVerified &&
          userData?.user?.identityStatus === 'UNVERIFIED'
        ) {
          openModal('identity_verification_modal', {
            title: `Verify identity to request\n mobilization draw`,
            description:
              'Contractors must complete a quick Stripe Identity check before requesting a mobilization draw on this job.',
          });
          return;
        }
        if (!state?.hasDownPayment) {
          onClose();
          showToast('info', 'Down payment is not applicable for this job');
          return;
        }
        openModal('request_down_payment', state);
      },
      backgroundColor: '#F7F7F7',
      borderColor: '#E1E1E1',
      iconColor: '#2A2A2A',
      textColor: '#555555',
    },
    ...(jobStatus === 'IN_PROGRESS'
      ? [
          {
            name: 'Pause Job',
            icon: PauseIcon,
            id: 'pause_job',
            onPress: () => {
              if (state?.jobStatus === 'ACTIVE') {
                onClose();
                showToast('info', 'Job is not started yet');
                return;
              }
              openModal('pause_job', state);
            },
            backgroundColor: '#F7F7F7',
            borderColor: '#E1E1E1',
            iconColor: '#2A2A2A',
            textColor: '#555555',
          },
        ]
      : [
          {
            name: state?.jobStatus === 'ACTIVE' ? 'Start Job' : 'Resume Job',
            id: 'resume_job',
            icon: ResumeIcon,
            onPress: handleResumeJob,
            backgroundColor: '#F7F7F7',
            borderColor: '#E1E1E1',
            iconColor: '#009FD9',
            textColor: '#555555',
          },
        ]),
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <ModalHeader title={'Quick Actions'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.view1}>
              <View style={styles.assignView}>
                <Text style={styles.assign}>Assigned Member</Text>
              </View>
              <View style={styles.view2}>
                <View style={styles.row}>
                  {userImages.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginRight: -20,
                          zIndex: userImages.length - index,
                        }}
                      >
                        <Image
                          source={item.image}
                          style={styles.img}
                          resizeMode="cover"
                        />
                      </View>
                    );
                  })}
                </View>
                <TouchableOpacity
                  onPress={() => openModal('assign_job', state)}
                  style={styles.touch}
                >
                  <AddMemeber style={{ height: 50, width: 50 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginVertical: 12 }}>
              <Text style={styles.property}>Property</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Button
                text={'View'}
                color={'#555555'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.s}
                lineHeight={Spacing.l}
                height={44}
                backgroundColor={'#F7F7F7'}
                borderWidth={1}
                borderColor={'#E1E1E1'}
                width={'49%'}
                borderRadius={Spacing.s}
                leftIcon={<EyeIcon style={styles.sideIcon} />}
                iconSpacing={5}
                onPress={onClose}
              />
              <Button
                text={'Directions'}
                color={'#FFF'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.s}
                lineHeight={Spacing.l}
                height={44}
                backgroundColor={'#009FD9'}
                borderWidth={1}
                borderColor={'#009FD9'}
                width={'49%'}
                borderRadius={Spacing.s}
                leftIcon={<DirectionIcon style={styles.sideIcon} />}
                iconSpacing={5}
                onPress={() => safeOpenMap()}
              />
            </View>
            <View style={{ marginVertical: 12 }}>
              <Text
                style={{
                  color: '#6A6A6A',
                  fontFamily: PopinsFont.regular,
                  fontSize: FontSizes.m,
                  lineHeight: Spacing.m,
                }}
              >
                Job Actions
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                gap: 5,
              }}
            >
              {actionsArray.map((item, index) => {
                return (
                  <Button
                    text={item.name}
                    color={item.textColor}
                    fontFamily={PopinsFont.regular}
                    fontSize={FontSizes.s}
                    lineHeight={Spacing.l}
                    height={44}
                    backgroundColor={item.backgroundColor}
                    borderWidth={1}
                    borderColor={item.borderColor}
                    width={'100%'}
                    borderRadius={Spacing.s}
                    leftIcon={
                      jobActionLoading && item.id === 'resume_job' ? (
                        <ActivityIndicator size={'small'} color={'#009FD9'} />
                      ) : (
                        <item.icon style={styles.sideIcon} />
                      )
                    }
                    iconSpacing={item.id === 'resume_job' ? 10 : 5}
                    onPress={item.onPress}
                    disabled={
                      jobStatus === 'PAUSED' || jobStatus === 'COMPLETED'
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
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
  sheetContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingVertical: 15,
    width: '100%',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sideIcon: { height: 16, width: 16 },
  view1: {
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: Spacing.s,
    padding: Spacing.xs,
    width: '100%',
  },
  assign: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.s,
    fontSize: FontSizes.m,
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 5,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#fff', // white ring
    backgroundColor: '#eee', // fallback bg
  },
  assignView: { alignItems: 'flex-start', marginVertical: 8 },
  scrollView: { paddingHorizontal: 10 },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  property: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.m,
  },
});

export default QuickActionModal;
