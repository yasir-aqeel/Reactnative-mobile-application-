import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Design from './Design';
import { logoutUser, verifyEmail } from '../../../redux/actions/authActions';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';

const EmailVerification = ({ navigation }) => {
  const dispatch = useDispatch();
  const userLoginInfo = useSelector(state => state.auth.data.userLoginInfo);
  const storedEmail = userLoginInfo !== null && userLoginInfo.userEmail;
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const [otp, setOtp] = useState('');

  const maskEmail = email => {
    const [name, domain] = email.split('@');

    const visible = name.slice(0, 2);
    const hidden = '*'.repeat(name.length - 2);

    return `${visible}${hidden}@${domain}`;
  };
  const maskedEmail = maskEmail(storedEmail);

  const handleSubmit = async () => {
    const internetStatus = await hasInternet();
    if (!otp || otp.length < 5) {
      showToast('info', 'OTP you entered is wrong');
      return;
    }
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      const body = {
        email: storedEmail,
        code: otp,
      };
      const response = await dispatch(verifyEmail(body));
      if (response.data.success && response.status === 201) {
        showToast('success', 'Email Verified Successfully');
        navigation.navigate('login');
        dispatch(logoutUser());
      }
    } catch (error) {
      if (error.message === 'User already Verified') {
        showToast('info', error.message);
        dispatch(logoutUser());
      } else {
        showToast('error', error.message);
      }
      navigation.navigate('login');
      console.log(error);
    }
  };

  return (
    <Design
      navigation={navigation}
      dispatch={dispatch}
      isLoading={isLoading}
      otp={otp}
      setOtp={setOtp}
      handleSubmit={handleSubmit}
      maskedEmail={maskedEmail}
    />
  );
};
export default EmailVerification;
