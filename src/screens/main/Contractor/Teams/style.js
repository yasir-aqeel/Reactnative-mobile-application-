import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import AppColor from '../../../../helpers/AppColor';
import { Spacing, FontSizes } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },

  flatlistContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    position: 'relative',
  },
  noRecord: {
    fontFamily: PopinsFont.bold,
    fontSize: 16,
    color: AppColor.textLight1,
  },
  noText: {
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    color: AppColor.textLight2,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#009FD9',
    width: 20,
    height: 8,
    borderRadius: 4,
  },

  statsView: {
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  innerBox: {
    backgroundColor: '#FFF',
    width: 184,
    height: 104,
    borderRadius: Spacing.s,
    padding: Spacing.s,
    justifyContent: 'space-between',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  boxIcon: { height: 25, width: 25 },
  value: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.xl4,
    lineHeight: FontSizes.xl4,
  },
  text: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    color: AppColor.textColor,
    lineHeight: Spacing.l,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  greenView: {
    backgroundColor: '#B2E5CE',
    borderColor: '#64CB9D',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  greenValue: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: AppColor.textColor,
  },
  flatlistView: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: Spacing.xl,
    borderTopRightRadius: Spacing.xl,
    paddingHorizontal: Spacing.l,
    paddingTop: Spacing.l,
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
  icon: { height: 22, width: 22 },
  actve: {
    color: '#2A2A2A',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    marginBottom: 12,
  },
  img: { height: 50, width: 50 },
  greenDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    height: 12,
    width: 12,
    borderRadius: 100,
    backgroundColor: '#3DBE84',
    borderWidth: 2,
    borderColor: '#fff', // optional for better visibility
  },
  quickView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  quick: {
    fontFamily: PopinsFont.medium,
    color: AppColor.textColor,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.s,
  },
  statusView: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  topView: {
    backgroundColor: '#FFF',
    borderRadius: Spacing.s,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.s,
    marginBottom: 12,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  rolesIcon: {
    height: 15,
    width: 14,
  },
});
export default styles;
