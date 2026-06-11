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
    backgroundColor: AppColor.white,
  },

  sideIcon: { height: 16, width: 16 },

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
    height: 57,
    borderRadius: Spacing.s,
    marginBottom: 8,
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  leftIcon: {
    height: 22,
    width: 22,
  },
  rightIcon: {
    height: 20,
    width: 20,
  },
  name: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },

  buttons: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '97%',
    backgroundColor: '#FFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderTopLeftRadius: Spacing.s,
    borderTopRightRadius: Spacing.s,
    paddingVertical: Spacing.s,
    paddingHorizontal: Spacing.l,
    flexDirection: 'row',
    gap: 10,
  },
  bankIconContainer: {
    backgroundColor: '#ECF9F3',
    borderColor: '#8BD8B5',
    borderWidth: 1,
    borderRadius: 8,
    height: 33,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bankIconNotSelectedContainer: {
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 8,
    height: 33,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  historyText: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
    textAlign: 'left',
    marginBottom: 8,
  },
  text: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textAlign: 'left',
  },
  headingText: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.s,
    color: AppColor.textColor,
    marginLeft: 5,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  statusContainer: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  flatlistView: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: Spacing.xl,
    borderTopRightRadius: Spacing.xl,
    padding: Spacing.l,
  },
  headingText: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: AppColor.textColor,
    marginLeft: 5,
    marginBottom: 12,
  },
  flatlist: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  footerText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
  },
});
export default styles;
