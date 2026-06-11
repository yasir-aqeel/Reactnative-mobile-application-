import { useEffect, useRef, useCallback } from 'react';
import { AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStore } from '../redux/store';
import { logoutUser } from '../redux/actions/authActions';
import {
  getTokenRemainingTime,
  logoutCurrentSession,
} from '../helpers/services';
import { showToast } from '../helpers/ToastConfig';
import NavigationService from './NavigationService';
const BUFFER_TIME = 60;
export const useAuthWatcher = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.auth?.data?.userData);
  const token = userData?.access_token;
  const logoutTimer = useRef(null);
  const isLoggingOut = useRef(false);
  const isChecking = useRef(false);
  const appState = useRef(AppState.currentState);

  const clearTimer = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  }, []);

  const forceLogout = useCallback(
    async currentToken => {
      if (isLoggingOut.current) {
        return;
      }

      isLoggingOut.current = true;

      clearTimer();

      try {
        // reset navigation FIRST
        NavigationService.reset([{ name: 'auth' }]);

        // small delay so protected screens unmount
        await new Promise(resolve => setTimeout(resolve, 100));

        // logout api
        if (currentToken) {
          await logoutCurrentSession(currentToken);
        }
      } catch (e) {
        console.log('logout API failed:', e);
      }

      try {
        // clear redux/persist
        await dispatch(logoutUser());

        showToast('info', 'Session Expired! Please Login again');
      } catch (e) {
        console.log('Force logout error:', e);
      } finally {
        isLoggingOut.current = false;
      }
    },
    [dispatch, clearTimer],
  );

  const checkToken = useCallback(async () => {
    if (isChecking.current || isLoggingOut.current) {
      return;
    }

    isChecking.current = true;

    try {
      const store = getStore();

      if (!store) {
        return;
      }

      const state = store.getState();

      // wait for redux persist
      if (!state?._persist?.rehydrated) {
        return;
      }

      const currentToken = state?.auth?.data?.userData?.access_token;

      // no token
      if (!currentToken) {
        clearTimer();
        return;
      }

      const remaining = getTokenRemainingTime(currentToken);

      // token expired
      if (!remaining || remaining <= 0) {
        await forceLogout(currentToken);
        return;
      }

      clearTimer();

      // buffer before expiry
      const safeTime = Math.max(remaining - BUFFER_TIME, 0);

      logoutTimer.current = setTimeout(() => {
        forceLogout(currentToken);
      }, safeTime * 1000);
    } catch (e) {
      console.log('Auth watcher error:', e);
    } finally {
      isChecking.current = false;
    }
  }, [forceLogout, clearTimer]);

  // watch token changes
  useEffect(() => {
    if (token) {
      checkToken();
    } else {
      clearTimer();
    }

    return () => {
      clearTimer();
    };
  }, [token, checkToken, clearTimer]);

  // app foreground/background listener
  useEffect(() => {
    const sub = AppState.addEventListener('change', nextState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        checkToken();
      }

      appState.current = nextState;
    });

    return () => {
      sub.remove();
    };
  }, [checkToken]);
};
