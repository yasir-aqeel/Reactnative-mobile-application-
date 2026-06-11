import { Platform, StyleSheet } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
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
  fullImage: {
    height: '100%',
    width: '100%',
  },

  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },

  textContainer: {
    paddingHorizontal: 12,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 6,
    fontFamily: PopinsFont.regular,
    color: '#726666',
    fontSize: 15,
    textAlign: 'left',
    justifyContent: 'center',
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  loaderButton: {
    backgroundColor: AppColor.primaryBlue,
    width: '90%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10,
  },
  loaderContainer: { justifyContent: 'center', alignItems: 'center' },
  passwordContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColor.white,
    backgroundColor: AppColor.white,
    marginBottom: 8,
  },

  passwordInput: {
    flex: 1,
    height: 52,
    paddingHorizontal: 12,
    fontFamily: PopinsFont.regular,
    color: '#726666',
    fontSize: 15,
  },

  eyeButton: {
    paddingHorizontal: 12,
  },
  passwordText: {
    fontFamily: PopinsFont.regular,
    fontSize: 10,
    color: '#6C6C6C',
  },
  passwordHint: {
    color: AppColor.redDark,
    fontSize: 10,
    lineHeight: Spacing.xl,
  },
  text: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    color: '#2A2A2A',
    marginLeft: 5,

    fontSize: FontSizes.s,
    color: '#2A2A2A',
    marginLeft: 5,
    lineHeight: Spacing.l,
  },
});
export default styles;
