import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import { LogoutIcon, RatingStart, VerifiedIcon } from '../../../../assets/svg';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import { images } from '../../../../assets/images';
import Header from '../../../../components/Header';
import CustomSwitch from '../../../../components/CustomSwitch';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
import { bottomScreens, topScreens } from '../../../../helpers/Data';
import AppColor from '../../../../helpers/AppColor';
import DeviceInfo from 'react-native-device-info';

const Design = props => {
  const appVersion = DeviceInfo.getVersion();
  const role = props?.userData?.user?.role
    ?.toLowerCase()
    ?.replace(/^./, c => c.toUpperCase());
  return (
    <View style={styles.container}>
      <Header
        showBackIcon
        title={'Settings'}
        navigation={props.navigation}
        showOtherIcons
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoContainer}
      >
        <View style={styles.topBox}>
          <View style={styles.detailsView}>
            <View style={styles.nameContainer}>
              {props?.userData?.user?.avatar !== null ? (
                <View style={styles.userImageContainer}>
                  <Image
                    source={{ uri: props?.userData?.user?.avatar }}
                    style={styles.userImage}
                  />
                </View>
              ) : (
                <View style={styles.userNameContainer}>
                  <Text style={styles.name}>
                    {props.userData.user.firstName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.midView}>
              <View style={styles.nameView}>
                <Text style={styles.userName}>
                  {props.userData.user.firstName +
                    ' ' +
                    props.userData.user.lastName}
                </Text>
                {props.userData.user.identityVerified && (
                  <VerifiedIcon style={styles.sideIcon} />
                )}
              </View>

              <View style={styles.midView}>
                <Text style={styles.role}>{role}</Text>
              </View>
            </View>
          </View>
          <View style={styles.retingView}>
            <RatingStart style={styles.sideIcon} />
            <Text style={styles.rating}>
              {props.userData.user.avgRating.toFixed(1)}
            </Text>
          </View>
        </View>
        {!props.userData.user.identityVerified && (
          <TouchableOpacity
            onPress={props.handleOpenVerifiedModal}
            style={styles.verified}
          >
            <Image
              source={images.verified}
              style={styles.cover}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        <View style={styles.topArray}>
          {topScreens.map((screen, index) => {
            const LeftIcon = screen.leftIcon;
            const RightIcon = screen.rightIcon;
            const isFirst = index === 0;
            const isLast = index === topScreens.length - 1;
            return (
              <TouchableOpacity
                onPress={screen.onPress}
                key={screen.id}
                style={[
                  styles.optionRow,
                  {
                    borderTopLeftRadius: isFirst ? Spacing.s : 0,
                    borderTopRightRadius: isFirst ? Spacing.s : 0,
                    borderBottomLeftRadius: isLast ? Spacing.s : 0,
                    borderBottomRightRadius: isLast ? Spacing.s : 0,
                  },
                ]}
              >
                <View style={styles.innerRow}>
                  <LeftIcon
                    style={
                      screen.id === 'notifications'
                        ? styles.notificationIcon
                        : styles.leftIcon
                    }
                    fill={'#2A2A2A'}
                  />
                  <Text style={styles.screenName}>{screen.name}</Text>
                </View>

                {RightIcon === null ? (
                  <>
                    {props?.loading ? (
                      <ActivityIndicator
                        size={'small'}
                        color={AppColor.textDark}
                      />
                    ) : (
                      <CustomSwitch
                        value={props.isNotificationsEnabled}
                        onValueChange={value =>
                          props.handleToggleAllNotifications(value)
                        }
                      />
                    )}
                  </>
                ) : (
                  <RightIcon style={styles.rightIcon} fill={'#888888'} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.topArray}>
          {bottomScreens.map((screen, index) => {
            const LeftIcon = screen.leftIcon;
            const RightIcon = screen.rightIcon;

            const isFirst = index === 0;
            const isLast = index === bottomScreens.length - 1;

            return (
              <TouchableOpacity
                onPress={screen.onPress}
                key={screen.id}
                style={[
                  styles.optionRow,
                  {
                    borderTopLeftRadius: isFirst ? Spacing.s : 0,
                    borderTopRightRadius: isFirst ? Spacing.s : 0,
                    borderBottomLeftRadius: isLast ? Spacing.s : 0,
                    borderBottomRightRadius: isLast ? Spacing.s : 0,
                  },
                ]}
              >
                <View style={styles.innerRow}>
                  <LeftIcon style={styles.leftIcon} fill={'#2A2A2A'} />
                  <Text style={styles.screenName}>{screen.name}</Text>
                </View>

                <RightIcon style={{ height: 32, width: 32 }} fill={'#888888'} />
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          text={'Logout'}
          color={'#CC2D30'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.m}
          lineHeight={Spacing.xl}
          leftIcon={
            <LogoutIcon fill={'#CC2D30'} style={{ height: 20, width: 20 }} />
          }
          backgroundColor={'#F7F7F7'}
          borderWidth={1}
          borderColor={'#E1E1E1'}
          width={'100%'}
          height={Spacing.xl6}
          borderRadius={Spacing.s}
          marginBottom={12}
          onPress={() => props.handleLogout()}
        />
        <View style={styles.version}>
          <Text style={styles.versionText}>v.{appVersion}</Text>
        </View>
      </ScrollView>
      <ModalRenderer
        activeModal={props.activeModal}
        closeModal={props.closeModal}
        openModal={props.openModal}
        state={props.state}
        setState={props.setState}
      />
    </View>
  );
};

export default Design;
