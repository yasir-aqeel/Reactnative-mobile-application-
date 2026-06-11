import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './style';
import Button from '../../../components/Button';
import { images } from '../../../assets/images';
import AuthHeader from '../../../components/AuthHeader';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from '@d11/react-native-fast-image';
import AppColor from '../../../helpers/AppColor';

const Design = props => {
  const isLoading =
    props.isLoading || props.isGoogleLoading || props.isAppleLoading;
  return (
    <View style={styles.Container}>
      <ImageBackground
        resizeMode="cover"
        source={images.backAuth}
        style={styles.fullImage}
      >
        <AuthHeader onPress={() => props.navigation.navigate('login')} />

        <KeyboardAvoidingView
          pointerEvents={isLoading ? 'none' : 'auto'}
          style={styles.Container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <KeyboardAwareScrollView>
              <View style={styles.centerView}>
                <FastImage
                  source={images.fixrliGif}
                  style={styles.fixerliImage}
                  resizeMode={FastImage.resizeMode.contain}
                />

                <Text style={styles.welcomeText}>Login via OTP</Text>
              </View>
              <View style={styles.mainView}>
                <View style={styles.emailContainer}>
                  <Text style={styles.text}>Email Address</Text>
                  <TextInput
                    value={props.email}
                    placeholder="i.e. davisjohn@example.com"
                    style={styles.emailInput}
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setEmail(text);
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />
                </View>

                <Button
                  text={'Having trouble logging in?'}
                  textDecorationLine={'underline'}
                  fontFamily={PopinsFont.regular}
                  fontSize={14}
                  color={'#2A2A2A'}
                  onPress={() => props.navigation.navigate('forgetPassword')}
                />

                <Button
                  text={props.isLoading ? '' : 'Continue'}
                  color={props.isLoading ? 'transparent' : AppColor.white}
                  width={'100%'}
                  height={44}
                  fontSize={FontSizes.m}
                  borderRadius={Spacing.s}
                  fontFamily={PopinsFont.medium}
                  marginTop={10}
                  backgroundColor={'#009FD9'}
                  onPress={props.handleLoginViaOtp}
                  lineHeight={Spacing.xl}
                  rightIcon={
                    props.isLoading ? (
                      <ActivityIndicator size="small" color={AppColor.white} />
                    ) : null
                  }
                />
              </View>
              <Text style={styles.orText}>Or sign in with</Text>
            </KeyboardAwareScrollView>

            <View style={styles.bottomView}>
              <Button
                borderWidth={1}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                width={'90%'}
                height={44}
                color={'#2A2A2A'}
                text={'Login via Password'}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.m}
                borderRadius={Spacing.s}
                onPress={() => props.navigation.goBack()}
                lineHeight={Spacing.xl}
              />
              <Button
                borderWidth={1}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                width={'90%'}
                height={Spacing.xl6}
                color={props.isGoogleLoading ? 'transparent' : '#2A2A2A'}
                text={props.isGoogleLoading ? '' : 'Sign in with Google'}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.m}
                leftIcon={
                  props.isGoogleLoading ? (
                    <ActivityIndicator size="small" color={'#2A2A2A'} />
                  ) : (
                    <Image source={images.google} style={styles.icon} />
                  )
                }
                borderRadius={Spacing.s}
                iconSpacing={props.isGoogleLoading ? 0 : 15}
                onPress={() => props.handleSocialLogin('google')}
                lineHeight={Spacing.xl}
              />
              {Platform.OS === 'ios' && (
                <Button
                  borderWidth={1}
                  backgroundColor={'#F7F7F7'}
                  borderColor={'#E1E1E1'}
                  width={'90%'}
                  height={Spacing.xl6}
                  color={props.isAppleLoading ? 'transparent' : '#2A2A2A'}
                  text={props.isAppleLoading ? '' : 'Sign in with Apple'}
                  fontFamily={PopinsFont.medium}
                  fontSize={FontSizes.m}
                  leftIcon={
                    props.isAppleLoading ? (
                      <ActivityIndicator size="small" color={'#2A2A2A'} />
                    ) : (
                      <Image source={images.apple} style={styles.icon} />
                    )
                  }
                  borderRadius={Spacing.s}
                  iconSpacing={15}
                  onPress={() => props.handleSocialLogin('apple')}
                  lineHeight={Spacing.xl}
                />
              )}
            </View>
            <View style={styles.bottomView1}>
              <View style={styles.bottomView2}>
                <Text style={styles.text1}>
                  By continuing, you agree to our
                </Text>
                <TouchableOpacity disabled>
                  <Text
                    style={styles.touchText}
                  >{` Terms and Conditions`}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity disabled>
                <Text style={styles.touchText}>{`and Privacy Policy.`}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default Design;
