import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AppColor from '../../helpers/AppColor';
import { PopinsFont } from '../../helpers/Fonts';
import moment from 'moment';
import { Spacing } from '../../helpers/sizeHelper';
import {
  ActiveBids,
  FinanceIcon,
  JobsIcon,
  MessageIcon,
  RejectIcon,
} from '../../assets/svg';

const NotificationCard = ({ item, markNotificationRead }) => {
  const IconBox = ({ type }) => {
    const getIcon = () => {
      switch (type) {
        case 'BID':
          return (
            <View style={[styles.icon, styles.bid]}>
              <ActiveBids style={styles.iconStyle} fill={'#007FAE'} />
            </View>
          );

        case 'JOB_UPDATE':
        case 'JOB_STARTED':
        case 'JOB_COMPLETED':
        case 'JOB_RESUMED':
          return (
            <View style={[styles.icon, styles.job]}>
              <JobsIcon style={styles.iconStyle} fill={'#31986A'} />
            </View>
          );

        case 'JOB_PAUSED':
        case 'JOB_CANCELLED':
        case 'CANCELLATION_APPROVED':
        case 'CANCELLATION_REJECTED':
        case 'PAYMENT_CANCELED':
        case 'CHANGE_ORDER_REJECTED':
          return (
            <View style={[styles.icon, styles.pause]}>
              <RejectIcon style={styles.iconStyle} fill={'#FF383C'} />
            </View>
          );

        case 'PAYMENT_RELEASED':
        case 'PAYMENT_AUTHORIZED':
        case 'PAYMENT_CAPTURED':
        case 'PAYMENT_REQUESTED':
        case 'DOWN_PAYMENT_RELEASE':
        case 'DOWN_PAYMENT_CONFIRMATION':
          return (
            <View style={[styles.icon, styles.payment]}>
              <FinanceIcon style={styles.iconStyle} fill={'#6A6A6A'} />
            </View>
          );

        case 'CHANGE_ORDER_REQUESTED':
        case 'CHANGE_ORDER_APPROVED':
        case 'GENERAL':
        case 'SYSTEM':
        default:
          return (
            <View style={[styles.icon, styles.message]}>
              <MessageIcon style={styles.iconStyle} fill={'#6A6A6A'} />
            </View>
          );
      }
    };

    return <View style={styles.iconWrapper}>{getIcon()}</View>;
  };

  return (
    <TouchableOpacity
      onPress={() => markNotificationRead(item)}
      style={{
        backgroundColor: !item.isRead ? '#F7F7F7' : AppColor.white,
        paddingVertical: Spacing.xs,
        paddingHorizontal: Spacing.l,
        borderRadius: 10,
        marginVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          width: '100%',
        }}
      >
        <View
          style={{
            width: '10%',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconBox type={item.type} />
        </View>
        <View style={{ width: '80%' }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: PopinsFont.regular,
              color: !item.isRead ? AppColor.textDark : AppColor.textLight1,
            }}
          >
            {item.message}
          </Text>
        </View>

        {/* <Text
          style={{
            color: AppColor.black,
            fontSize: 14,
            fontFamily: !item.isRead ? PopinsFont.medium : PopinsFont.regular,
            textAlign: 'left',
          }}
        >
          {item.title}
        </Text> */}

        {/* <Text
          style={{
            textAlign: 'right',
            color: AppColor.black,
            fontSize: 12,
            fontFamily: !item.isRead ? PopinsFont.medium : PopinsFont.regular,
          }}
        >
          {moment(item.createdAt).fromNow()}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // COLORS BASED ON TYPE
  bid: {
    backgroundColor: '#E6F6FC',
    borderColor: '#CCECF7',
    borderWidth: 1,
  },
  job: {
    backgroundColor: '#ECF9F3',
    borderColor: '#B2E5CE',
    borderWidth: 1,
  },
  message: {
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  payment: {
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  pause: {
    backgroundColor: '#FFECEC',
    borderColor: '#FFD7D8',
    borderWidth: 1,
  },
  iconStyle: { height: 22, width: 22 },
});
