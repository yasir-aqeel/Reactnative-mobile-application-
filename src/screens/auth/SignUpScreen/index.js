import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Design from './Design';
import { showToast } from '../../../helpers/ToastConfig';
import { hasInternet } from '../../../helpers/services';
import {
  saveLoginInfo,
  socialLogin,
  userSignup,
} from '../../../redux/actions/authActions';
import { BackHandler, Platform } from 'react-native';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { validatePasswordStrength } from '../../../helpers/PasswordValidation';
import {
  signInWithApple,
  signInWithGoogle,
} from '../../../helpers/SocialLoginHelper';
const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === 'android') {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'auth',
                state: {
                  routes: [{ name: 'splash' }],
                },
              },
            ],
          });
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

  const handleName = fullName => {
    const cleaned = fullName.replace(/\s+/g, ' ').trim();

    const parts = cleaned.split(' ');

    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    setFirstName(firstName);
    setLastName(lastName);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      showToast('info', 'Name is required');
      return false;
    }

    if (!email.trim()) {
      showToast('info', 'Email is required');
      return false;
    }

    if (!emailRegex.test(email)) {
      showToast('info', 'Invalid email');
      return false;
    }

    const result = validatePasswordStrength(password);
    if (!result.valid) {
      showToast('info', result.errors);
      setPasswordErrors(result.errors);
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    try {
      const isValid = validateForm();
      if (!isValid) return;
      const body = {
        email: email,
        firstName,
        lastName,
        rememberMe: false,
        password: password,
      };
      console.log('body', body);
      const signupRes = await dispatch(userSignup(body));

      if (signupRes.statusCode !== 200) {
        showToast('error', signupRes.message);
        return;
      }

      showToast('success', signupRes.message);
      dispatch(
        saveLoginInfo({
          userEmail: email,
          userPassword: password,
        }),
      );

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'onBoarding',
              params: {
                screenName: 'signUp',
              },
            },
          ],
        }),
      );
      return;
    } catch (error) {
      console.log(error);
      showToast('error', error.message);
    }
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
                  screenName: 'signUp',
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
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isPasswordVisible={isPasswordVisible}
      setPasswordVisibility={setPasswordVisibility}
      passwordErrors={passwordErrors}
      setPasswordErrors={setPasswordErrors}
      handleName={handleName}
      handleSocialLogin={handleSocialLogin}
      isGoogleLoading={isGoogleLoading}
      isAppleLoading={isAppleLoading}
      handleSignup={handleSignup}
    />
  );
};
export default SignUpScreen;
