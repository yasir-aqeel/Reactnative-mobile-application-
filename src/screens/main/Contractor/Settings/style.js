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
  topBox: {
    backgroundColor: '#F7F7F7',
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    padding: Spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  userImageContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  userImage: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  userNameContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0000000A',
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  name: {
    color: AppColor.primaryBlue,
    fontSize: 25,
    fontFamily: PopinsFont.medium,
    lineHeight: Spacing.xl,
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  midView: { justifyContent: 'center' },
  userName: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
    marginBottom: 4,
  },
  role: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.xs,
    lineHeight: Spacing.l,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  retingView: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    padding: Spacing.xs,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Spacing.xl5,
    gap: 5,
  },
  rating: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
  },
  cover: {
    height: 102,
    borderRadius: 12,
  },
  verified: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  topArray: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.l,
    padding: Spacing.xs,
    marginBottom: 12,
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.xs,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: Spacing.xl7,
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  leftIcon: {
    height: 20,
    width: 20,
  },
  rightIcon: {
    height: 15,
    width: 10,
  },
  screenName: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
  },
  version: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
  },
  versionText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  notificationIcon: {
    height: 15,
    width: 15,
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
