import { StyleSheet } from 'react-native';
import { Spacing, FontSizes } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import AppColor from '../../../../helpers/AppColor';
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingTop: Spacing.s,
    paddingBottom: Spacing.xs,
    paddingLeft: Spacing.xs,
    paddingRight: Spacing.xs,
    borderRadius: Spacing.s,
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

  tagsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 8,
  },

  tag: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },

  jobIdView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  idText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
  },
  grayView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 24,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },

  grayText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#404040',
  },

  greenView: {
    backgroundColor: '#ECF9F3',
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#B2E5CE',
    borderWidth: 1,
  },
  greenText: {
    color: '#25724F',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
  },
  purpleView: {
    backgroundColor: '#F8E9FA',
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#E1A5E9',
  },
  purpleText: {
    color: '#9118A1',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
  },
  orangeView: {
    backgroundColor: '#FFF4EA',
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#FFD1A9',
  },
  orangeText: {
    color: '#CC7120',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
  },
  infoRow: {
    flexDirection: 'row',
    overflow: 'hidden',
    // marginBottom: 10,
    backgroundColor: '#FFF',
    width: '100%',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: Spacing.s,
    overflow: 'hidden',
    marginVertical: 10,
  },
  infoBox: {
    paddingHorizontal: Spacing.xs,
    borderRightWidth: 1,
    borderColor: '#E1E1E1',
    // width: '33.33%',
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
    color: AppColor.textColor,
    fontFamily: PopinsFont.medium,
    paddingVertical: 10,
    // textAlign: 'center',
  },

  actions: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    width: '100%',
  },

  globe: { height: 12, width: 12 },
  address: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: AppColor.textColor,
    fontFamily: PopinsFont.regular,
    marginTop: 5,
  },
  curve: { height: 11, width: 11 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#555555',
  },
  dot: {
    height: 11,
    width: 11,
    borderRadius: 10,
  },
  dotRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
});
export default styles;
