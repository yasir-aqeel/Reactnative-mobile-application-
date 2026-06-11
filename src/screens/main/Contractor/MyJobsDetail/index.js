import React, { useCallback, useEffect, useState, useRef } from 'react';
import Design from './Design';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
import { showToast } from '../../../../helpers/ToastConfig';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  setSelectedChat,
  setSelectedChatPerson,
  setSelectedJobChat,
} from '../../../../redux/actions/chatActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  distanceInMiles,
  getFreshUserLocation,
  hasInternet,
} from '../../../../helpers/services';
import { getSingleJobDetails } from '../../../../redux/actions/contractorActions';
import { PauseIcon, ResumeIcon } from '../../../../assets/svg';
import apiClient from '../../../../helpers/apiClient';
import { getUserData } from '../../../../redux/actions/authActions';
import { AppState } from 'react-native';
import { downloadAndOpen } from '../../../../helpers/fileHandler';

const MyJobsDetail = props => {
  const { selectedJobId } = props.route.params;
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const navigation = useNavigation();
  const userData = useSelector(state => state?.auth?.data?.userData);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const jobDetails = useSelector(
    state => state?.contractor?.data?.singleJobDetails,
  );
  const [loadingFileUrl, setLoadingFileUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const initialLoadDone = useRef(false);
  const [jobActionLoading, setJobActionLoading] = useState(false);
  const jobStatus =
    !isLoading && jobDetails !== null ? jobDetails.jobStatus : null;
  const appState = useRef(AppState.currentState);
  const toggleStatusModal = () => setShowStatusModal(!showStatusModal);
  const handleStartChat = () => {
    if (!jobDetails) return;
    dispatch(setSelectedChat(jobDetails?.id));
    const winningBid = jobDetails.bids?.find(
      bid => bid.contractorId === jobDetails.contractorId,
    );
    dispatch(
      setSelectedJobChat({
        title: jobDetails.title,
        jobStatus: jobDetails.jobStatus,
        description: jobDetails.description,
        budget: jobDetails.budget,
        bidAmount: winningBid ? winningBid.amount : null,
        hoursWork: jobDetails.hoursWork,
        location: jobDetails.location,
        vendorId: jobDetails.vendorId,
        JobType: jobDetails.JobType,
      }),
    );
    dispatch(
      setSelectedChatPerson({
        clientId: jobDetails?.postedBy?.id,
        clientName: `${jobDetails?.postedBy.firstName} ${jobDetails?.postedBy.lastName}`,
        clientAvatar: jobDetails?.postedBy.avatar ?? null,
      }),
    );
    navigation.navigate('MessagesInboxScreen');
  };
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        !userData.user.identityVerified &&
        !userData.user.identityStatus === 'UNVERIFIED'
      ) {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App came back → rechecking Identity status');
          dispatch(getUserData());
        }
      }

      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);
  useEffect(() => {
    if (isFocused && !activeModal) {
      loadJobDetails();
    }
  }, [isFocused, activeModal]);
  useEffect(() => {
    if (isFocused && !initialLoadDone.current) {
      initialLoadDone.current = true;
      loadJobDetails();
    }
  }, [isFocused]);
  const getJobTimers = async jobId => {
    const { data } = await apiClient.get(`jobs/timer/${jobId}`);
    return data;
  };
  const loadJobDetails = useCallback(async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      setIsFirstLoading(false);
      return;
    }
    setIsFirstLoading(true);
    try {
      const singleJobDetails = await dispatch(
        getSingleJobDetails(selectedJobId),
      );
      const jobTimers = await getJobTimers(singleJobDetails?.id);
      console.log('jobTimers', jobTimers);
      setState(singleJobDetails);
    } catch (error) {
      showToast('error', error?.response?.message || 'Something went wrong');
    } finally {
      setIsFirstLoading(false);
      setRefreshing(false);
    }
  }, [dispatch, selectedJobId]);
  // ✅ Combine local loading with Redux loading (but local takes priority initially)
  const showLoading = isFirstLoading || (isLoading && !jobDetails);

  const handleResumeJob = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');

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
        jobId: jobDetails.id,
        jobStatus: 'IN_PROGRESS',
      };
      console.log('payload', payload);
      const { data } = await apiClient.post(`jobs/resume-job`, payload);
      loadJobDetails();
      showToast('success', data.message);
      return data;
    } catch (err) {
      console.log(err, 'Could not resume this job.');
    } finally {
      setJobActionLoading(false);
    }
  };

  const handlePauseJob = async () => {
    try {
      const internetStatus = await hasInternet();
      if (!internetStatus) {
        showToast('info', 'No Internet Connection');

        return;
      }
      setJobActionLoading(true);
      const payload = { jobId: jobDetails.id, jobStatus: 'PAUSED' };
      console.log('payload', payload);
      const { data } = await apiClient.post(`jobs/pause-job`, payload);
      loadJobDetails();
      showToast('success', data.message);
      return data;
    } catch (err) {
      console.log(err, 'Could not pause this job.');
    } finally {
      setJobActionLoading(false);
    }
  };
  const playback = (() => {
    switch (jobStatus) {
      case 'IN_PROGRESS':
        return {
          label: 'Pause Job',
          icon: PauseIcon,
          action: handlePauseJob,
          id: 'PAUSE',
        };
      case 'PAUSED':
        return {
          label: 'Resume Job',
          icon: ResumeIcon,
          action: handleResumeJob,
          id: 'RESUME',
        };
      default:
        return { label: '', icon: null };
    }
  })();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadJobDetails();
  }, []);

  const handleFilePress = async (fileUrl, fileName, uniqueId) => {
    if (loadingFileUrl) return;
    setLoadingFileUrl(uniqueId);
    try {
      await downloadAndOpen(fileUrl, fileName);
    } catch (error) {
      console.log('Error opening file:', error);
    } finally {
      setLoadingFileUrl(null);
    }
  };
  return (
    <Design
      navigation={navigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      showStatusModal={showStatusModal}
      setShowStatusModal={setShowStatusModal}
      toggleStatusModal={toggleStatusModal}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      handleStartChat={handleStartChat}
      isLoading={showLoading}
      jobDetails={jobDetails}
      state={state}
      setState={setState}
      playback={playback}
      jobActionLoading={jobActionLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
      handleFilePress={handleFilePress}
    />
  );
};

export default MyJobsDetail;
