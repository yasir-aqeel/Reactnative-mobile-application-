import React, { useRef, useState, useCallback, useEffect } from 'react';
import { AppState } from 'react-native';
import Design from './Design';
import { usePicker } from '../../../../helpers/usePicker';
import { showToast } from '../../../../helpers/ToastConfig';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleJobDetails,
  submitBidOnNewJobData,
} from '../../../../redux/actions/contractorActions';
import {
  deleteFile,
  deleteImage,
  hasInternet,
  uploadFile,
  uploadImage,
} from '../../../../helpers/services';
import moment from 'moment';
import { getUserData } from '../../../../redux/actions/authActions';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
const MakeOffer = props => {
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const navigation = useNavigation();
  const { selectedJobId } = props.route.params;
  const jobDetails = useSelector(
    state => state?.contractor?.data?.singleJobDetails,
  );
  const userData = useSelector(state => state.auth.data.userData);
  const isLoading = useSelector(state => state.contractor.isLoading);
  const token = userData?.access_token;
  const dispatch = useDispatch();
  const userID = userData?.user.id;
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const openImagePicker = usePicker('image', setImages, true);
  const openCamera = usePicker('camera', setImages, true);
  const pickDocument = usePicker('documents', setDocuments, true);
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [siteVisit, setSiteVisit] = useState(false);
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [mode, setMode] = useState('date');
  const isOpeningRef = useRef(false);
  const jobId = jobDetails?.id;

  const [form, setForm] = useState({
    amount: 0,
    message: '',
    jobId: '',
    contractorId: userID,
    minimumChargeHour: 0,
    estimatedHour: 0,
    estimatedMaterial: 0,
    proposedStartDate: '',
    website: '',
    contractorBidPhotos: [],
    contractorBidFiles: [],
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    if (jobId) {
      setForm(prev => ({
        ...prev,
        jobId,
      }));
    }
  }, [jobId]);

  useFocusEffect(
    useCallback(() => {
      handleGetIdentityVerifiedStatus();
    }, []),
  );
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
          handleGetIdentityVerifiedStatus();
        }
      }

      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  const handleGetIdentityVerifiedStatus = async () => {
    if (userData?.user?.identityVerified) {
    } else {
      openModal('identity_verification', {
        title: 'Verify identity to request mobilization draw',
        description:
          'Contractors must complete a quick Stripe Identity check before requesting a mobilization draw on this job.',
      });
    }
  };
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
      // console.log(singleJobDetails);
    } catch (error) {
      showToast('error', error?.response?.message || 'Something went wrong');
    } finally {
      setIsFirstLoading(false);
    }
  }, [dispatch, selectedJobId]);
  const validationForm = () => {
    // if (!form.message?.trim()) {
    //   showToast('info', 'Proposal is Required');
    //   return false;
    // }

    if (!form.amount) {
      showToast('info', 'Offer is Required');
      return false;
    }

    if (!form.proposedStartDate) {
      showToast('info', 'Date is Required');
      return false;
    }

    // if (selectedJob?.JobType === 'T_AND_M') {
    //   if (!form.estimatedHour) {
    //     showToast('info', 'Estimate Hours is Required');
    //     return false;
    //   }
    //   if (!form.estimatedMaterial) {
    //     showToast('info', 'Material Cost is Required');
    //     return false;
    //   }
    // }

    return true;
  };
  const handleSubmitOffer = async () => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    if (!userData?.user?.identityVerified && form.amount >= 2500) {
      openModal('identity_verification_modal', {
        title: `Get verified on Fixrli`,
        description:
          'Complete a quick Stripe Identity check so you can post, fund, and request payments above $2,500.',
      });
      return;
    }

    if (!validationForm()) return;

    try {
      const isBidSubmitted = await dispatch(submitBidOnNewJobData(form));
      console.log('isBidSubmitted', isBidSubmitted);

      if (isBidSubmitted.status === 201 && isBidSubmitted?.data?.jobId) {
        navigation.navigate('Dashboard', {
          screen: 'Feed',
        });
        setTimeout(() => {
          showToast('success', 'Bid Submitted Successfully');
        }, 500);
      }
    } catch (error) {
      showToast('error', error.response.message);
      console.log('handleSubmitOffer error', error);
    }
  };
  const handleImagePick = async type => {
    let pickedImages = [];
    if (type === 'camera') {
      pickedImages = await openCamera();
    } else {
      pickedImages = await openImagePicker();
    }

    const validImages = pickedImages.filter(img => img.size <= 2 * 1024 * 1024);

    const oversized = pickedImages.filter(img => img.size > 2 * 1024 * 1024);

    if (oversized.length) {
      showToast('info', `${oversized[0]?.name || 'File'} must be ≤ 2MB`);
    }

    const limitedImages = validImages.slice(0, 5);

    if (validImages.length > 5) {
      showToast('info', 'Maximum 5 images allowed');
      return;
    }
    const isConnected = await hasInternet();
    if (!isConnected) {
      showToast('info', 'No Internet Connection');
      return;
    }
    setImageLoading(true);
    try {
      const uploadedImages = [];

      for (const file of limitedImages) {
        const res = await uploadImage(file);

        if (res?.url) {
          uploadedImages.push(res.url); // server response (url/id)
        }
      }

      setForm(prev => ({
        ...prev,
        contractorBidPhotos: [...prev.contractorBidPhotos, ...uploadedImages],
      }));
    } catch (err) {
      console.log('Upload error', err);
    } finally {
      setImageLoading(false);
    }
  };
  const removeImage = async index => {
    const image = form.contractorBidPhotos[index];

    if (!image) return;

    try {
      await deleteImage(image);

      setForm(prev => ({
        ...prev,
        contractorBidPhotos: prev.contractorBidPhotos.filter(
          (_, i) => i !== index,
        ),
      }));
    } catch (err) {
      console.log('Delete error', err);
    }
  };
  const removeAllImages = async () => {
    const images = form.contractorBidPhotos;

    if (!images.length) return;

    try {
      await Promise.all(
        images.map(img => deleteImage(img.url || img).catch(() => {})),
      );

      setForm(prev => ({
        ...prev,
        contractorBidPhotos: [],
      }));
    } catch (err) {
      console.log('Delete all error', err);
    }
  };
  const handleDocumentPick = async () => {
    const pickedDocs = await pickDocument();

    if (!pickedDocs || !pickedDocs.length) return;

    const MAX_SIZE = 2 * 1024 * 1024;
    const MAX_COUNT = 10;

    // filter valid docs
    const validDocs = pickedDocs.filter(doc => doc.size <= MAX_SIZE);

    const oversized = pickedDocs.filter(doc => doc.size > MAX_SIZE);

    if (oversized.length) {
      showToast('info', `${oversized[0]?.name || 'File'} must be ≤ 2MB`);
    }

    const limitedDocs = validDocs.slice(0, MAX_COUNT);

    if (validDocs.length > MAX_COUNT) {
      showToast('info', 'Maximum 10 documents allowed');
      return;
    }
    const isConnected = await hasInternet();
    if (!isConnected) {
      showToast('info', 'No Internet Connection');
      return;
    }
    setDocumentsLoading(true);
    try {
      const uploadedFiles = [];

      for (const file of limitedDocs) {
        const res = await uploadFile(file);

        if (res?.url) {
          uploadedFiles.push(res.url); // backend url
        }
      }

      setForm(prev => ({
        ...prev,
        contractorBidFiles: [...prev.contractorBidFiles, ...uploadedFiles],
      }));
    } catch (err) {
      console.log('Document upload error', err);
    } finally {
      setDocumentsLoading(false);
    }
  };
  const removeDocument = async index => {
    const file = form.contractorBidFiles[index];

    if (!file) return;

    try {
      await deleteFile(file, token);

      setForm(prev => ({
        ...prev,
        contractorBidFiles: prev.contractorBidFiles.filter(
          (_, i) => i !== index,
        ),
      }));
    } catch (err) {
      console.log('Delete document error', err);
    }
  };

  const removeAllDocuments = async () => {
    const files = form.contractorBidFiles;

    if (!files.length) return;

    try {
      await Promise.all(
        files.map(file => deleteFile(file.url || file, token).catch(() => {})),
      );

      setForm(prev => ({
        ...prev,
        contractorBidFiles: [],
      }));
    } catch (err) {
      console.log('Delete all documents error', err);
    }
  };

  const handleValueChangeIOS = useCallback((event, selectedDate) => {
    if (selectedDate) {
      setForm(prev => ({
        ...prev,
        proposedStartDate: moment(selectedDate).format('YYYY-MM-DD'),
      }));
    }

    setOpenDateTimePicker(false);

    isOpeningRef.current = false;
  }, []);

  const handleValueChangeAndroid = useCallback(
    selectedDate => {
      const currentDate = selectedDate || new Date();

      if (mode === 'date') {
        const dateOnly = moment(currentDate).startOf('day').toDate();

        setForm(prev => ({
          ...prev,
          proposedStartDate: dateOnly, // KEEP FULL DATE OBJECT
        }));

        setMode('time');
        setOpenDateTimePicker(false);
        isOpeningRef.current = false;

        setTimeout(() => {
          setOpenDateTimePicker(true);
          isOpeningRef.current = true;
        }, 100);
      } else {
        const baseDate = new Date(form.proposedStartDate || new Date());

        baseDate.setHours(currentDate.getHours());
        baseDate.setMinutes(currentDate.getMinutes());

        setForm(prev => ({
          ...prev,
          proposedStartDate: baseDate, // KEEP FULL DATETIME
        }));

        setOpenDateTimePicker(false);
        isOpeningRef.current = false;
        setMode('date');
      }
    },
    [mode, form.proposedStartDate],
  );
  const handleDismiss = useCallback(() => {
    setOpenDateTimePicker(false);
    isOpeningRef.current = false;
    setMode('date');
  }, []);

  const onValueChange =
    Platform.OS === 'ios' ? handleValueChangeIOS : handleValueChangeAndroid;

  const openDateTimePickerModal = useCallback(() => {
    if (isOpeningRef.current) return;
    setMode('date');
    setOpenDateTimePicker(true);
    isOpeningRef.current = true;
  }, []);
  const onClose = () => {
    setShowDiscardModal(false);
  };
  const onDiscard = () => {
    setShowDiscardModal(false);
    navigation.goBack();
  };
  const openDiscardModal = () => {
    setShowDiscardModal(!showDiscardModal);
  };

  return (
    <Design
      navigation={navigation}
      removeImage={removeImage}
      removeAllImages={removeAllImages}
      openImagePicker={handleImagePick}
      pickDocument={handleDocumentPick}
      documents={documents}
      removeDocument={removeDocument}
      removeAllDocuments={removeAllDocuments}
      scopeOfWork={scopeOfWork}
      setScopeOfWork={setScopeOfWork}
      siteVisit={siteVisit}
      setSiteVisit={setSiteVisit}
      openDateTimePicker={openDateTimePicker}
      setOpenDateTimePicker={setOpenDateTimePicker}
      onValueChange={onValueChange}
      onDismiss={handleDismiss}
      openDateTimePickerModal={openDateTimePickerModal}
      mode={mode}
      setMode={setMode}
      openDiscardModal={openDiscardModal}
      showDiscardModal={showDiscardModal}
      onClose={onClose}
      onDiscard={onDiscard}
      form={form}
      setForm={setForm}
      isLoading={isLoading}
      selectedJob={jobDetails}
      handleSubmitOffer={handleSubmitOffer}
      imageLoading={imageLoading}
      documentsLoading={documentsLoading}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      state={state}
      setState={setState}
      isFirstLoading={isFirstLoading}
    />
  );
};

export default MakeOffer;
