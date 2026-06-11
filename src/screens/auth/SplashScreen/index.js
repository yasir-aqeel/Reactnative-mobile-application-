import React, { useEffect } from 'react';

import Design from './Design';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllLoading } from '../../../redux/actions/authActions';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state?.auth?.data?.userData);

  useEffect(() => {
    dispatch(resetAllLoading());

    const timer = setTimeout(() => {
      getAppInfo();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getAppInfo = () => {
    const isOnBoard = userData?.user?.isOnboardingComplete;

    if (userData && !isOnBoard) {
      navigation.navigate('auth', {
        screen: 'onBoarding',
        params: { screenName: 'splash' },
      });

      return;
    }

    if (userData && isOnBoard) {
      navigation.navigate('Contractor');
      return;
    }
  };

  const onClickNewAccount = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'auth',
          state: {
            routes: [{ name: 'signUp' }],
          },
        },
      ],
    });
  };

  const onClickLogin = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'auth',
          state: {
            routes: [{ name: 'login' }],
          },
        },
      ],
    });
  };

  return (
    <Design
      navigation={navigation}
      onClickNewAccount={onClickNewAccount}
      onClickLogin={onClickLogin}
      userData={userData}
    />
  );
};

export default SplashScreen;
