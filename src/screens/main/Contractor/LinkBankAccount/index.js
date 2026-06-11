import React, { useState } from 'react';
import Design from './Design';
import StatusCard from '../../../../components/Contractor/StatusCard';
import { View } from 'react-native';
import { dashboardData } from '../../../../helpers/Data';
import TransactionsCard from '../../../../components/Contractor/TransactionsCard/TransactionsCard';
import { useModalManager } from '../../../../components/Contractor/JobsActionModals/useModalManager';
const LinkBankAccount = ({ navigation }) => {
  const { activeModal, openModal, closeModal } = useModalManager();
  const topScreens = [
    {
      name: 'ABC BANK',
      id: 'abc_bank',

      isSelected: true,
    },
    {
      name: 'XYZ BANK',
      id: 'xyz_bank',

      isSelected: false,
    },
  ];
  const status = [
    { label: 'All', value: 'all' },
    { label: 'New', value: 'NEW' },

    { label: 'Completed', value: 'COMPLETED' },
  ];
  const [statusFilter, setStatusFilter] = useState(status[0].value);
  const [selectedBank, setSelectedBank] = useState(topScreens[0].id);
  const transactionData = dashboardData.transactions;
  const filterTransactions =
    statusFilter === 'all'
      ? transactionData
      : transactionData.filter(
          transaction => transaction.status === statusFilter,
        );
  const handleSelectBank = id => {
    setSelectedBank(id);
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
  const renderTransactions = ({ item, index }) => {
    return <TransactionsCard item={item} index={index} />;
  };
  return (
    <Design
      navigation={navigation}
      topScreens={topScreens}
      selectedBank={selectedBank}
      handleSelectBank={handleSelectBank}
      status={status}
      renderStatus={renderStatus}
      filterTransactions={filterTransactions}
      statusFilter={statusFilter}
      renderTransactions={renderTransactions}
      activeModal={activeModal}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default LinkBankAccount;
