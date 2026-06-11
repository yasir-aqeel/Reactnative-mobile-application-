import { View } from 'react-native';
import React, { useState } from 'react';
import Design from './Design';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../../helpers/ToastConfig';
import styles from './style';
import TeamMemeberCard from '../../../../components/Contractor/TeamMemeberCard';
import { dashboardData } from '../../../../helpers/Data';
import StatusCard from '../../../../components/Contractor/StatusCard';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
const Teams = ({ navigation }) => {
  const { activeModal, openModal, closeModal } = useModalManager();
  const isLoading = useSelector(state => state.contractor.isLoading);
  const userData = useSelector(state => state.auth.data.userData);

  const status = [
    { label: 'All', value: 'all' },
    { label: 'Active Member', value: 'ACTIVE_MEMBER' },
    { label: 'others', value: 'OTHERS' },
  ];

  const [statusFilter, setStatusFilter] = useState(status[0].value);
  const memeberData = dashboardData.members;
  const membersFilter =
    statusFilter === 'all'
      ? memeberData
      : memeberData.filter(member => member.status === statusFilter);

  const renderDashboardData = ({ item }) => {
    return (
      <View style={styles.actionCard}>
        <TeamMemeberCard
          item={item}
          showJobId={false}
          navigation={navigation}
          openModal={openModal}
          closeModal={closeModal}
        />
      </View>
    );
  };
  const renderStatus = ({ item, index }) => {
    return (
      <View>
        <StatusCard
          item={item}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </View>
    );
  };
  return (
    <Design
      navigation={navigation}
      isLoading={isLoading}
      // refreshing={refreshing}
      // loadMore={loadMore}
      // onRefresh={onRefresh}

      membersFilter={membersFilter}
      renderDashboardData={renderDashboardData}
      status={status}
      setStatusFilter={setStatusFilter}
      statusFilter={statusFilter}
      renderStatus={renderStatus}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default Teams;
