import { Platform, StyleSheet } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import sizeHelper from '../../../helpers/sizeHelper';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
    top: Platform.OS === 'ios' ? 40 : 0,
  },

  signInText: {
    color: AppColor.white,
    fontSize: 30,
    textAlign: 'center',
    top: 32,
    fontFamily: PopinsFont.semiBold,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  fixerliImage: { height: 350, width: 300, marginVertical: 20 },
  welcomeText: {
    textAlign: 'left',
    color: AppColor.primaryBlue,
    fontSize: 24,
    marginLeft: 20,
    fontFamily: PopinsFont.bold,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  emailContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  emailInput: {
    height: 45,
    paddingHorizontal: 12,
    width: '100%',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
    fontFamily: PopinsFont.regular,
    color: '#726666',
    fontSize: 15,
    borderWidth: 1,
    borderColor: AppColor.white,
    textAlign: 'left',
    backgroundColor: AppColor.white,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  passwordContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: AppColor.grayBackground,
    backgroundColor: AppColor.grayBackground,
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
    fontSize: 15,
    fontFamily: PopinsFont.regular,
    color: '#6B6868',
  },

  bottomView: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    width: '30%',
    backgroundColor: AppColor.black,
  },
  backIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 1,
    color: AppColor.black,
    fontSize: 15,
    backgroundColor: 'rgba(247, 247, 247, 1)',
    borderRadius: 10,
    fontFamily: PopinsFont.regular,
    borderColor: AppColor.white,
  },

  underlineStyleHighLighted: {
    borderColor: AppColor.white,
    color: AppColor.black,
    fontSize: 15,
    fontFamily: PopinsFont.semiBold,
    borderWidth: 1,
  },
  loaderButton: {
    backgroundColor: AppColor.primaryBlue,
    width: '90%',
    height: 44,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  loaderContainer: { justifyContent: 'center', alignItems: 'center' },
  fullImage: {
    height: '100%',
    width: '100%',
  },
});
export default styles;
