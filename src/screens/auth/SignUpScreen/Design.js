import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppColor from '../../../helpers/AppColor';
import { images } from '../../../assets/images';
import { PopinsFont } from '../../../helpers/Fonts';
import Button from '../../../components/Button';
import styles from './style';
import { validatePasswordStrength } from '../../../helpers/PasswordValidation';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { CloseEye, EyeIcon } from '../../../assets/svg';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import AuthHeader from '../../../components/AuthHeader';

const Design = props => {
  return (
    <View style={styles.Container}>
      <ImageBackground
        resizeMode="cover"
        source={images.backImageAuth}
        style={styles.fullImage}
      >
        <AuthHeader
          onPress={() => props.navigation.navigate('splash')}
          title={'Create New Account'}
        />

        <KeyboardAvoidingView
          pointerEvents={props.isLoading ? 'none' : 'auto'}
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
                <Text style={styles.welcomeText}>
                  Sign in or register as new account to grow your business.
                </Text>
              </View>
              <View style={styles.mainView}>
                <View style={styles.emailContainer}>
                  <Text style={styles.text}>Full Name</Text>
                  <TextInput
                    value={props.name}
                    placeholder="i.e. davisjohn"
                    style={styles.emailInput}
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setName(text);
                      props.handleName(text);
                    }}
                    cursorColor={AppColor.primaryBlue}
                    autoCapitalize="words"
                  />
                </View>
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
                <Text style={styles.text}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    value={props.password}
                    style={styles.passwordInput}
                    secureTextEntry={!props.isPasswordVisible}
                    placeholder="********"
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setPassword(text);

                      const result = validatePasswordStrength(text);
                      props.setPasswordErrors(result.errors);
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />

                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() =>
                      props.setPasswordVisibility(!props.isPasswordVisible)
                    }
                  >
                    {props.isPasswordVisible ? (
                      <EyeIcon
                        style={{ height: 20, width: 20 }}
                        fill={'#2A2A2A'}
                      />
                    ) : (
                      <CloseEye
                        style={{ height: 22, width: 22 }}
                        fill={'#2A2A2A'}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ paddingBottom: 8 }}>
                  {props.passwordErrors.length > 0 && (
                    <View>
                      {props.passwordErrors.map((err, index) => (
                        <Text key={index} style={styles.passwordHint}>
                          • {err}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.orText}>Or sign in with</Text>
            </KeyboardAwareScrollView>

            <View style={styles.bottomView}>
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
            </View>
          </ScrollView>
          <Button
            text={props.isLoading ? '' : 'Continue'}
            color={props.isLoading ? 'transparent' : '#FFF'}
            width={'90%'}
            height={44}
            fontSize={18}
            borderRadius={12}
            fontFamily={PopinsFont.medium}
            marginVertical={10}
            backgroundColor={AppColor.primaryBlue}
            onPress={props.handleSignup}
            rightIcon={
              props.isLoading ? (
                <ActivityIndicator size="small" color={AppColor.white} />
              ) : null
            }
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default Design;
