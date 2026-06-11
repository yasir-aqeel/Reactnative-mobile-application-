// import {
//   // show real app
//   SHOW_REAL_APP,
//   // save login info
//   SAVE_LOGIN_INFO,
//   // user logout
//   USER_LOGOUT,
//   // signup request
//   SIGNUP_REQUEST,
//   SIGNUP_REQUEST_SUCCESS,
//   SIGNUP_REQUEST_FAILED,
//   // user login
//   USER_LOGIN_REQUEST,
//   USER_LOGIN_SUCCESS,
//   USER_LOGIN_FAILED,
//   // user forget password
//   FORGET_PASSWORD_REQUEST,
//   FORGET_PASSWORD_REQUEST_SUCCESS,
//   FORGET_PASSWORD_REQUEST_FAILED,
//   // verify otp
//   VERIFY_OTP_REQUEST,
//   VERIFY_OTP_REQUEST_SUCCESS,
//   VERIFY_OTP_REQUEST_FAILED,
//   // reset password
//   RESET_PASSWORD_REQUEST,
//   RESET_PASSWORD_REQUEST_SUCCESS,
//   RESET_PASSWORD_REQUEST_FAILED,
// } from '../types/auth_action_types';

// const appState = {
//   isShowRealApp: false,
//   userLoginInfo: null,
//   userData: null,
// };

// const initialState = {
//   data: appState,
//   isLoading: false,
//   error: null,
// };

// export const propertyOwnerReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // show real app
//     case SHOW_REAL_APP:
//       return {
//         ...state,
//         data: {
//           ...state.data,
//           isShowRealApp: true,
//         },
//       };

//     // case SAVE_LOGIN_INFO:
//     //   return {
//     //     ...state,
//     //     data: {
//     //       ...state.data,
//     //       userLoginInfo: action.payload,
//     //     },
//     //   };
//     // // user login
//     // case IS_USER_LOGIN:
//     //   return {
//     //     ...state,
//     //     isLoading: true,
//     //     error: null,
//     //   };
//     // case IS_USER_LOGIN_SUCCESS:
//     //   return {
//     //     ...state,
//     //     isLoading: false,
//     //     data: {
//     //       ...state.data,
//     //       userData: action.payload,
//     //     },
//     //   };
//     // case IS_USER_LOGIN_FAILED:
//     //   return {
//     //     ...state,
//     //     isLoading: false,
//     //     error: action.payload,
//     //   };
//     // // user forget password
//     // case USER_FORGET_PASSWORD:
//     //   return {
//     //     ...state,
//     //     isLoading: true,
//     //     error: null,
//     //   };
//     // case USER_FORGET_PASSWORD_SUCCESS:
//     //   return {
//     //     ...state,
//     //     isLoading: false,
//     //     data: {
//     //       ...state.data,
//     //       isForgetPassword: action.payload,
//     //     },
//     //   };
//     // case USER_FORGET_PASSWORD_FAILED:
//     //   return {
//     //     ...state,
//     //     isLoading: false,
//     //     error: action.payload,
//     //   };

//     // // create a new user account
//     // case CREATE_USER_ACCOUNT_REQUEST:
//     //   return {
//     //     ...state,
//     //     isLoading: true,
//     //     error: null,
//     //   };
//     // case CREATE_USER_ACCOUNT_REQUEST_SUCCESS:
//     //   return {
//     //     ...state,
//     //     isLoading: false,
//     //     data: {
//     //       ...state.data,
//     //       createUserAccount: action.payload,
//     //     },
//     //   };
//     // case CREATE_USER_ACCOUNT_REQUEST_FAILED:
//     //   return {
//     //     ...state,
//     //     isLoading: false,
//     //     error: action.payload,
//     //   };

//     // // User Logout
//     // case USER_LOGOUT:
//     //   return {
//     //     ...state,
//     //     data: {
//     //       ...state.data,
//     //       userData: null,
//     //     },
//     //   };
//     default:
//       return state;
//   }
// };
