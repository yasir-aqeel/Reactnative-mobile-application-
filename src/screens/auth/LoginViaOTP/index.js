import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveLoginInfo, socialLogin } from '../../../redux/actions/authActions';
import Design from './Design';
import { Platform } from 'react-native';
import { showToast } from '../../../helpers/ToastConfig';
import { CommonActions } from '@react-navigation/native';
import { hasInternet } from '../../../helpers/services';
import {
  signInWithApple,
  signInWithGoogle,
} from '../../../helpers/SocialLoginHelper';
const LoginScreen = ({ navigation }) => {
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const dispatch = useDispatch();
  const userLoginInfo = useSelector(state => state?.auth?.data?.userLoginInfo);
  const storedEmail = userLoginInfo?.userEmail ?? '';
  const [email, setEmail] = useState(storedEmail || '');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email
    if (!email.trim()) {
      showToast('info', 'Email is required');
      return false;
    }

    if (!emailRegex.test(email)) {
      showToast('info', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleLoginViaOtp = async () => {
    const loginInfoForRedux = {
      userEmail: email,
    };

    await dispatch(saveLoginInfo(loginInfoForRedux));
    navigation.navigate('otp', { isPasswordChange: false });

    // const internetStatus = await hasInternet();
    // if (!validateForm()) return;
    // if (!internetStatus) {
    //   showToast('info', 'No Internet Connection');
    //   return;
    // }
    // try {
    //   const body = {
    //     email: email,
    //   };
    // const loginInfoForRedux = {
    //   userEmail: email,
    // };

    // await dispatch(saveLoginInfo(loginInfoForRedux));
    //   const response = await dispatch(forgetPassword(body));
    //   // console.log('response handleLoginViaOtp', response);

    //   if (response.statusCode === 200) {
    //     showToast('success', response.message);
    //     navigation.navigate('otp');
    //   } else {
    //     showToast('error', response.message);
    //   }
    // } catch (error) {
    //   showToast('error', error.data.message);
    // }
  };

  const handleSocialLogin = async type => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    try {
      let responseData;

      // ================= GOOGLE =================
      if (type === 'google') {
        setIsGoogleLoading(true);

        const googleLoginResponse = await signInWithGoogle();

        if (!googleLoginResponse?.idToken) {
          showToast('error', 'Google token missing');
          return;
        }

        const response = await dispatch(
          socialLogin({ idToken: googleLoginResponse.idToken }),
        );

        responseData = response;
        setIsGoogleLoading(false);
      }

      // ================= APPLE =================
      else if (type === 'apple') {
        if (Platform.OS !== 'ios') {
          showToast('info', 'Apple Login is only available on iOS devices');
          return;
        }
        setIsAppleLoading(true);

        const appleLoginResponse = await signInWithApple();

        if (!appleLoginResponse?.idToken) {
          showToast('error', 'Apple token missing');
          return;
        }

        const response = await dispatch(
          socialLogin({
            idToken: appleLoginResponse.idToken,
          }),
        );

        responseData = response;
        setIsAppleLoading(false);
      }

      // ================= SUCCESS =================
      if (responseData?.statusCode === 200) {
        if (responseData?.data?.user?.isOnboardingComplete) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Contractor' }],
            }),
          );

          showToast('success', responseData.message);
          setIsGoogleLoading(false);
          setIsAppleLoading(false);
          return;
        }

        showToast('success', responseData.message);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'onBoarding',
                params: {
                  screenName: 'loginViaOtp',
                },
              },
            ],
          }),
        );
      } else {
        showToast('error', responseData?.message || 'Login failed');
      }
    } catch (error) {
      console.log('Social Login Error:', error);

      showToast(
        'error',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong',
      );
    } finally {
      setIsGoogleLoading(false);
      setIsAppleLoading(false);
    }
  };

  return (
    <Design
      navigation={navigation}
      dispatch={dispatch}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      handleLoginViaOtp={handleLoginViaOtp}
      handleSocialLogin={handleSocialLogin}
      isGoogleLoading={isGoogleLoading}
      isAppleLoading={isAppleLoading}
    />
  );
};
export default LoginScreen;
