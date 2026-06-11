import apiClient from '../../helpers/apiClient';
import {
  // show real app
  SHOW_REAL_APP,
  // save login info
  SAVE_LOGIN_INFO,
  // user logout
  USER_LOGOUT,
  // update local user info
  UPDATE_LOCAL_USER_INFO,
  // user login
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  // verify email
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_REQUEST_SUCCESS,
  VERIFY_EMAIL_REQUEST_FAILED,
  // user forget password
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_REQUEST_SUCCESS,
  FORGET_PASSWORD_REQUEST_FAILED,
  // verify otp
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_REQUEST_SUCCESS,
  VERIFY_OTP_REQUEST_FAILED,
  // reset password
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  // reset password
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_REQUEST_SUCCESS,
  UPDATE_PASSWORD_REQUEST_FAILED,
  // save user location
  SAVE_USER_LOCATION,
  // social login
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_REQUEST_FAILED,
  SOCIAL_LOGIN_REQUEST_SUCCESS,
  // signup request
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILED,
  // select role
  SELECT_ROLE_REQUEST,
  SELECT_ROLE_REQUEST_SUCCESS,
  SELECT_ROLE_REQUEST_FAILED,
  // accept terms
  ACCEPT_TERMS_REQUEST,
  ACCEPT_TERMS_REQUEST_SUCCESS,
  ACCEPT_TERMS_REQUEST_FAILED,
  // create new profile
  CREATE_NEW_PROFILE_REQUEST,
  CREATE_NEW_PROFILE_SUCCESS,
  CREATE_NEW_PROFILE_FAILED,
  // onboard user
  ONBOARD_USER_REQUEST,
  ONBOARD_USER_REQUEST_SUCCESS,
  ONBOARD_USER_REQUEST_FAILED,
  RESET_ALL_LOADING,
  // create mfa token
  CREATE_MFA_VERIFY_SETUP_REQUEST,
  CREATE_MFA_VERIFY_SETUP_REQUEST_SUCCESS,
  CREATE_MFA_VERIFY_SETUP_REQUEST_FAILED,
  // mfa setup
  MFA_SETUP_REQUEST,
  MFA_SETUP_REQUEST_SUCCESS,
  MFA_SETUP_REQUEST_FAILED,
  // mfa verify setup
  MFA_VERIFY_SETUP_REQUEST,
  MFA_VERIFY_SETUP_REQUEST_SUCCESS,
  MFA_VERIFY_SETUP_REQUEST_FAILED,
  // mfa verify
  MFA_VERIFY_REQUEST,
  MFA_VERIFY_REQUEST_SUCCESS,
  MFA_VERIFY_REQUEST_FAILED,
  // update user
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST_FAILED,
  // revoke single session
  REVOKE_SINGLE_SESSION_REQUEST,
  REVOKE_SINGLE_SESSION_REQUEST_SUCCESS,
  REVOKE_SINGLE_SESSION_REQUEST_FAILED,
  // revoke all sessions
  REVOKE_ALL_SESSION_REQUEST,
  REVOKE_ALL_SESSION_REQUEST_SUCCESS,
  REVOKE_ALL_SESSION_REQUEST_FAILED,
  // revoke other sessions
  REVOKE_OTHERS_SESSION_REQUEST,
  REVOKE_OTHERS_SESSION_REQUEST_SUCCESS,
  REVOKE_OTHERS_SESSION_REQUEST_FAILED,
  // get user data from api
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_REQUEST_SUCCESS,
  GET_USER_DATA_REQUEST_FAILED,
} from '../types/auth_action_types';
import { BASE_URL } from '../../helpers/BASE_URL';
export const updateAppState = () => {
  return {
    type: SHOW_REAL_APP,
  };
};
export const updateLocalUserInfo = userInfo => {
  return {
    type: UPDATE_LOCAL_USER_INFO,
    payload: userInfo,
  };
};
export const resetAllLoading = () => ({
  type: RESET_ALL_LOADING,
});
export const saveLoginInfo = loginInfo => {
  return {
    type: SAVE_LOGIN_INFO,
    payload: loginInfo,
  };
};
export const saveUserLocation = location => {
  return {
    type: SAVE_USER_LOCATION,
    payload: location,
  };
};
export const logoutUser = () => ({
  type: USER_LOGOUT,
});
// user signup
const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};
const signupSuccess = data => {
  return {
    type: SIGNUP_REQUEST_SUCCESS,
    payload: data,
  };
};

