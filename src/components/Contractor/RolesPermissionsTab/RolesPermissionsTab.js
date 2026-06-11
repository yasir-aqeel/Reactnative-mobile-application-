import { Text, TouchableOpacity } from 'react-native';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import { CheckBox } from '../../../assets/svg';
import { useCallback, useMemo } from 'react';

const RolesPermissionsTab = ({
  item,
  selectedRoleForPermission,
  setSelectedRoleForPermission,
  setHasChanges,
  hasAnyPermission,
}) => {
  const isSelected = useMemo(() => {
    return selectedRoleForPermission.some(
      selected => selected.value === item.value,
    );
  }, [selectedRoleForPermission, item.value]);

  const handlePress = useCallback(() => {
    if (isSelected) {
      // Remove from list
      if (hasAnyPermission) {
        setHasChanges(true);
      }

      setSelectedRoleForPermission(prev =>
        prev.filter(selected => selected.value !== item.value),
      );
    } else {
      // Add to list
      setSelectedRoleForPermission(prev => [...prev, item]);
    }
  }, [isSelected, item, setSelectedRoleForPermission]);

  // Blue if resource has any permission OR is manually selected, otherwise gray
  const isActive = isSelected;
  const backgroundColor = isActive ? '#009FD9' : '#F7F7F7';
  const borderColor = isActive ? '#009FD9' : '#E1E1E1';
  const textColor = isActive ? '#FFF' : '#151515';
  const checkBoxFill = isActive ? '#FFF' : '#C3C3C3';

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor,
        borderWidth: 1,
        borderColor,
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.xxs,
        borderRadius: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: Spacing.xl5,
        flexDirection: 'row',
        gap: 5,
      }}
    >
      <CheckBox style={{ height: 20, width: 20 }} fill={checkBoxFill} />
      <Text
        style={{
          fontSize: FontSizes.s,
          color: textColor,
          fontFamily: PopinsFont.regular,
          lineHeight: Spacing.l,
        }}
      >
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};

export default RolesPermissionsTab;
