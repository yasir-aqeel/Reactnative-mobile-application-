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

  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlineStyleBase: {
    width: 60,
    height: 45,
    borderWidth: 1,
    color: '#888888',
    fontSize: 22,
    backgroundColor: AppColor.white,
    fontFamily: PopinsFont.regular,
    borderColor: AppColor.white,
  },

  underlineStyleHighLighted: {
    borderColor: AppColor.white,
    color: '#888888',
    fontSize: 22,
    fontFamily: PopinsFont.regular,
  },
  loaderButton: {
    backgroundColor: AppColor.primaryBlue,
    width: '90%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  loaderContainer: { justifyContent: 'center', alignItems: 'center' },
  fullImage: {
    height: '100%',
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: 14,
  },
  otpView: {
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
  },
});
export default styles;
