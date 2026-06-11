import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import CustomSwitch from '../CustomSwitch';
import AppColor from '../../helpers/AppColor';

const OPTION_TYPES = ['push', 'email', 'sms'];

const TITLES = {
  JOB_ALERT: 'Job Alerts',
  PLATFORM_UPDATE: 'Platform Updates',
  FINANCE_BILLING: 'Finance & Billing',
  MESSAGES: 'Messages',
  REVIEW_UPDATE: 'Review Updates',
};

const HELPERS = {
  JOB_ALERT: 'Receive alerts about new jobs and opportunities.',
  PLATFORM_UPDATE: 'Stay informed about platform changes and updates.',
  FINANCE_BILLING: 'Get notified about billing and payment activity.',
  MESSAGES: 'Receive notifications for new messages and chats.',
  REVIEW_UPDATE: 'Get updates when reviews or ratings change.',
};

const NotificationSettingsCard = ({
  item,
  index,
  data,
  onToggle,
  loadingType,
}) => {
  const isLast = index === data.length - 1;
  return (
    <View style={[styles.card, { marginBottom: isLast ? 0 : 8 }]}>
      <Text style={styles.textName}>{TITLES[item.type]}</Text>
      <Text style={styles.textHelp}>{HELPERS[item.type]}</Text>
      <View style={styles.row}>
        {OPTION_TYPES.map(type => {
          const currentKey = `${item.type}_${type}`;
          return (
            <View key={type} style={{ alignItems: 'center' }}>
              {loadingType === currentKey ? (
                <View style={{ width: 88, height: 24 }}>
                  <ActivityIndicator size="small" color={AppColor.textDark} />
                </View>
              ) : (
                <CustomSwitch
                  value={item[type]}
                  onValueChange={() => onToggle(item, type)}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  labelStyle={styles.keyName}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default NotificationSettingsCard;

const styles = StyleSheet.create({
  textHelp: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    textAlign: 'left',
    marginBottom: 8,
  },

  textName: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Spacing.s,
    padding: Spacing.s,
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  keyName: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    marginLeft: 5,
  },
});
