import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Spacing, FontSizes } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
const TabsCard = ({ item, statusFilter, setStatusFilter }) => {
  const Icon = item.icon;
  const onSelectTab = value => {
    setStatusFilter(value);
  };

  return (
    <TouchableOpacity
      onPress={() => onSelectTab(item.value)}
      style={[
        styles.card,
        {
          backgroundColor:
            statusFilter === item.value ? item.activeColor : '#F7F7F7',
          borderColor:
            statusFilter === item.value ? item.activeBorderColor : '#E1E1E1',
        },
      ]}
    >
      <Icon
        style={{ height: 20, width: 20 }}
        fill={statusFilter === item.value ? item.color : '#2A2A2A'}
      />
      <View style={styles.row}>
        <View style={{ marginVertical: 5 }}>
          <Text
            style={[
              styles.title,
              {
                color:
                  statusFilter === item.value ? item.color : AppColor.textColor,
              },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.value,
              {
                color:
                  statusFilter === item.value ? AppColor.textColor : item.color,
                backgroundColor:
                  statusFilter === item.value
                    ? AppColor.white
                    : item.backgroundColor,
                borderWidth: statusFilter === item.value ? 0 : 1,
                borderColor: item.borderColor,
              },
            ]}
          >
            {item?.count ?? 0} New
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TabsCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: Spacing.s,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    width: 130,
    height: 105,
  },
  row: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginTop: 15,
  },

  title: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.medium,
  },
  value: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.medium,
    textAlign: 'center',
    height: 22,
    width: 55,
    borderRadius: 24,
  },
});
