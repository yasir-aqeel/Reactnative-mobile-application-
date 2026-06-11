import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import AppColor from '../../helpers/AppColor';
import { PopinsFont } from '../../helpers/Fonts';

const StatusCard = ({ item, statusFilter, setStatusFilter }) => {
  const isActive = statusFilter === item.value;

  return (
    <TouchableOpacity
      onPress={() => setStatusFilter(item.value)}
      style={{
        backgroundColor: isActive ? '#F1F1F1' : '#FFFFFF',
        borderWidth: isActive ? 0 : 1,
        borderColor: isActive ? '#F1F1F1' : '#E1E1E1',
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.xxs,
        borderRadius: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: Spacing.xl4,
      }}
    >
      <Text
        style={{
          fontSize: FontSizes.s,
          color: isActive ? AppColor.textColor : '#6A6A6A',
          fontFamily: PopinsFont.regular,
          lineHeight: Spacing.l,
        }}
      >
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};
export default StatusCard;
