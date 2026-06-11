import React, { useState } from 'react';
import Design from './Design';
import { logoutUser } from '../../../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../../helpers/ToastConfig';
import {
  hasInternet,
  logoutCurrentSession,
} from '../../../../helpers/services';
import NavigationService from '../../../../helpers/NavigationService';

import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
import { updateNotificationsPreferences } from '../../../../redux/actions/contractorActions';
const Settings = ({ navigation }) => {
  const { activeModal, openModal, closeModal, state, setState } =
    useModalManager();
  const userData = useSelector(state => state.auth.data.userData);
  const dispatch = useDispatch();
  const notificationsPreferences = useSelector(
    state => state.contractor?.data?.notificationsPreferences?.preferences,
  );

  const isNotificationsEnabled = notificationsPreferences?.every(
    item => !item.isMuted,
  );

  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    NavigationService.reset([{ name: 'auth' }]);
    await logoutCurrentSession();
    showToast('success', 'Logout Successfully');
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };
  const handleOpenVerifiedModal = () => {
    openModal('identity_verification_modal', {
      title: `Get verified on Fixrli`,
      description:
        'Complete a quick Stripe Identity check so you can post, fund, and request payments above $2,500.',
    });
  };
  const handleToggleAllNotifications = async value => {
    const isConnected = await hasInternet();

    if (!isConnected) {
      showToast('info', 'Internet No Connected');
      return;
    }
    setLoading(true);
    try {
      const requests = notificationsPreferences.map(item => {
        const body = {
          type: item.type,
          push: value,
          email: value,
          sms: value,
          isMuted: !value,
        };
        return dispatch(updateNotificationsPreferences(body));
      });

      await Promise.all(requests);
    } catch (error) {
      console.log('toggle all error', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Design
      navigation={navigation}
      userData={userData}
      handleLogout={handleLogout}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
      state={state}
      setState={setState}
      handleOpenVerifiedModal={handleOpenVerifiedModal}
      isNotificationsEnabled={isNotificationsEnabled}
      handleToggleAllNotifications={handleToggleAllNotifications}
      loading={loading}
    />
  );
};

export default Settings;
