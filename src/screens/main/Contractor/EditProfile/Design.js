import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import { CheckBox, PencilIcon, Upload } from '../../../../assets/svg';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import FastImage from '@d11/react-native-fast-image';
import { images } from '../../../../assets/images';
import { roles } from '../../../../helpers/Data';
import AppColor from '../../../../helpers/AppColor';

const Design = props => {
  return (
    <View style={styles.container}>
      <Header
        showBackIcon
        title={'Edit Profile'}
        navigation={props.navigation}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={50}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.infoContainer}
          >
            <View style={styles.coverWrapper}>
              {props.coverUploading ? (
                <View
                  style={[
                    styles.coverImage,
                    {
                      backgroundColor: AppColor.primaryBlue,
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <ActivityIndicator
                    size="large"
                    color={AppColor.white}
                    style={{ marginBottom: 50 }}
                  />
                </View>
              ) : props.userData.user.coverPhoto ? (
                <Image
                  source={{ uri: props.userData.user.coverPhoto }}
                  style={styles.coverImage}
                  resizeMode="cover"
                />
              ) : (
                <FastImage
                  source={images.cover}
                  style={styles.coverImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}

              <View style={{ alignSelf: 'center' }}>
                <View style={styles.profileContainer}>
                  {props.isImageUploading ? (
                    <ActivityIndicator size="small" color={AppColor.white} />
                  ) : props.userData.user.avatar ? (
                    <Image
                      source={{ uri: props.userData.user.avatar }}
                      style={styles.profile}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.userName}>
                      {props?.firstName
                        ? props.firstName.charAt(0).toUpperCase()
                        : '?'}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.buttonView}>
              <Button
                text={'Change Profile'}
                onPress={() => props.onPickProfile()}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                borderRadius={Spacing.s}
                width={'45%'}
                color={'#404040'}
                leftIcon={<PencilIcon style={styles.sideIcon} />}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                height={Spacing.xl6}
              />
              <Button
                text={'Upload cover'}
                onPress={() => props.onPickCover()}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                borderRadius={Spacing.s}
                width={'45%'}
                color={'#404040'}
                leftIcon={<Upload style={styles.sideIcon} />}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                height={Spacing.xl6}
              />
            </View>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <Text style={styles.textName}>Name</Text>
              <Text style={styles.textHelp}>
                Use your full name which help contractor and us
              </Text>
              <View style={styles.inputContainer}>
                <View style={styles.nameRow}>
                  <TextInput
                    value={props.firstName}
                    placeholder="Mark"
                    style={styles.input}
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setFirstName(text);
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />
                </View>
                <View style={[styles.nameRow, { marginBottom: 0 }]}>
                  <TextInput
                    value={props.lastName}
                    placeholder="Evens"
                    style={styles.input}
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setLastName(text);
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />
                </View>
              </View>

              <Text style={styles.textName}>Role</Text>
              <Text style={styles.roleText}>
                Select role property owner or contractor.
              </Text>
              <View style={styles.roleContainer}>
                {roles.map((role, index) => {
                  return (
                    <TouchableOpacity
                      disabled
                      // onPress={() => props.setSelectedRole(role.value)}
                      style={[
                        styles.roleRow,
                        {
                          marginBottom: index === 0 ? 8 : 0,
                          backgroundColor:
                            props.userData.user.role === role.value
                              ? '#009FD9'
                              : '#FFFFFF',
                        },
                      ]}
                    >
                      <View style={styles.iconRow}>
                        <CheckBox
                          style={{ height: 22, width: 22 }}
                          fill={
                            props.userData.user.role === role.value
                              ? '#FFF'
                              : '#C3C3C3'
                          }
                        />
                        <Text
                          style={[
                            styles.roleName,
                            {
                              color:
                                props.userData.user.role === role.value
                                  ? '#FFF'
                                  : '#6A6A6A',
                            },
                          ]}
                        >
                          {role.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.textName}>Contact Info</Text>
              <Text style={styles.textHelp}>
                Enter your email address and active phone number
              </Text>
              <View style={styles.nameContainer}>
                <View style={styles.nameRow}>
                  <TextInput
                    value={props.email}
                    placeholder="i.e. davisjohn@example.com"
                    style={styles.input}
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setEmail(text);
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />
                </View>

                <View style={[styles.nameRow, { marginBottom: 0 }]}>
                  <TextInput
                    value={props.phone}
                    placeholder="i.e. (123) 456 8861"
                    style={styles.input}
                    placeholderTextColor="#726666"
                    onChangeText={text => {
                      props.setPhone(text);
                    }}
                    autoCapitalize="none"
                    cursorColor={AppColor.primaryBlue}
                  />
                </View>
              </View>
              <Text style={styles.textName}>Hide Jobs For Public</Text>
              <Text style={styles.textHelp}>
                This setting allow you to hide active public jobs from your
                public profile
              </Text>
              <View style={styles.bottomView}>
                {/* SHOW BUTTON */}
                <TouchableOpacity
                  onPress={() => props.setShowPublicJobs(true)}
                  style={[
                    styles.touchButton,
                    {
                      backgroundColor: props.showPublicJobs
                        ? '#009FD9'
                        : '#F1F1F1',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textTouch,
                      { color: props.showPublicJobs ? '#FFF' : '#6A6A6A' },
                    ]}
                  >
                    Show
                  </Text>
                </TouchableOpacity>

                {/* HIDE BUTTON */}
                <TouchableOpacity
                  onPress={() => props.setShowPublicJobs(false)}
                  style={[
                    styles.touchButton,
                    {
                      backgroundColor: !props.showPublicJobs
                        ? '#009FD9'
                        : '#F1F1F1',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textTouch,
                      { color: !props.showPublicJobs ? '#FFF' : '#6A6A6A' },
                    ]}
                  >
                    Hide
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
      {props.hasChanges && (
        <View style={styles.button}>
          <Button
            text={props.isLoading ? '' : 'Save Changes'}
            color={props.isLoading ? 'transparent' : '#FFFFFF'}
            fontFamily={PopinsFont.regular}
            fontSize={FontSizes.m}
            lineHeight={Spacing.xl}
            height={44}
            backgroundColor={'#009FD9'}
            width={'100%'}
            borderRadius={Spacing.s}
            onPress={() => props.handleSave()}
            rightIcon={
              props.isLoading ? (
                <ActivityIndicator size={'small'} color={AppColor.white} />
              ) : null
            }
          />
        </View>
      )}
    </View>
  );
};

export default Design;
