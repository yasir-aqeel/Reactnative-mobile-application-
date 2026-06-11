import React, { useState } from 'react';
import Design from './Design';
import StatusCard from '../../../../components/Contractor/StatusCard';
import { View } from 'react-native';

const Subscription = ({ navigation }) => {
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
  return (
    <Design
      navigation={navigation}
      topScreens={topScreens}
      selectedBank={selectedBank}
      handleSelectBank={handleSelectBank}
      status={status}
      renderStatus={renderStatus}
    />
  );
};

export default Subscription;
