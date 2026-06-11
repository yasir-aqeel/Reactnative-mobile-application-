import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMFAToken,
  resetAllLoading,
  saveLoginInfo,
  socialLogin,
  userLogin,
} from '../../../redux/actions/authActions';
import Design from './Design';
import { BackHandler, Platform } from 'react-native';
import { showToast } from '../../../helpers/ToastConfig';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { hasInternet } from '../../../helpers/services';
import {
  signInWithApple,
  signInWithGoogle,
} from '../../../helpers/SocialLoginHelper';
const LoginScreen = ({ navigation }) => {
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const dispatch = useDispatch();
  const userLoginInfo = useSelector(state => state?.auth?.data?.userLoginInfo);
  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const storedEmail = userLoginInfo?.userEmail ?? '';
  const storedPassword = userLoginInfo?.userPassword ?? '';
  const [email, setEmail] = useState(storedEmail || '');
  const [password, setPassword] = useState(storedPassword || '');
  const [isSaveInfo, setSaveInfo] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  useEffect(() => {
    dispatch(resetAllLoading());
  }, []);
  useFocusEffect(
    useCallback(() => {
      if (storedEmail && storedPassword) {
        setSaveInfo(true);
      }
      const backAction = () => {
        if (Platform.OS === 'android') {
          BackHandler.exitApp();
          return true; // Prevent default back behavior
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [navigation]),
  );

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
    // Password
    if (!password) {
      showToast('info', 'Password is required');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    const internetStatus = await hasInternet();
    if (!validateForm()) return;
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      const body = {
        email: email,
        password: password,
        rememberMe: false,
      };

      const loginInfoForRedux = {
        userEmail: email,
        userPassword: password,
      };

      dispatch(saveLoginInfo(loginInfoForRedux));

      const response = await dispatch(userLogin(body));
      if (response.statusCode === 200) {
        if (!response?.data?.user?.isOnboardingComplete) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'onBoarding',
                  params: {
                    screenName: 'login',
                  },
                },
              ],
            }),
          );

          showToast('success', response.message);
          return;
        }
        if (response?.data?.requiresEmailVerification) {
          navigation.navigate('emailVerification');
          showToast('success', response.message);
          return;
        }
        if (response?.data?.requiresMfa) {
          navigation.navigate('verifyMFALogin');
          return;
        }

        showToast('success', response.message);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Contractor' }],
          }),
        );
        await dispatch(createMFAToken(response?.data?.access_token));
      }
    } catch (error) {
      showToast('error', error.message);
    }
  };
  const handleLoginViaOTP = () => {
    navigation.navigate('loginViaOtp');
    showToast('info', 'In Process!');
    return;
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
                  screenName: 'login',
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
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      isPasswordVisible={isPasswordVisible}
      setPasswordVisibility={setPasswordVisibility}
      isSaveInfo={isSaveInfo}
      setSaveInfo={setSaveInfo}
      handleLoginViaOTP={handleLoginViaOTP}
      handleSocialLogin={handleSocialLogin}
      isGoogleLoading={isGoogleLoading}
      isAppleLoading={isAppleLoading}
    />
  );
};
export default LoginScreen;
