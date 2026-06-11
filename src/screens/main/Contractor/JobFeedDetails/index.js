import React, { useCallback, useEffect, useState } from 'react';
import Design from './Design';
import { useNavigation } from '@react-navigation/native';
import { Linking, Platform } from 'react-native';
import {
  setSelectedChat,
  setSelectedChatPerson,
  setSelectedJobChat,
} from '../../../../redux/actions/chatActions';
import { useDispatch, useSelector } from 'react-redux';
import { downloadAndOpen } from '../../../../helpers/fileHandler';
import { hasInternet } from '../../../../helpers/services';
import { getSingleJobDetails } from '../../../../redux/actions/contractorActions';
import { showToast } from '../../../../helpers/ToastConfig';
const JobFeedDetails = props => {
  const userData = useSelector(state => state.auth.data.userData);
  const [loadingFileUrl, setLoadingFileUrl] = useState(null);
  const jobDetails = useSelector(
    state => state?.contractor?.data?.singleJobDetails,
  );
  const { selectedJobId } = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  useEffect(() => {
    loadJobDetails();
  }, []);

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
    } catch (error) {
      showToast('error', error?.response?.message || 'Something went wrong');
    } finally {
      setIsFirstLoading(false);
    }
  }, [dispatch, selectedJobId]);
  const handleSubmitOffer = () => {
    navigation.navigate('MakeOffer', { selectedJobId: jobDetails?.id });
  };

  const handleStartChat = () => {
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
        clientName:
          jobDetails?.postedBy.firstName + ' ' + jobDetails?.postedBy.lastName,
        clientAvatar: jobDetails?.postedBy.avatar ?? null,
      }),
    );
    navigation.navigate('MessagesInboxScreen');
  };

  const safeOpenMap = async () => {
    try {
      const lat = jobDetails?.property?.latitude;
      const lng = jobDetails?.property?.longitude;

      if (lat == null || lng == null) {
        showToast(
          'info',
          'Property owner did not provide property location details',
        );
        return;
      }

      const url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
        android: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      });

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast('error', 'Unable to open map application');
      }
    } catch (e) {
      console.log('Map error:', e);
      showToast('error', 'Unable to open location');
    }
  };
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
      value={value}
      setValue={setValue}
      showDetails={showDetails}
      setShowDetails={setShowDetails}
      job={jobDetails}
      handleSubmitOffer={handleSubmitOffer}
      handleStartChat={handleStartChat}
      safeOpenMap={safeOpenMap}
      currentImage={currentImage}
      setCurrentImage={setCurrentImage}
      handleFilePress={handleFilePress}
      loadingFileUrl={loadingFileUrl}
      isFirstLoading={isFirstLoading}
    />
  );
};

export default JobFeedDetails;
