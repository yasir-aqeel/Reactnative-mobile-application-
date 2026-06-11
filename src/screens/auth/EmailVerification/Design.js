import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
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
          onPress={() => props.navigation.navigate('login')}
          title={'Verify Email'}
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
                <Text style={styles.text}>
                  {`We have already sent and email to ${props.maskedEmail}. If the email is correct and verify by our system then you’ll get the on-time password.`}
                </Text>
              </View>
              <View style={styles.otpView}>
                <View style={styles.otpContainer}>
                  <CustomOTPInput
                    length={5}
                    onChange={code => {
                      props.setOtp(code);
                    }}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>

          <Button
            text={props.isLoading ? '' : 'Verify Email'}
            color={props.isLoading ? 'transparent' : AppColor.white}
            width={'90%'}
            height={44}
            fontSize={16}
            borderRadius={12}
            fontFamily={PopinsFont.medium}
            marginVertical={10}
            backgroundColor={AppColor.primaryBlue}
            onPress={props.handleSubmit}
            rightIcon={
              props.isLoading ? (
                <ActivityIndicator size={'small'} color={AppColor.white} />
              ) : null
            }
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default Design;
