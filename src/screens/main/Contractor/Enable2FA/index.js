import React, { useEffect, useState } from 'react';
import Design from './Design';
import { useDispatch, useSelector } from 'react-redux';
import { hasInternet } from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import { mfaSetup } from '../../../../redux/actions/authActions';
const Enable2FA = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const [mfaData, setMFAData] = useState(null);

  useEffect(() => {
    if (userData?.user?.mfaToken) {
      setMFAData(null);
      handleStepMFA();
    }
  }, [userData?.user?.mfaToken]);
  const handleStepMFA = async () => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }

    const mfaToken = userData?.user?.mfaToken;
    const token = userData?.access_token;

    if (!mfaToken || !token) return; // ✅ safety

    const body = { token: mfaToken };

    try {
      const mfaResponse = await dispatch(mfaSetup(body));

      if (mfaResponse?.qrCode) {
        setMFAData(mfaResponse);
      }
    } catch (error) {
      console.log(error);
      showToast('error', error.message);
      navigation.goBack();
    }
  };

  return (
    <Design
      navigation={navigation}
      userData={userData}
      isLoading={isLoading}
      mfaData={mfaData}
    />
  );
};

export default Enable2FA;
