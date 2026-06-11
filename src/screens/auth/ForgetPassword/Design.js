import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
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
          title={'Having trouble logging in?'}
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
                  Having trouble login don’t worry you can still login into your
                  account using verified email or phone number.
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
                  marginTop: 10,
                }}
              >
                <View style={styles.emailContainer}>
                  <Text
                    style={{
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontFamily: PopinsFont.regular,
                      fontSize: 14,
                      color: '#2A2A2A',
                      marginLeft: 5,
                    }}
                  >
                    Email Address or Phone Number
                  </Text>
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
              text={'Verify your Identity'}
              color={AppColor.white}
              width={'90%'}
              height={44}
              fontSize={16}
              borderRadius={12}
              fontFamily={PopinsFont.medium}
              marginVertical={30}
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
