import { Platform, StyleSheet } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';

import AppColor from '../../../helpers/AppColor';
import { Spacing, FontSizes } from '../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
    top: Platform.OS === 'ios' ? 40 : 0,
  },
  curvedView: {
    backgroundColor: AppColor.white,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    // marginHorizontal: 20,
    alignItems: 'center',
  },
  welcomeBackText: {
    color: AppColor.black,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: PopinsFont.semiBold,
    textDecorationLine: 'underline',
  },
  signInText: {
    color: AppColor.black,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: PopinsFont.semiBold,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 20,
    width: '93%',
    alignSelf: 'center',
  },

  welcomeText: {
    textAlign: 'center',
    color: '#555555',
    fontSize: 14,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
  },
  emailContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  emailInput: {
    height: 55,
    paddingHorizontal: 12,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 5,
    fontFamily: PopinsFont.regular,
    color: '#726666',
    fontSize: 15,
    borderWidth: 1,
    borderColor: AppColor.white,
    textAlign: 'left',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: AppColor.white,
    borderRadius: 10,
  },
  passwordContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColor.white,
    backgroundColor: AppColor.white,
    borderRadius: 10,
  },

  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    fontFamily: PopinsFont.regular,
    color: '#726666',
    fontSize: 15,
  },

  eyeButton: {
    paddingHorizontal: 12,
  },

  orText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: PopinsFont.medium,
    color: '#A6A6A6',
    marginVertical: 20,
  },
  noAccount: {
    color: AppColor.black,
    fontSize: 14,
    fontFamily: PopinsFont.regular,
    marginVertical: 10,
  },
  createAccount: {
    color: AppColor.black,
    fontSize: 14,
    fontFamily: PopinsFont.semiBold,
    marginVertical: 10,
  },

  forgetContainer: {
    width: '80%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },

  forgetView: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
  },
  forgetPassowrd: {
    color: '#4E4E4E',
    fontSize: 15,
    fontFamily: PopinsFont.regular,
    textAlign: 'right',
  },

  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  endView: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: AppColor.white,
    gap: 5,
  },
  loaderButton: {
    backgroundColor: '#F1F1F1',
    width: '100%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loaderContainer: { justifyContent: 'center', alignItems: 'center' },
  icon: { height: 25, width: 25 },
  fullImage: {
    height: '100%',
    width: '100%',
  },
  mainView: {
    borderWidth: 1,
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 12,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 20,
  },
  text: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    color: '#2A2A2A',
    marginLeft: 5,
    lineHeight: Spacing.xl,
  },
  bottomView1: { marginVertical: 30, alignSelf: 'center' },
  bottomView2: { flexDirection: 'row', alignItems: 'center' },
  text1: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: PopinsFont.regular,
    color: '#888888',
  },
  touchText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: PopinsFont.regular,
    color: '#888888',
  },
  stepBar: {
    height: 6,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 4,
    width: '90%',
  },
  passwordHint: {
    color: AppColor.redDark,
    fontSize: 10,
    lineHeight: Spacing.xl,
  },
});
export default styles;
