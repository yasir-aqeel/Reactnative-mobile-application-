import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Design from './Design';
import { showToast } from '../../../helpers/ToastConfig';
import {
  resetPassword,
  saveLoginInfo,
} from '../../../redux/actions/authActions';
import { hasInternet } from '../../../helpers/services';
import { validatePasswordStrength } from '../../../helpers/PasswordValidation';

const ResetPassowrd = ({ navigation }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state?.auth?.isLoading);
  const userLoginInfo = useSelector(state => state.auth.data.userLoginInfo);
  const storedEmail = userLoginInfo !== null && userLoginInfo.userEmail;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(true);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const validatePassword = () => {
    const result = validatePasswordStrength(password);

    if (!result.valid) {
      showToast('info', result.errors);
      return false;
    }

    if (password !== confirmPassword) {
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
        email: storedEmail,
        newPassword: password,
      };
      const response = await dispatch(resetPassword(body));
      if (response.statusCode === 200) {
        const loginInfoForRedux = {
          userEmail: storedEmail,
          userPassword: password,
        };

        dispatch(saveLoginInfo(loginInfoForRedux));
        showToast('success', response.message);
        navigation.navigate('login');
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
      password={password}
      setPassword={setPassword}
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
    />
  );
};
export default ResetPassowrd;
