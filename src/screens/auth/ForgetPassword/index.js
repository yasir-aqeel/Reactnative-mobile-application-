import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Design from './Design';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
import {
  forgetPassword,
  saveLoginInfo,
} from '../../../redux/actions/authActions';

const ForgetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const userLoginInfo = useSelector(state => state.auth.data.userLoginInfo);
  const storedEmail = userLoginInfo !== null && userLoginInfo.userEmail;
  const [email, setEmail] = useState(storedEmail || '');
  const handleSubmit = async () => {
    const internetStatus = await hasInternet();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      showToast('info', 'Email is required');
      return false;
    }

    if (!emailRegex.test(email)) {
      showToast('info', 'Please enter a valid email address');
      return false;
    }
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      const body = {
        email: email,
      };
      const loginInfoForRedux = {
        userEmail: email,
      };

      await dispatch(saveLoginInfo(loginInfoForRedux));
      const response = await dispatch(forgetPassword(body));

      if (response.statusCode === 200) {
        showToast('success', response.message);

        navigation.navigate('otp', { isPasswordChange: true });
      } else {
        showToast('error', response.message);
      }
    } catch (error) {
      showToast('error', error.message);
      console.log(error);
    }
  };
  return (
    <Design
      navigation={navigation}
      dispatch={dispatch}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
export default ForgetPassword;