const signupFailed = error => {
  return {
    type: SIGNUP_REQUEST_FAILED,
    payload: error,
  };
};

export const userSignup = body => {
  return async dispatch => {
    dispatch(signupRequest());

    try {
      const response = await apiClient.post('auth/signup', body);
      dispatch(signupSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(signupFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// select role
const selectRoleRequest = () => {
  return {
    type: SELECT_ROLE_REQUEST,
  };
};
const selectRoleSuccess = data => {
  return {
    type: SELECT_ROLE_REQUEST_SUCCESS,
    payload: data,
  };
};

const selectRoleFailed = error => {
  return {
    type: SELECT_ROLE_REQUEST_FAILED,
    payload: error,
  };
};

export const selectRole = body => {
  return async dispatch => {
    dispatch(selectRoleRequest());

    try {
      const response = await apiClient.post('auth/select-role', body);
      if (response.data.statusCode === 200) {
        dispatch(selectRoleSuccess(body.role));
      }
      return response.data;
    } catch (error) {
      dispatch(selectRoleFailed(error.message));

      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalid Error!');
      }
    }
  };
};
// accept terms

const acceptTermsRequest = () => {
  return {
    type: ACCEPT_TERMS_REQUEST,
  };
};
const acceptTermsSuccess = data => {
  return {
    type: ACCEPT_TERMS_REQUEST_SUCCESS,
    payload: data,
  };
};

const acceptTermsFailed = error => {
  return {
    type: ACCEPT_TERMS_REQUEST_FAILED,
    payload: error,
  };
};

export const acceptTermsConditions = body => {
  return async dispatch => {
    dispatch(acceptTermsRequest());

    try {
      const response = await apiClient.post('auth/accept-terms', body);
      dispatch(acceptTermsSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(acceptTermsFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};

// create profile
const createProfileRequest = () => {
  return {
    type: CREATE_NEW_PROFILE_REQUEST,
  };
};
const createProfileSuccess = data => {
  return {
    type: CREATE_NEW_PROFILE_SUCCESS,
    payload: data,
  };
};

const createProfileFailed = error => {
  return {
    type: CREATE_NEW_PROFILE_FAILED,
    payload: error,
  };
};

export const createProfile = body => {
  return async dispatch => {
    dispatch(createProfileRequest());

    try {
      const response = await apiClient.post('auth/contractor-profile', body);
      dispatch(createProfileSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(createProfileFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};

// onboard user

const onboardUserRequest = () => {
  return {
    type: ONBOARD_USER_REQUEST,
  };
};
const onboardUserSuccess = data => {
  return {
    type: ONBOARD_USER_REQUEST_SUCCESS,
    payload: data,
  };
};

const onboardUserFailed = error => {
  return {
    type: ONBOARD_USER_REQUEST_FAILED,
    payload: error,
  };
};

export const onBoardUser = body => {
  return async dispatch => {
    dispatch(onboardUserRequest());

    try {
      const response = await apiClient.post('auth/complete-onboarding', body);
      dispatch(onboardUserSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(onboardUserFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};

// user login
const loginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};
const loginRequestSuccess = data => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data,
  };
};

const loginRequestFailed = error => {
  return {
    type: USER_LOGIN_FAILED,
    payload: error,
  };
};
export const userLogin = body => {
  return async dispatch => {
    dispatch(loginRequest());

    try {
      const response = await apiClient.post('auth/login', body);
      dispatch(loginRequestSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(loginRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// get user data from api
const getUserDataRequest = () => {
  return {
    type: GET_USER_DATA_REQUEST,
  };
};
const getUserDataRequestSuccess = data => {
  return {
    type: GET_USER_DATA_REQUEST_SUCCESS,
    payload: data,
  };
};

const getUserDataRequestFailed = error => {
  return {
    type: GET_USER_DATA_REQUEST_FAILED,
    payload: error,
  };
};

export const getUserData = () => {
  return async dispatch => {
    dispatch(getUserDataRequest());

    try {
      const response = await apiClient.get('auth/user');
      dispatch(getUserDataRequestSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(getUserDataRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// verify email

const verifyEmailRequest = () => {
  return {
    type: VERIFY_EMAIL_REQUEST,
  };
};
const verifyEmailRequestSuccess = data => {
  return {
    type: VERIFY_EMAIL_REQUEST_SUCCESS,
    payload: data,
  };
};

const verifyEmailRequestFailed = error => {
  return {
    type: VERIFY_EMAIL_REQUEST_FAILED,
    payload: error,
  };
};
export const verifyEmail = body => {
  return async dispatch => {
    dispatch(verifyEmailRequest());

    try {
      const response = await apiClient.post('auth/verify-email', body);
      dispatch(verifyEmailRequestSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(verifyEmailRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// user verify otp
const verifyOTPRequest = () => {
  return {
    type: VERIFY_OTP_REQUEST,
  };
};
const verifyOTPRequestSuccess = data => {
  return {
    type: VERIFY_OTP_REQUEST_SUCCESS,
    payload: data,
  };
};

const verifyOTPRequestFailed = error => {
  return {
    type: VERIFY_OTP_REQUEST_FAILED,
    payload: error,
  };
};
export const verifyOTP = body => {
  return async dispatch => {
    dispatch(verifyOTPRequest());

    try {
      const response = await apiClient.post('auth/verify-otp', body);
      dispatch(verifyOTPRequestSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(verifyOTPRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// user reset password
const resetPasswordRequest = () => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};
const resetPasswordRequestSuccess = data => {
  return {
    type: RESET_PASSWORD_REQUEST_SUCCESS,
    payload: data,
  };
};

const resetPasswordRequestFailed = error => {
  return {
    type: RESET_PASSWORD_REQUEST_FAILED,
    payload: error,
  };
};
export const resetPassword = body => {
  return async dispatch => {
    dispatch(resetPasswordRequest());

    try {
      const response = await apiClient.post('auth/reset-password', body);
      dispatch(resetPasswordRequestSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(resetPasswordRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// user update password
const updatePasswordRequest = () => {
  return {
    type: UPDATE_PASSWORD_REQUEST,
  };
};
const updatePasswordRequestSuccess = data => {
  return {
    type: UPDATE_PASSWORD_REQUEST_SUCCESS,
    payload: data,
  };
};

const updatePasswordRequestFailed = error => {
  return {
    type: UPDATE_PASSWORD_REQUEST_FAILED,
    payload: error,
  };
};
export const updatePassword = body => {
  return async dispatch => {
    dispatch(updatePasswordRequest());

    try {
      const response = await apiClient.post('auth/change-password', body);
      dispatch(updatePasswordRequestSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(updatePasswordRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};

// forgetPassowrd
const forgetPasswordRequest = () => {
  return {
    type: FORGET_PASSWORD_REQUEST,
  };
};
const forgetPasswordSuccess = data => {
  return {
    type: FORGET_PASSWORD_REQUEST_SUCCESS,
    payload: data,
  };
};

const forgetPasswordFailed = error => {
  return {
    type: FORGET_PASSWORD_REQUEST_FAILED,
    payload: error,
  };
};
export const forgetPassword = body => {
  return async dispatch => {
    dispatch(forgetPasswordRequest());

    try {
      const response = await apiClient.post(
        'auth/request-password-reset',
        body,
      );
      dispatch(forgetPasswordSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(forgetPasswordFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};

// social login
const socialLoginRequest = () => {
  return {
    type: SOCIAL_LOGIN_REQUEST,
  };
};
const socialLoginSuccess = data => {
  return {
    type: SOCIAL_LOGIN_REQUEST_SUCCESS,
    payload: data,
  };
};

const socialLoginFailed = error => {
  return {
    type: SOCIAL_LOGIN_REQUEST_FAILED,
    payload: error,
  };
};
export const socialLogin = body => {
  return async dispatch => {
    dispatch(socialLoginRequest());

    try {
      const response = await apiClient.post('auth/firebase-login', body);
      dispatch(socialLoginSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(socialLoginFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};

// update user

const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};
const updateUserSuccess = data => {
  return {
    type: UPDATE_USER_REQUEST_SUCCESS,
    payload: data,
  };
};

const updateUserFailed = error => {
  return {
    type: UPDATE_USER_REQUEST_FAILED,
    payload: error,
  };
};
export const updateUser = body => {
  return async dispatch => {
    dispatch(updateUserRequest());

    try {
      const response = await apiClient.patch('user/update', body);
      dispatch(updateUserSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(updateUserFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};

// create mfa token
const createMFATokenRequest = () => {
  return {
    type: CREATE_MFA_VERIFY_SETUP_REQUEST,
  };
};
const createMFATokenSuccess = data => {
  return {
    type: CREATE_MFA_VERIFY_SETUP_REQUEST_SUCCESS,
    payload: data,
  };
};

const createMFATokenFailed = error => {
  return {
    type: CREATE_MFA_VERIFY_SETUP_REQUEST_FAILED,
    payload: error,
  };
};
export const createMFAToken = token => {
  return async dispatch => {
    dispatch(createMFATokenRequest());

    try {
      const response = await apiClient.post('auth/mfa/setup-token');
      dispatch(createMFATokenSuccess(response.data.mfaToken));
      return response.data;
    } catch (error) {
      dispatch(createMFATokenFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// mfa setup
const mfaSetupRequest = () => {
  return {
    type: MFA_SETUP_REQUEST,
  };
};
const mfaSetupSuccess = data => {
  return {
    type: MFA_SETUP_REQUEST_SUCCESS,
    payload: data,
  };
};

const mfaSetupFailed = error => {
  return {
    type: MFA_SETUP_REQUEST_FAILED,
    payload: error,
  };
};
export const mfaSetup = body => {
  return async dispatch => {
    dispatch(mfaSetupRequest());
    try {
      const response = await apiClient.post('auth/mfa/setup', body);
      dispatch(mfaSetupSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(mfaSetupFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// mfa verify setup
const mfaVerifySetupRequest = () => {
  return {
    type: MFA_VERIFY_SETUP_REQUEST,
  };
};
const mfaVerifySetupSuccess = data => {
  return {
    type: MFA_VERIFY_SETUP_REQUEST_SUCCESS,
    payload: data,
  };
};

const mfaVerifySetupFailed = error => {
  return {
    type: MFA_VERIFY_SETUP_REQUEST_FAILED,
    payload: error,
  };
};
export const mfaVerifySetup = body => {
  return async dispatch => {
    dispatch(mfaVerifySetupRequest());

    try {
      const response = await apiClient.post('auth/mfa/verify-setup', body);
      dispatch(mfaVerifySetupSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(mfaVerifySetupFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// mfa verify
const mfaVerifyRequest = () => {
  return {
    type: MFA_VERIFY_REQUEST,
  };
};
const mfaVerifySuccess = data => {
  return {
    type: MFA_VERIFY_REQUEST_SUCCESS,
    payload: data,
  };
};

const mfaVerifyFailed = error => {
  return {
    type: MFA_VERIFY_REQUEST_FAILED,
    payload: error,
  };
};
export const mfaVerify = body => {
  return async dispatch => {
    dispatch(mfaVerifyRequest());
    try {
      const response = await apiClient.post('auth/mfa/verify', body);
      dispatch(mfaVerifySuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(mfaVerifyFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// revoke single session

const revokeSingleSessionRequest = () => {
  return {
    type: REVOKE_SINGLE_SESSION_REQUEST,
  };
};
const revokeSingleSessionRequestSuccess = data => {
  return {
    type: REVOKE_SINGLE_SESSION_REQUEST_SUCCESS,
    payload: data,
  };
};

const revokeSingleSessionRequestFailed = error => {
  return {
    type: REVOKE_SINGLE_SESSION_REQUEST_FAILED,
    payload: error,
  };
};
export const revokeSingleSession = (sessionId, body) => {
  return async dispatch => {
    dispatch(revokeSingleSessionRequest());

    try {
      const response = await apiClient.patch(
        `user/sessions/${sessionId}/revoke`,
        body,
      );
      dispatch(revokeSingleSessionRequestSuccess(response.data.data));
      return response.data;
    } catch (error) {
      dispatch(revokeSingleSessionRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
// revoke other sessions
const revokeOthersSessionRequest = () => {
  return {
    type: REVOKE_OTHERS_SESSION_REQUEST,
  };
};
const revokeOthersSessionRequestSuccess = data => {
  return {
    type: REVOKE_OTHERS_SESSION_REQUEST_SUCCESS,
    payload: data,
  };
};

const revokeOthersSessionRequestFailed = error => {
  return {
    type: REVOKE_OTHERS_SESSION_REQUEST_FAILED,
    payload: error,
  };
};
export const revokeOtherSessions = userID => {
  return async dispatch => {
    dispatch(revokeOthersSessionRequest());

    try {
      const response = await apiClient.patch(
        `user/sessions/${userID}/revoke-others`,
      );
      dispatch(revokeOthersSessionRequestSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(revokeOthersSessionRequestFailed(error.message));
      if (error.response) {
        console.log('post error', error.response.data);
        throw error.response.data;
      } else {
        throw new Error('Invalide Error!');
      }
    }
  };
};
