import { Spacing, FontSizes } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  actionCard: {
    margin: 8,
  },
  roleName: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
  },
  count: {
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
    fontSize: FontSizes.s,
    color: '#6A6A6A',
  },
  countView: {
    borderRadius: 50,
    height: 24,
    minWidth: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { height: 15, width: 15 },
});
export default styles;
