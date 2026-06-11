import { StyleSheet } from 'react-native';
import AppColor from '../../../../helpers/AppColor';
import { PopinsFont } from '../../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  infoContainer: {
    paddingHorizontal: 16,
    backgroundColor: AppColor.white,
  },

  sideIcon: { height: 16, width: 16 },

  topArray: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.l,
    paddingVertical: Spacing.s,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    height: 140,
    borderRadius: Spacing.s,
    width: '100%',
    marginBottom: 12,
  },
  text: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.xl,
    lineHeight: Spacing.xl5,
  },
  text1: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    textAlign: 'left',
    lineHeight: Spacing.l,
  },
  dot: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.medium,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: Spacing.l,
  },
  date: {
    color: '#009FD9',
    fontFamily: PopinsFont.regular,
    fontSize: Spacing.s,
    textAlign: 'right',
    lineHeight: Spacing.l,
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  verified: {
    height: 102,
    borderRadius: Spacing.s,
    width: '100%',
  },
});
export default styles;
