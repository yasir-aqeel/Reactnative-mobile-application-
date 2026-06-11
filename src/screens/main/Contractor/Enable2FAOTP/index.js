import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Design from './Design';
import {
  mfaVerifySetup,
  updateUser,
} from '../../../../redux/actions/authActions';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';

const Enable2FAOTP = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const [otp, setOtp] = useState('');
  const handleVerifyMFA = async () => {
    const internetStatus = await hasInternet();
    const mfaToken = userData?.user?.mfaToken;
    const token = userData?.access_token;
    const userID = userData?.user?.id;
    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    const body = {
      token: mfaToken,
      code: otp,
    };

    try {
      const mfaVerifyResponse = await dispatch(mfaVerifySetup(body));
      if (
        mfaVerifyResponse?.status === 201 &&
        mfaVerifyResponse?.data.message === 'MFA enabled successfully'
      ) {
        const updateUserBody = {
          id: userID,
          mfaEnabled: true,
        };
        const updateUserResponse = await dispatch(updateUser(updateUserBody));
        if (updateUserResponse) {
          showToast('success', mfaVerifyResponse?.data.message);
          navigation.navigate('Settings');
        }
      }
    } catch (error) {
      console.log(error);
      showToast('error', error.message);
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
export default Enable2FAOTP;
