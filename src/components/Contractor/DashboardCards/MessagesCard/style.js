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

  infoRow: {
    overflow: 'hidden',
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
    width: '100%',
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
    lineHeight: FontSizes.s,
    color: AppColor.textColor,
    fontFamily: PopinsFont.medium,
    paddingVertical: 10,
  },

  actions: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    width: '100%',
  },

  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  secondRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  greenDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    height: 12,
    width: 12,
    borderRadius: 100,
    backgroundColor: '#3DBE84',
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameContainer: { justifyContent: 'center' },
  nameRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  verified: { height: 17, width: 17 },

  owner: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  name: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
  },
  nameView: {
    backgroundColor: AppColor.primaryBlue,
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: '#FFF',
    fontSize: FontSizes.l,
    fontFamily: PopinsFont.semiBold,
    lineHeight: Spacing.l,
    textAlign: 'center',
  },
});
export default styles;
