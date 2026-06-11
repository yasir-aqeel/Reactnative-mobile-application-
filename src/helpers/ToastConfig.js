import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import AppColor from './AppColor';
import { PopinsFont } from './Fonts';

const renderMessage = message => {
  if (Array.isArray(message)) {
    return message.map((msg, index) => (
      <Text key={index} style={styles.text2}>
        • {msg}
      </Text>
    ));
  }

  return <Text style={styles.text2}>{message}</Text>;
};
export const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.success]}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 ? renderMessage(text2) : null}
    </View>
  ),

  error: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.error]}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 ? renderMessage(text2) : null}
    </View>
  ),

  info: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.info]}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 ? renderMessage(text2) : null}
    </View>
  ),
};

/* ---------- Show Toast ---------- */
export const showToast = (type, message) => {
  const formattedType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

  Toast.show({
    type,
    text1: formattedType, // Success | Error | Info
    text2: message,
    visibilityTime: 3000,
    position: 'top',
    topOffset: 65,
  });
};

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    elevation: 9999,
    zIndex: 9999,
    alignSelf: 'center',
  },

  success: {
    backgroundColor: AppColor.greenLightBack,
    borderLeftWidth: 5,
    borderLeftColor: AppColor.green1,
  },

  error: {
    backgroundColor: '#f8d7da',
    borderLeftWidth: 5,
    borderLeftColor: AppColor.redDark,
  },

  info: {
    backgroundColor: AppColor.blueLightBack,
    borderLeftWidth: 5,
    borderLeftColor: AppColor.primaryBlue,
  },

  text1: {
    fontSize: 16,
    fontFamily: PopinsFont.bold,
    color: AppColor.textDark,
    textAlign: 'left',
  },

  text2: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: PopinsFont.semiBold,
    color: AppColor.textDark,
    textAlign: 'left',
  },
});
