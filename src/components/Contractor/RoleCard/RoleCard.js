import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { DeleteIcon, PencilIcon } from '../../../assets/svg';
import { Spacing } from '../../../helpers/sizeHelper';
import styles from './style';
const RolesCard = ({
  item,
  index,
  selectedRoleId,
  setSelectedRoleId,
  openModal,
  fetchContractorRoles,
}) => {
  const handleSelectRole = role => {
    setSelectedRoleId(role.id);
  };
  const isSelected = selectedRoleId === item.id;
  const handleUpdateRole = () => {
    openModal('add_new_role_modal', {
      ...item,
      isUpdating: true,
    });
  };
  const handleDeleteRole = () => {
    openModal('delet_role_modal', {
      selectedRole: item,
      refreshAllRoles: fetchContractorRoles,
    });
  };

  return (
    <View style={styles.actionCard}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          justifyContent: 'space-between',
          alignSelf: 'center',
          backgroundColor: isSelected ? '#009FD9' : '#FFFFFF',
          paddingHorizontal: Spacing.s,
          paddingVertical: Spacing.ms,
          borderRadius: Spacing.s,
        }}
      >
        <TouchableOpacity
          onPress={() => handleSelectRole(item)}
          style={{ width: '60%' }}
        >
          <Text
            style={[
              styles.roleName,
              { color: isSelected ? '#FFFFFF' : '#2A2A2A' },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={[
              styles.countView,
              { backgroundColor: isSelected ? '#FFFFFF' : '#F1F1F1' },
            ]}
          >
            <Text style={styles.count}>{item._count.teamMembers}</Text>
          </View>

          <TouchableOpacity onPress={() => handleUpdateRole()}>
            <PencilIcon
              style={styles.icon}
              fill={isSelected ? '#FFFFFF' : '#2A2A2A'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteRole(item)}>
            <DeleteIcon
              style={styles.icon}
              fill={isSelected ? '#FFFFFF' : '#CC2D30'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RolesCard;
