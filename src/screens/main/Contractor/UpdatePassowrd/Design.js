import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import Button from '../../../../components/Button';
import { PopinsFont } from '../../../../helpers/Fonts';
import AppColor from '../../../../helpers/AppColor';
import { validatePasswordStrength } from '../../../../helpers/PasswordValidation';
import { CloseEye, EyeIcon } from '../../../../assets/svg';
import Header from '../../../../components/Header';
const Design = props => {
  return (
    <View style={styles.Container}>
      <View style={styles.fullImage}>
        <Header
          title={'Update Password'}
          navigation={props.navigation}
          showBackIcon
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
                <Text style={styles.heading}>
                  Your current password is weak and make sure you password.
                </Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.text}>Enter Current Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    value={props.currentPassword}
                    style={styles.passwordInput}
                    secureTextEntry={!props.isCurrenrtPasswordVisible}
                    placeholder="Current Password"
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setCurrentPassword(text);
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />

                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() =>
                      props.setCurrentPasswordVisibility(
                        !props.isCurrenrtPasswordVisible,
                      )
                    }
                  >
                    {props.isCurrenrtPasswordVisible ? (
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
                <Text style={styles.text}>Enter New Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    value={props.newPassword}
                    style={styles.passwordInput}
                    secureTextEntry={!props.isPasswordVisible}
                    placeholder="Type New Password"
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setNewPassword(text);

                      const result = validatePasswordStrength(text);
                      props.setPasswordErrors(result.errors);

                      if (
                        props.confirmPassword &&
                        text !== props.confirmPassword
                      ) {
                        props.setConfirmPasswordError(
                          'Confirm passwords dose not match with new password',
                        );
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

                      if (props.newPassword !== text) {
                        props.setConfirmPasswordError(
                          'Confirm passwords dose not match with new password',
                        );
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

          <Button
            text={props.isLoading ? '' : 'Update Password'}
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
                <ActivityIndicator size="small" color={AppColor.white} />
              ) : null
            }
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
export default Design;
