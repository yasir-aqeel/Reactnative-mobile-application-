import { StyleSheet } from 'react-native';
import AppColor from '../../../../helpers/AppColor';
import { PopinsFont } from '../../../../helpers/Fonts';
import sizeHelper, { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  infoContainer: {
    backgroundColor: AppColor.white,
    paddingBottom: 20,
  },
  text: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  text1: {
    color: '#007FAE',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textDecorationLine: 'underline',
  },
  content: { paddingHorizontal: 18, marginVertical: 12 },
  qr: {
    width: 240,
    height: 240,
  },
  idView: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.s,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: Spacing.xl6,
    padding: Spacing.xs,
  },
  idText: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
    textAlign: 'left',
  },
  icon: {
    height: 17,
    width: 17,
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
  qrView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  helperText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  code: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
  },
});
export default styles;
