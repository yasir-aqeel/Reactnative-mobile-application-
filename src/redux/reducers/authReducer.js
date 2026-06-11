import {
  // show real app
  SHOW_REAL_APP,
  // save login info
  SAVE_LOGIN_INFO,
  // user logout
  USER_LOGOUT,

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
  // update password
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

const appState = {
  showRealApp: false,
  userLoginInfo: null,
  userData: null,
  forgetPassword: null,
  verifyOtp: null,
  resetPassword: null,
  isUserRegistered: null,
  userLocation: null,
};

const initialState = {
  data: appState,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // show real app
    case SHOW_REAL_APP:
      return {
        ...state,
        data: {
          ...state.data,
          showRealApp: true,
        },
      };
    // reset loading
    case RESET_ALL_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    // save login info
    case SAVE_LOGIN_INFO:
      return {
        ...state,
        data: {
          ...state.data,
          userLoginInfo: action.payload,
        },
      };

    // save user location
    case SAVE_USER_LOCATION:
      return {
        ...state,
        data: {
          ...state.data,
          userLocation: action.payload,
        },
      };
    // create a new user account
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: action.payload,
        },
      };
    case SIGNUP_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // SELECT ROLE (API 2)
    case SELECT_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case SELECT_ROLE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: {
            ...state.data?.userData,
            user: {
              ...state.data?.userData?.user,
              role: action.payload,
            },
          },
        },
      };

    case SELECT_ROLE_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // ACCEPT TERMS (API 3)
    case ACCEPT_TERMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case ACCEPT_TERMS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: {
            ...state.data?.userData,
            user: {
              ...state.data?.userData?.user,
              agreedToTerms: true,
            },
          },
        },
      };

    case ACCEPT_TERMS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // create new profile
    case CREATE_NEW_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_NEW_PROFILE_SUCCESS: {
      const { userId, ...restPayload } = action.payload;
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: {
            ...state.data.userData,
            user: {
              ...state.data.userData.user,
              ...restPayload,
              id: userId,
            },
          },
        },
      };
    }
    case CREATE_NEW_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ONBOARD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case ONBOARD_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: {
            ...state.data?.userData,
            user: {
              ...state.data?.userData?.user,
              isOnboardingComplete: true,
            },
          },
        },
      };

    case ONBOARD_USER_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // user login
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: action.payload,
        },
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // get user data from api

    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case GET_USER_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: {
            ...state.data.userData,
            user: {
              ...state.data.userData.user,
              ...action.payload,
            },
          },
        },
      };
    case GET_USER_DATA_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // verify email
    case VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case VERIFY_EMAIL_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   userData: action.payload,
        // },
      };
    case VERIFY_EMAIL_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // user forget password
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FORGET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   forgetPassword: action.payload,
        // },
      };
    case FORGET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // verify otp
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case VERIFY_OTP_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   verifyOtp: action.payload,
        // },
      };
    case VERIFY_OTP_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // reset password
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   resetPassword: action.payload,
        // },
      };
    case RESET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // update password
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   resetPassword: action.payload,
        // },
      };
    case UPDATE_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // google login
    case SOCIAL_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case SOCIAL_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: action.payload,
        },
      };
    case SOCIAL_LOGIN_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // create mfa token
    case CREATE_MFA_VERIFY_SETUP_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case CREATE_MFA_VERIFY_SETUP_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: {
            ...state.data?.userData,
            user: {
              ...state.data?.userData?.user,
              mfaToken: action.payload,
            },
          },
        },
      };
    case CREATE_MFA_VERIFY_SETUP_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // mfa setup
    case MFA_SETUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case MFA_SETUP_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   userData: action.payload,
        // },
      };
    case MFA_SETUP_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // mfa verify setup
    case MFA_VERIFY_SETUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case MFA_VERIFY_SETUP_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   userData: action.payload,
        // },
      };
    case MFA_VERIFY_SETUP_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // mfa verify
    case MFA_VERIFY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case MFA_VERIFY_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: action.payload,
        },
      };
    case MFA_VERIFY_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // update user
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          userData: {
            ...state.data.userData,
            user: {
              ...state.data.userData.user,
              ...action.payload,
            },
          },
        },
      };
    case UPDATE_USER_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // revoke single session
    case REVOKE_SINGLE_SESSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REVOKE_SINGLE_SESSION_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   userData: {
        //     ...state.data.userData,
        //     user: {
        //       ...state.data.userData.user,
        //       ...action.payload,
        //     },
        //   },
        // },
      };
    case REVOKE_SINGLE_SESSION_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // revoke others sessions
    case REVOKE_OTHERS_SESSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REVOKE_OTHERS_SESSION_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   userData: {
        //     ...state.data.userData,
        //     user: {
        //       ...state.data.userData.user,
        //       ...action.payload,
        //     },
        //   },
        // },
      };
    case REVOKE_OTHERS_SESSION_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // User Logout
    case USER_LOGOUT:
      return {
        ...state,
        data: {
          ...state.data,
          showRealApp: false,
          userData: null,
          forgetPassword: null,
          verifyOtp: null,
          resetPassword: null,
          isUserRegistered: null,
          userLocation: null,
        },
      };

    default:
      return state;
  }
};
