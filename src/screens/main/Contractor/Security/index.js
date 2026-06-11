import React, { useEffect, useState } from 'react';
import Design from './Design';
import { useDispatch, useSelector } from 'react-redux';
import ActiveSessionsCard from '../../../../components/Contractor/ActiveSessionsCard';
import PreviousSessionsCard from '../../../../components/Contractor/PreviousSessionsCard';
import {
  getSessionsGrouped,
  hasInternet,
  logoutCurrentSession,
} from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import { getAllSessionssData } from '../../../../redux/actions/contractorActions';
import {
  logoutUser,
  revokeOtherSessions,
  updateUser,
} from '../../../../redux/actions/authActions';
import { CommonActions } from '@react-navigation/native';
const Security = ({ navigation }) => {
  const isLoading = useSelector(state => state.contractor.isLoading);
  const isAuthLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const sessionsData = useSelector(
    state => state.contractor?.data?.allSessions,
  );
  const { activeSessions, previousSessions } = getSessionsGrouped(
    sessionsData ?? [],
  );
  const userID = userData?.user.id;
  const [setupAuthentication, setSetupAuthentication] = useState(false);

  useEffect(() => {
    getAllSessions();
  }, []);
  const getAllSessions = async () => {
    const isConnected = await hasInternet();
    if (!isConnected) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      const getSessions = await dispatch(getAllSessionssData(userID));
      // console.log('getSessions', getSessions);
    } catch (error) {
      console.log('error in getAllSessions', error);
      showToast('error', error.message);
      if (error.message === 'Session is invalid or revoked. Login again') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'auth' }],
          }),
        );
        setTimeout(() => {
          dispatch(logoutUser());
        }, 1000);
      }
    }
  };

  const renderActiveSessions = ({ item, index }) => {
    return <ActiveSessionsCard item={item} index={index} />;
  };
  const renderPreviousSessions = ({ item, index }) => {
    return <PreviousSessionsCard item={item} index={index} />;
  };
  const handleRevokeOtherSessoions = async () => {
    const isConnected = await hasInternet();
    if (!isConnected) {
      showToast('info', 'No Internet Connection');
      return;
    }
    try {
      // const logoutCurrent = await logoutCurrentSession(token);
      // console.log(logoutCurrent);
      const revokeOtherSessionsResponse = await dispatch(
        revokeOtherSessions(userID),
      );

      if (revokeOtherSessionsResponse.status === 200) {
        showToast('success', 'All Other Sessions Singed Out Successfully');
        getAllSessions();
        // setTimeout(() => {
        //   handleLogout();
        // }, 2000);
      }
    } catch (error) {
      console.log('error in getAllSessions', error);
      showToast('error', error.message);
    }
  };
  // const handleRevokeSingleSessoion = async () => {
  //   const isConnected = await hasInternet();
  //   if (!isConnected) {
  //     showToast('info', 'No Internet Connection');
  //     return;
  //   }
  //   try {
  //     const revokeAllSessionsResponse = await dispatch(
  //       revokeSingleSession(token, userID),
  //     );

  //     if (revokeAllSessionsResponse.status === 200) {
  //       showToast('success', 'All Sessions Singed Out Successfully');
  //       setTimeout(() => {
  //         handleLogout();
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.log('error in getAllSessions', error);
  //     showToast('error', error.message);
  //   }
  // };

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'auth' }],
      }),
    );
    showToast('success', 'Logout Successfully');
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };

  const toggleMfaSetup = async () => {
    const internetStatus = await hasInternet();

    const token = userData?.access_token;
    const userID = userData?.user?.id;

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    setSetupAuthentication(true);
    try {
      const updateUserBody = {
        id: userID,
        mfaEnabled: false,
      };
      const updateUserResponse = await dispatch(updateUser(updateUserBody));
      if (updateUserResponse) {
        showToast('success', 'MFA Disable Successfully');
      }
    } catch (error) {
      console.log(error);
      showToast('error', error.message);
    } finally {
      setSetupAuthentication(false);
    }
  };
  return (
    <Design
      navigation={navigation}
      userData={userData}
      isLoading={isLoading}
      setupAuthentication={setupAuthentication}
      setSetupAuthentication={setSetupAuthentication}
      activeSessions={activeSessions}
      previousSessions={previousSessions}
      renderActiveSessions={renderActiveSessions}
      renderPreviousSessions={renderPreviousSessions}
      handleRevokeOtherSessoions={handleRevokeOtherSessoions}
      isAuthLoading={isAuthLoading}
      toggleMfaSetup={toggleMfaSetup}
    />
  );
};

export default Security;
