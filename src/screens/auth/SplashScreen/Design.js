import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import { images } from '../../../assets/images';
import Button from '../../../components/Button';
import AppColor from '../../../helpers/AppColor';
import { PopinsFont } from '../../../helpers/Fonts';
import FastImage from '@d11/react-native-fast-image';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
const Design = props => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={images.splash}
        style={styles.fullImage}
      >
        <View style={styles.view1}>
          <View style={styles.row1}>
            <FastImage
              source={images.fixrliGif}
              style={{ height: 50, width: 50 }}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Text style={styles.text}>Fixrli</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#151515',
                fontSize: 30,
                fontFamily: PopinsFont.medium,
                textAlign: 'center',
              }}
            >
              Find Jobs, Manage Properties & Teams
            </Text>
          </View>
          <View style={{ alignItems: 'center', width: '90%' }}>
            <Text
              style={{
                color: '#555555',
                fontSize: 14,
                fontFamily: PopinsFont.regular,
                textAlign: 'center',
              }}
            >
              {props.userData
                ? ''
                : 'Sign in or register as new account to grow your business.'}
            </Text>
          </View>
        </View>

        <Button
          text={props.userData ? '' : 'Create New Account'}
          color={props.userData ? 'transparent' : AppColor.white}
          backgroundColor={props.userData ? 'transparent' : '#009FD9'}
          height={Spacing.xl6}
          width={'90%'}
          borderRadius={Spacing.s}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.m}
          onPress={props.onClickNewAccount}
          marginVertical={15}
          lineHeight={Spacing.xl}
        />
        <Button
          text={props.userData ? '' : 'Already Member! Login'}
          color={props.userData ? 'transparent' : '#6A6A6A'}
          marginBottom={70}
          height={Spacing.xl6}
          width={'90%'}
          borderRadius={Spacing.s}
          fontFamily={PopinsFont.medium}
          fontSize={16}
          onPress={props.onClickLogin}
          borderWidth={1}
          backgroundColor={props.userData ? 'transparent' : '#F7F7F7'}
          borderColor={props.userData ? 'transparent' : '#E1E1E1'}
          lineHeight={Spacing.xl}
        />
        {!props.userData && (
          <View style={styles.bottomView1}>
            <View style={styles.bottomView2}>
              <Text style={styles.text1}>By continuing, you agree to our</Text>
              <TouchableOpacity disabled>
                <Text style={styles.touchText}>{` Terms and Conditions`}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity disabled>
              <Text style={styles.touchText}>{`and Privacy Policy.`}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Design;
