import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import { LogoutIcon, PencilIcon } from '../../../../assets/svg';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import CustomSwitch from '../../../../components/CustomSwitch';
import NotificationSkeleton from '../../../../sekeletons/Contractor/NotificationSkeleton';

const Design = props => {
  return (
    <View style={styles.container}>
      <Header showBackIcon title={'Security'} navigation={props.navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoContainer}
      >
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={styles.nameContainer}>
            <Text style={styles.textName}>Password</Text>
            <Text style={styles.textHelp}>
              Use your full name which help contractor and us
            </Text>
            <View style={styles.buttonView}>
              <Button
                text={'Change Profile'}
                backgroundColor={'#FFFFFF'}
                borderRadius={Spacing.s}
                width={'49%'}
                color={'#404040'}
                leftIcon={<PencilIcon style={styles.sideIcon} />}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                height={Spacing.xl6}
                onPress={() => props.navigation.navigate('EditProfile')}
              />
              <Button
                text={'Setup Passowrd'}
                backgroundColor={'#FFFFFF'}
                borderRadius={Spacing.s}
                width={'49%'}
                color={'#404040'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                height={Spacing.xl6}
                onPress={() => props.navigation.navigate('updatePassword')}
              />
            </View>
          </View>
          <View style={styles.nameContainer}>
            <View
              pointerEvents={props.userData?.user?.mfaEnabled ? 'auto' : 'none'}
              style={styles.row}
            >
              <Text style={styles.textName}>2-Factor Authentication</Text>
              <View style={styles.switchView}>
                {props.setupAuthentication ? (
                  <ActivityIndicator size={'small'} color={'#404040'} />
                ) : (
                  <CustomSwitch
                    value={props.userData?.user?.mfaEnabled}
                    onValueChange={value => props.toggleMfaSetup()}
                  />
                )}
              </View>
            </View>

            <Text style={[styles.textHelp, { marginTop: -5 }]}>
              Select role property owner or contractor.
            </Text>
            {!props.userData.user.mfaEnabled && (
              <Button
                text={'Setup'}
                backgroundColor={'#FFFFFF'}
                borderRadius={Spacing.s}
                width={'100%'}
                color={'#404040'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
                height={Spacing.xl6}
                onPress={() => props.navigation.navigate('Enable2FA')}
              />
            )}
          </View>

          {props.isLoading ? (
            <NotificationSkeleton />
          ) : (
            <>
              {props.activeSessions.length > 0 && (
                <View style={styles.flatlist}>
                  <View style={{ marginTop: 12 }}>
                    <Text style={styles.session}>Sessions</Text>
                    <Text style={styles.textHelp}>
                      Places where you’re logged into Fixrli
                    </Text>
                  </View>
                  <FlatList
                    data={props.activeSessions}
                    keyExtractor={item => item.id}
                    renderItem={props.renderActiveSessions}
                    key={'_'}
                  />
                </View>
              )}

              {props.previousSessions.length > 0 && (
                <View style={styles.flatlist}>
                  <Text style={styles.previouos}>
                    Previous Session ({props.previousSessions.length ?? 0})
                  </Text>
                  <FlatList
                    data={props.previousSessions}
                    keyExtractor={item => item.id}
                    renderItem={props.renderPreviousSessions}
                    key={'_'}
                  />
                  <Button
                    text={
                      props.isAuthLoading ? '' : 'Sign out all other sessions'
                    }
                    backgroundColor={'#F7F7F7'}
                    borderWidth={1}
                    borderColor={'#E1E1E1'}
                    borderRadius={Spacing.s}
                    width={'100%'}
                    color={props.isAuthLoading ? 'transparent' : '#404040'}
                    fontFamily={PopinsFont.regular}
                    fontSize={FontSizes.m}
                    lineHeight={Spacing.xl}
                    height={Spacing.xl6}
                    leftIcon={
                      props.isAuthLoading ? (
                        <ActivityIndicator size={'small'} color={'#404040'} />
                      ) : (
                        <LogoutIcon style={styles.sideIcon} fill={'#2A2A2A'} />
                      )
                    }
                    marginVertical={12}
                    onPress={() => props.handleRevokeOtherSessoions()}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Design;
