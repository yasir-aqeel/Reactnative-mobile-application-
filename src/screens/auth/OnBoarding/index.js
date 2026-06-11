import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptTermsConditions,
  createMFAToken,
  createProfile,
  logoutUser,
  onBoardUser,
  selectRole,
} from '../../../redux/actions/authActions';
import Design from './Design';
import { View } from 'react-native';
import { showToast } from '../../../helpers/ToastConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { hasInternet, uploadImage } from '../../../helpers/services';

import styles from './style';
import { roles } from '../../../helpers/Data';
const OnBoarding = props => {
  const { screenName } = props.route.params;
  const navigation = useNavigation();
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);

  const token = userData?.access_token;

  const userID = userData?.user.id;
  const [form, setForm] = useState({
    token: token,
    userId: userID,
    role: roles[0].value,
    agreedToTerms: false,

    // 🔹 Contractor fields
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessLogo: '',
    serviceRadiusMiles: '',
    serviceArea: null,

    // // 🔹 Property Owner fields
    // companyEmail: '',
    // companyPhone: '',
    // companyLogo: '',

    // 🔹 Common (API 2)
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    // ✅ Step 1 → Role (optional if always selected)
    if (currentStep === 1) {
      if (!form.role) {
        showToast('info', 'Please select role');
        return false;
      }
    }

    // ✅ Step 4 → Business Info (phone only)
    if (currentStep === 4) {
      if (form.role === 'CONTRACTOR') {
        if (!form.businessName.trim()) {
          showToast('info', 'Business Name required');
          return false;
        }
        if (!form.businessEmail.trim()) {
          showToast('info', 'Business email is required');
          return false;
        }

        if (!emailRegex.test(form.businessEmail)) {
          showToast('info', 'Please enter a valid email address');
          return false;
        }
        if (!form.businessPhone.trim()) {
          showToast('info', 'Business phone required');
          return false;
        }

        if (!phoneRegex.test(form.businessPhone)) {
          showToast('info', 'Invalid business phone');
          return false;
        }
      }
      // else {
      //   if (!form.companyPhone.trim()) {
      //     showToast('info', 'Company phone required');
      //     return false;
      //   }

      //   if (!phoneRegex.test(form.companyPhone)) {
      //     showToast('info', 'Invalid company phone');
      //     return false;
      //   }
      // }
    }
    if (currentStep === 5) {
      // 🔹 Contractor validation
      if (form.role === 'CONTRACTOR') {
        const radius = Number(form.serviceRadiusMiles);

        if (!form.serviceRadiusMiles || form.serviceRadiusMiles.trim() === '') {
          showToast('info', 'Service Radius Miles required');
          return false;
        }

        if (isNaN(radius) || radius <= 0) {
          showToast('info', 'Invalid service radius');
          return false;
        }
      }
    }
    return true;
  };

  const buildProfilePayload = (userId, imageUrl = '') => {
    const common = {
      userId,
      address: form.address,
      city: form.city,
      state: form.state,
      zipCode: form.zipCode,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    if (form.role === 'CONTRACTOR') {
      return {
        ...common,
        businessName: form.businessName.trim(),
        businessEmail: form.businessEmail,
        businessPhone: form.businessPhone,
        businessLogo: imageUrl,
        serviceRadiusMiles: form.serviceRadiusMiles
          ? Number(form.serviceRadiusMiles)
          : undefined,
        serviceArea: {
          type: 'circle',
          radius: Number(form.serviceRadiusMiles),
          center: {
            lat: Number(form.latitude),
            lng: Number(form.longitude),
          },
        },
      };
    }
    // return {
    //   ...common,
    //   companyEmail: form.companyEmail,
    //   companyPhone: form.companyPhone,
    //   companyLogo: imageUrl,
    // };
  };

  const goBack = () => {
    if (currentStep === 1) {
      if (screenName === 'splash') {
        dispatch(logoutUser());
      }
      navigation.navigate(screenName);
      return;
    }

    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepAction = async () => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    try {
      // =========================
      // STEP 1: SELECT ROLE
      // =========================
      if (currentStep === 1) {
        if (!form.userId || !form.role) {
          showToast('error', 'Missing user or role');
          return;
        }

        const roleRes = await dispatch(
          selectRole({
            userId: form.userId,
            role: form.role,
          }),
        );

        if (roleRes.statusCode !== 200) {
          showToast('error', roleRes.message);
          return;
        }

        showToast('success', roleRes.message);
        setCurrentStep(2);
        return;
      }

      // =========================
      // STEP 2: ACCEPT TERMS
      // =========================
      if (currentStep === 2) {
        const termsRes = await dispatch(
          acceptTermsConditions({
            userId: form.userId,
            agreedToTerms: true,
          }),
        );

        if (termsRes.statusCode !== 200) {
          showToast('error', termsRes.message);
          return;
        }

        setForm(prev => ({
          ...prev,
          agreedToTerms: true,
        }));

        showToast('success', termsRes.message);
        setCurrentStep(3);
        return;
      }

      // =========================
      // STEP 3: PRIVACY POLICY
      // =========================
      if (currentStep === 3) {
        setCurrentStep(4);
        return;
      }

      // =========================
      // STEP 4:
      // =========================
      if (currentStep === 4) {
        const isValid = validateForm();
        if (!isValid) return;
        setCurrentStep(5);
      }

      if (currentStep === 5) {
        const isValid = validateForm();
        if (!isValid) return;

        let imageUrl = '';

        // const logo =
        //   form.role === 'CONTRACTOR' ? form.businessLogo : form.companyLogo;
        const logo = form.businessLogo;

        if (logo) {
          const uploadRes = await uploadImage(logo, form.token);
          imageUrl = uploadRes?.url || '';
        }

        const profileRes = await dispatch(
          createProfile(buildProfilePayload(form.userId, imageUrl)),
        );

        if (profileRes.statusCode !== 200) {
          showToast('error', profileRes.message);
          return;
        }

        showToast('success', profileRes.message);

        const onboardRes = await dispatch(onBoardUser({ userId: form.userId }));

        if (onboardRes.statusCode !== 200) {
          showToast('error', onboardRes.message);
          return;
        }

        showToast('success', onboardRes.message);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Contractor' }],
          }),
        );
        await dispatch(createMFAToken(form.token));
        return;
      }
    } catch (error) {
      console.log(error);
      showToast('error', error.message);
    }
  };

  const renderSteps = () => {
    return Array.from({ length: totalSteps }).map((_, index) => {
      const isCompleted = index < currentStep;

      return (
        <View
          key={index}
          style={[
            styles.stepBar,
            {
              backgroundColor: isCompleted ? '#3DBE84' : '#E1E1E1',
            },
          ]}
        />
      );
    });
  };
  return (
    <Design
      navigation={navigation}
      dispatch={dispatch}
      isLoading={isLoading}
      renderSteps={renderSteps}
      handleStepAction={handleStepAction}
      goBack={goBack}
      currentStep={currentStep}
      form={form}
      setForm={setForm}
    />
  );
};
export default OnBoarding;
