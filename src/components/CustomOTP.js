import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AppColor from '../helpers/AppColor';
import { PopinsFont } from '../helpers/Fonts';

const CustomOTP = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  // ✅ Auto focus first input when component loads
  useEffect(() => {
    setTimeout(() => {
      inputs.current[0]?.focus();
    }, 200); // small delay helps on Android
  }, []);
  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    onChange && onChange(newOtp.join(''));

    // Move to next
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.input}
          autoFocus={index === 0} // 👈 ensures first focus
          cursorColor={AppColor.primaryBlue}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: AppColor.white,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  input: {
    width: 45,
    height: 52,
    // borderRadius: 10,
    backgroundColor: AppColor.white,
    textAlign: 'center',
    fontSize: 20,
    color: '#888888',
    fontFamily: PopinsFont.regular,
  },
});
export default CustomOTP;
