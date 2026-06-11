import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
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
import { images } from '../../../assets/images';
import AuthHeader from '../../../components/AuthHeader';
import { validatePasswordStrength } from '../../../helpers/PasswordValidation';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { CloseEye, EyeIcon } from '../../../assets/svg';
const Design = props => {
  return (
    <View style={styles.Container}>
      <ImageBackground
        resizeMode="cover"
        source={images.backImageAuth}
        style={styles.fullImage}
      >
        <AuthHeader
          title={'Change Password'}
          onPress={() => props.navigation.navigate('login')}
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
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontFamily: PopinsFont.regular,
                    fontSize: FontSizes.s,
                    color: '#2A2A2A',
                    marginLeft: 5,
                    lineHeight: Spacing.l,
                  }}
                >
                  Enter New Password
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    value={props.password}
                    style={styles.passwordInput}
                    secureTextEntry={!props.isPasswordVisible}
                    placeholder="Type New Password"
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setPassword(text);

                      const result = validatePasswordStrength(text);
                      props.setPasswordErrors(result.errors);

                      if (
                        props.confirmPassword &&
                        text !== props.confirmPassword
                      ) {
                        props.setConfirmPasswordError('Passwords do not match');
                      } else {
                        props.setConfirmPasswordError('');
                      }
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

                <Text style={styles.text}>Confirm New Passowrd</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    value={props.confirmPassword}
                    style={styles.passwordInput}
                    secureTextEntry={!props.isConfirmPasswordVisible}
                    placeholder="Re-Type New Password"
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setConfirmPassword(text);

                      if (props.password !== text) {
                        props.setConfirmPasswordError('Passwords do not match');
                      } else {
                        props.setConfirmPasswordError('');
                      }
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />

                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() =>
                      props.setConfirmPasswordVisibility(
                        !props.isConfirmPasswordVisible,
                      )
                    }
                  >
                    {props.isConfirmPasswordVisible ? (
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
                {props.passwordErrors.length > 0 && (
                  <View style={{ marginVertical: 8 }}>
                    {props.passwordErrors.map((err, index) => (
                      <Text key={index} style={styles.passwordHint}>
                        • {err}
                      </Text>
                    ))}
                  </View>
                )}
                {props.confirmPasswordError && (
                  <View style={{ marginVertical: 8 }}>
                    <Text style={[styles.passwordHint]}>
                      • {props.confirmPasswordError}
                    </Text>
                  </View>
                )}
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
          {props.isLoading ? (
            <View style={styles.loaderContainer}>
              <View style={styles.loaderButton}>
                <ActivityIndicator size="small" color={AppColor.white} />
              </View>
            </View>
          ) : (
            <Button
              text={'Change Password'}
              color={AppColor.white}
              width={'90%'}
              height={44}
              fontSize={16}
              borderRadius={12}
              fontFamily={PopinsFont.medium}
              marginVertical={10}
              backgroundColor={AppColor.primaryBlue}
              onPress={props.handleSubmit}
            />
          )}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default Design;
