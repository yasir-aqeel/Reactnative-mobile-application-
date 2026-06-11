import { Platform, StyleSheet } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
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

  button: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '97%',
    backgroundColor: '#FFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderTopLeftRadius: Spacing.s,
    borderTopRightRadius: Spacing.s,
    paddingVertical: Spacing.s,
    paddingHorizontal: Spacing.l,
    flexDirection: 'row',
  },
  text1: {
    color: '#007FAE',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textDecorationLine: 'underline',
  },
  content: { paddingHorizontal: 18, marginVertical: 12 },
  text: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  view1: {
    borderWidth: 1,
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    width: '92%',
    alignSelf: 'center',
    paddingTop: 12,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 12,
    borderRadius: 20,
    marginTop: 12,
  },
});
export default styles;
