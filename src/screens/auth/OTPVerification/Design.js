import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import Button from '../../../components/Button';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
import AuthHeader from '../../../components/AuthHeader';
import { images } from '../../../assets/images';
import CustomOTPInput from '../../../components/CustomOTP';
const Design = props => {
  return (
    <View style={styles.Container}>
      <ImageBackground
        resizeMode="cover"
        source={images.backImageAuth}
        style={styles.fullImage}
      >
        <AuthHeader
          onPress={() => props.navigation.navigate('loginViaOtp')}
          title={props.isPasswordChange ? 'Verify your Identity' : 'Verify OTP'}
        />

        <KeyboardAvoidingView
          pointerEvents={props.isLoading ? 'none' : 'auto'}
          style={[styles.Container]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <KeyboardAwareScrollView>
              <View style={styles.centerView}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#555555',
                    fontFamily: PopinsFont.regular,
                    fontSize: 14,
                  }}
                >
                  {`We have already sent and email to ${props.maskedEmail}. If the email is correct and verify by our system then you’ll get the on-time password.`}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  backgroundColor: '#F7F7F7',
                  borderColor: '#E1E1E1',
                  width: '90%',
                  alignSelf: 'center',
                  paddingTop: 12,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingBottom: 12,
                  borderRadius: 20,
                }}
              >
                <View style={styles.otpContainer}>
                  <CustomOTPInput
                    length={5}
                    onChange={code => {
                      props.setOtp(code);
                    }}
                  />
                </View>
                <Button
                  text={`${props.remainingSeconds + ' • Resend'}`}
                  color={AppColor.black}
                  width={'100%'}
                  height={44}
                  fontSize={14}
                  borderRadius={12}
                  fontFamily={PopinsFont.medium}
                  backgroundColor={'#F7F7F7'}
                  onPress={props.handleResendOTP}
                  marginTop={10}
                  disabled={props.isLoading}
                />
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
          {props.isPasswordChange && (
            <>
              {props.isLoading ? (
                <View style={styles.loaderContainer}>
                  <View style={styles.loaderButton}>
                    <ActivityIndicator size="small" color={AppColor.white} />
                  </View>
                </View>
              ) : (
                <Button
                  text={'Verify & Change Password'}
                  color={AppColor.white}
                  width={'90%'}
                  height={44}
                  fontSize={16}
                  borderRadius={12}
                  fontFamily={PopinsFont.medium}
                  backgroundColor={AppColor.primaryBlue}
                  onPress={props.handleSubmit}
                />
              )}
            </>
          )}

          {/* <Button
            text={'Verify & Login'}
            color={props.isPasswordChange ? '#6A6A6A' : AppColor.white}
            width={'90%'}
            height={44}
            fontSize={16}
            borderRadius={12}
            fontFamily={PopinsFont.medium}
            marginVertical={10}
            backgroundColor={
              props.isPasswordChange ? '#F7F7F7' : AppColor.primaryBlue
            }
            borderWidth={props.isPasswordChange ? 1 : 0}
            borderColor={
              props.isPasswordChange ? '#E1E1E1' : AppColor.primaryBlue
            }
            onPress={props.handleVerifyLogin}
          /> */}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default Design;
