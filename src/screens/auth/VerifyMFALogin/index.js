import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Design from './Design';
import { logoutUser, mfaVerify } from '../../../redux/actions/authActions';
import { hasInternet } from '../../../helpers/services';
import { showToast } from '../../../helpers/ToastConfig';
import { CommonActions } from '@react-navigation/native';
const VerifyMFALogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const [otp, setOtp] = useState('');
  const handleVerifyMFA = async () => {
    const internetStatus = await hasInternet();
    const mfaToken = userData?.mfaToken;
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    const body = {
      mfaToken: mfaToken,
      code: otp,
    };
    try {
      const mfaVerifyResponse = await dispatch(mfaVerify(body));
      if (mfaVerifyResponse.statusCode === 200) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Contractor' }],
          }),
        );
        showToast('success', mfaVerifyResponse.message);
      }
    } catch (error) {
      console.log(error);
      showToast('error', error.message);
      dispatch(logoutUser());
    }
  };
  return (
    <Design
      navigation={navigation}
      dispatch={dispatch}
      isLoading={isLoading}
      otp={otp}
      setOtp={setOtp}
      handleVerifyMFA={handleVerifyMFA}
    />
  );
};
export default VerifyMFALogin;
