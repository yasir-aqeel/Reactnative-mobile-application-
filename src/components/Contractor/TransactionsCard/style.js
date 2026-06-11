import { StyleSheet } from 'react-native';
import { Spacing, FontSizes } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingTop: Spacing.s,
    paddingBottom: Spacing.xs,
    paddingLeft: Spacing.xs,
    paddingRight: Spacing.xs,
    borderRadius: Spacing.s,
    marginBottom: 12,
  },
  text: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#555555',
  },
  title: {
    fontSize: FontSizes.m,
    lineHeight: FontSizes.xl,
    fontFamily: PopinsFont.medium,
    color: AppColor.textColor,
  },

  highlight: {
    color: '#009FD9',
    fontSize: FontSizes.m,
    lineHeight: FontSizes.l,
    fontFamily: PopinsFont.medium,
  },

  infoRow: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    width: '100%',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: Spacing.s,
    overflow: 'hidden',
    marginBottom: 12,
  },
  infoBox: {
    paddingHorizontal: Spacing.xs,
    borderRightWidth: 1,
    borderColor: '#E1E1E1',
    width: '50%',
  },

  infoLabel: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    paddingTop: 5,
  },

  infoValue: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    fontFamily: PopinsFont.medium,
    paddingVertical: 10,
  },

  idView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  idText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
  },

  sideIcon: { height: 16, width: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});
export default styles;
