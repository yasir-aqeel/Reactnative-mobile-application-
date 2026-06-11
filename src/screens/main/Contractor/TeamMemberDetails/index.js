import React, { useState } from 'react';
import Design from './Design';
import StatusCard from '../../../../components/Contractor/StatusCard';
import { View } from 'react-native';
import { dashboardData, filterStatus } from '../../../../helpers/Data';
import MemberJobCard from '../../../../components/Contractor/MemberJobCard';
import styles from './style';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
const TeamMemberDetails = ({ navigation }) => {
  const { activeModal, openModal, closeModal } = useModalManager();
  const memberJobs = dashboardData.memberJobs;
  const [statusFilter, setStatusFilter] = useState(filterStatus[0].value);
  const filterMemberJobs =
    statusFilter === 'all'
      ? memberJobs
      : memberJobs.filter(job => job.status === statusFilter);
  const [showMemeberDetails, setShowMemberDetails] = useState(true);
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
  const renderDashboardData = ({ item }) => {
    return (
      <View style={styles.actionCard}>
        <MemberJobCard item={item} showJobId={true} navigation={navigation} />
      </View>
    );
  };

  return (
    <Design
      navigation={navigation}
      showMemeberDetails={showMemeberDetails}
      setShowMemberDetails={setShowMemberDetails}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      renderStatus={renderStatus}
      filterMemberJobs={filterMemberJobs}
      renderDashboardData={renderDashboardData}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default TeamMemberDetails;
