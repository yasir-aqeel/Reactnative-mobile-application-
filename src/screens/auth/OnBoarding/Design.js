import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import styles from './style';
import Button from '../../../components/Button';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
import { images } from '../../../assets/images';
import AuthHeader from '../../../components/AuthHeader';
import RoleSelector from '../../../components/Contractor/SignupComponents/RoleSelector/RoleSelector';
import TermsConditions from '../../../components/Contractor/SignupComponents/TermsConditions/TermsConditions';
import PrivacyPolicy from '../../../components/Contractor/SignupComponents/PrivacyPolicy/PrivacyPolicy';
import BusinessInformation from '../../../components/Contractor/SignupComponents/BusinessInformation/BusinessInformation';
import BusinessLocation from '../../../components/Contractor/SignupComponents/BusinessLocation/BusinessLocation';

const Design = props => {
  const showTermsButtons = props.currentStep === 2 || props.currentStep === 3;
  return (
    <View style={styles.Container}>
      <ImageBackground
        resizeMode="cover"
        source={
          props.currentStep === 0 ? images.backAuth : images.backImageAuth
        }
        style={styles.fullImage}
      >
        <AuthHeader
          onPress={() => props.goBack()}
          title={
            props.currentStep === 1
              ? 'Tell us who are you?'
              : props.currentStep === 2
              ? 'Terms & Conditions'
              : props.currentStep === 3
              ? 'Privacy Policies'
              : props.currentStep === 4
              ? 'Business 🏬 Information'
              : 'Business 🗺️ Location'
          }
        />

        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
          }}
        >
          {props.renderSteps()}
        </View>

        <KeyboardAvoidingView
          pointerEvents={props.isLoading ? 'none' : 'auto'}
          style={styles.Container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {props.currentStep === 1 && <RoleSelector props={props} />}
          {props.currentStep === 2 && <TermsConditions props={props} />}
          {props.currentStep === 3 && <PrivacyPolicy props={props} />}
          {props.currentStep === 4 && <BusinessInformation props={props} />}
          {props.currentStep === 5 && <BusinessLocation props={props} />}

          <>
            {showTermsButtons ? (
              <View style={styles.buttonRow}>
                <Button
                  borderWidth={1}
                  backgroundColor={'#F7F7F7'}
                  borderColor={'#E1E1E1'}
                  width={'50%'}
                  height={44}
                  color={'#6A6A6A'}
                  text={'Decline'}
                  fontFamily={PopinsFont.medium}
                  fontSize={16}
                  borderRadius={12}
                  onPress={props.goBack}
                  marginVertical={10}
                />

                <Button
                  backgroundColor={'#009FD9'}
                  width={'50%'}
                  height={44}
                  color={props.isLoading ? 'transparent' : '#FFF'}
                  text={props.isLoading ? '' : 'Accept'}
                  fontFamily={PopinsFont.medium}
                  fontSize={16}
                  borderRadius={12}
                  onPress={props.handleStepAction}
                  marginVertical={10}
                  rightIcon={
                    props.isLoading ? (
                      <ActivityIndicator size="small" color={AppColor.white} />
                    ) : null
                  }
                />
              </View>
            ) : (
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
                onPress={props.handleStepAction}
                rightIcon={
                  props.isLoading ? (
                    <ActivityIndicator size="small" color={AppColor.white} />
                  ) : null
                }
              />
            )}
          </>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default Design;
