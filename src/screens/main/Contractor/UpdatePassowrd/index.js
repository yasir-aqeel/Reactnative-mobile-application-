import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Design from './Design';
import { showToast } from '../../../../helpers/ToastConfig';
import {
  resetPassword,
  saveLoginInfo,
  updatePassword,
} from '../../../../redux/actions/authActions';
import { hasInternet } from '../../../../helpers/services';
import { validatePasswordStrength } from '../../../../helpers/PasswordValidation';

const UpdatePassowrd = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const userData = useSelector(state => state.auth.data.userData);
  const token = userData?.access_token;
  const userLoginInfo = useSelector(state => state?.auth?.data?.userLoginInfo);
  const storedPassword = userLoginInfo?.userPassword ?? '';
  const storedEmail = userLoginInfo?.userEmail ?? '';
  const [currentPassword, setCurrentPassword] = useState(storedPassword);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrenrtPasswordVisible, setCurrentPasswordVisibility] =
    useState(true);
  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(true);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const validatePassword = () => {
    const result = validatePasswordStrength(newPassword);

    if (!result.valid) {
      showToast('info', result.errors);
      return false;
    }

    if (newPassword !== confirmPassword) {
      showToast('info', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const internetStatus = await hasInternet();
    if (!validatePassword()) return;

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      const body = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      const response = await dispatch(updatePassword(body));
      if (response.statusCode === 200) {
        const loginInfoForRedux = {
          userEmail: storedEmail,
          userPassword: newPassword,
        };

        dispatch(saveLoginInfo(loginInfoForRedux));
        showToast('success', response.message);
        navigation.goBack();
      } else {
        showToast('error', response.message);
      }
    } catch (error) {
      showToast('error', error.data.message);
      console.log(error);
    }
  };
  return (
    <Design
      navigation={navigation}
      dispatch={dispatch}
      isLoading={isLoading}
      currentPassword={currentPassword}
      setCurrentPassword={setCurrentPassword}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      handleSubmit={handleSubmit}
      isPasswordVisible={isPasswordVisible}
      setPasswordVisibility={setPasswordVisibility}
      isConfirmPasswordVisible={isConfirmPasswordVisible}
      setConfirmPasswordVisibility={setConfirmPasswordVisibility}
      passwordErrors={passwordErrors}
      setPasswordErrors={setPasswordErrors}
      confirmPasswordError={confirmPasswordError}
      setConfirmPasswordError={setConfirmPasswordError}
      isCurrenrtPasswordVisible={isCurrenrtPasswordVisible}
      setCurrentPasswordVisibility={setCurrentPasswordVisibility}
    />
  );
};
export default UpdatePassowrd;
