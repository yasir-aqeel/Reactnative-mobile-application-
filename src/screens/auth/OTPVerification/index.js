import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Design from './Design';
import { forgetPassword, verifyOTP } from '../../../redux/actions/authActions';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
import { useNavigation } from '@react-navigation/native';

const OTPVerification = props => {
  const { isPasswordChange } = props.route.params;
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const userLoginInfo = useSelector(state => state.auth.data.userLoginInfo);
  const storedEmail = userLoginInfo !== null && userLoginInfo.userEmail;

  const isLoading = useSelector(state => state?.auth?.isLoading);

  const [otp, setOtp] = useState('');
  const OTP_MINUTES = 5; // set your OTP minutes here
  const [secondsLeft, setSecondsLeft] = useState(OTP_MINUTES * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return; // stop when timer ends

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };
  const remainingSeconds = formatTime(secondsLeft);

  const maskEmail = email => {
    const [name, domain] = email.split('@');

    const visible = name.slice(0, 2);
    const hidden = '*'.repeat(name.length - 2);

    return `${visible}${hidden}@${domain}`;
  };
  const maskedEmail = maskEmail(storedEmail);
  const handleResendOTP = async () => {
    if (secondsLeft > 0) {
      showToast('info', 'You can request after given time');
      return;
    }

    const internetStatus = await hasInternet();

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      const body = {
        email: storedEmail,
      };

      const response = await dispatch(forgetPassword(body));

      if (response.statusCode === 200) {
        showToast('success', response.message);
        setSecondsLeft(OTP_MINUTES * 60); // reset timer
      }
    } catch (error) {
      showToast('error', error.message);
      console.log(error);
    }
  };
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
      const response = await dispatch(verifyOTP(body));
      // console.log('response', response);
      if (response.statusCode === 200) {
        showToast('success', response.message);
        navigation.navigate('resetPassword');
      } else {
        showToast('error', response.message);
      }
    } catch (error) {
      showToast('error', error.data.message);

      console.log(error);
    }
  };
  const handleVerifyLogin = () => {
    showToast('info', 'In Process');
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
      remainingSeconds={remainingSeconds}
      isPasswordChange={isPasswordChange}
      handleResendOTP={handleResendOTP}
      handleVerifyLogin={handleVerifyLogin}
    />
  );
};
export default OTPVerification;
