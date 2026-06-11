import axios from 'axios';
import { getStore } from '../redux/store';
import { logoutUser } from '../redux/actions/authActions';
import NavigationService from './NavigationService';
import { BASE_URL } from './BASE_URL';
import { logoutCurrentSession } from './services';

let isLoggingOut = false;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
apiClient.interceptors.request.use(
  async config => {
    try {
      const store = getStore();
      const state = store.getState();

      const token = state?.auth?.data?.userData?.access_token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // // ✅ REQUEST LOGS
      // console.log('\n🚀 API REQUEST START');
      // console.log('➡️ URL:', `${config.baseURL || ''}${config.url || ''}`);
      // console.log('➡️ METHOD:', config.method?.toUpperCase() || 'GET');

      // if (config.params) {
      //   console.log('➡️ PARAMS:', config.params);
      // }

      // if (config.data) {
      //   console.log('➡️ BODY:', config.data);
      // }

      // console.log('============================\n');

      return config;
    } catch (error) {
      console.log('❌ REQUEST INTERCEPTOR ERROR:', error);

      return Promise.reject(error);
    }
  },
  error => {
    console.log('❌ REQUEST ERROR:', error);

    return Promise.reject(error);
  },
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
apiClient.interceptors.response.use(
  response => {
    // ✅ SUCCESS LOGS
    // console.log('\n✅ API SUCCESS');
    // console.log(
    //   '⬅️ URL:',
    //   `${response.config.baseURL || ''}${response.config.url || ''}`,
    // );
    // console.log('⬅️ STATUS:', response.status);
    // console.log('⬅️ RESPONSE:', response.data);
    // console.log('============================\n');

    return response;
  },

  async error => {
    const status = error?.response?.status;

    // ❌ ERROR LOGS
    console.log('\n❌ API ERROR');
    console.log(
      '➡️ URL:',
      `${error?.config?.baseURL || ''}${error?.config?.url || ''}`,
    );
    console.log('➡️ METHOD:', error?.config?.method?.toUpperCase() || '');
    console.log('➡️ STATUS:', status || 'NO_STATUS');

    if (error?.config?.params) {
      console.log('➡️ PARAMS:', error.config.params);
    }

    if (error?.config?.data) {
      console.log('➡️ BODY:', error.config.data);
    }

    console.log(
      '➡️ RESPONSE:',
      error?.response?.data || error?.message || 'Unknown Error',
    );

    console.log('============================\n');

    // ===============================
    // HANDLE 401 LOGOUT
    // ===============================
    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      try {
        const store = getStore();
        const state = store.getState();

        const token = state?.auth?.data?.userData?.access_token;

        // optional backend logout
        if (token) {
          try {
            await logoutCurrentSession(token);
          } catch (e) {
            console.log('⚠️ logout API failed (ignored):', e);
          }
        }

        // clear redux
        await store.dispatch(logoutUser());

        // reset navigation
        NavigationService.reset([{ name: 'auth' }]);
      } catch (e) {
        console.log('❌ Logout Error:', e);
      } finally {
        isLoggingOut = false;
      }
    }

    return Promise.reject(
      error?.response?.data || {
        message: error?.message || 'Network Error',
      },
    );
  },
);

export default apiClient;
