import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import AppColor from '../../../../helpers/AppColor';
import { Spacing, FontSizes } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },

  greeting: {
    fontSize: 26,
    fontFamily: PopinsFont.medium,
    color: AppColor.black,
  },

  sectionTitle: {
    fontSize: FontSizes.s,
    paddingLeft: 20,
    marginVertical: 10,
    fontFamily: PopinsFont.medium,
    lineHeight: FontSizes.s,
  },

  actionCard: {
    marginVertical: 5,
  },

  actionImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: 14,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  actionAddress: {
    color: '#666',
    marginVertical: 6,
  },

  secondaryBtn: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  secondaryBtnText: {
    fontWeight: '600',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderRadius: 100,
    padding: 10,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
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
  boxIcon: { height: 20, width: 20 },
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
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
    width: '97%',
    backgroundColor: '#FFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderTopLeftRadius: Spacing.s,
    borderTopRightRadius: Spacing.s,
    paddingVertical: Spacing.s,
    paddingHorizontal: Spacing.l,
  },
  sideIcon: { height: 15, width: 15 },
  quickView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  quickText: {
    fontFamily: PopinsFont.medium,
    color: AppColor.textColor,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
  },
  statusView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  //   dropdown
  dropDowncontainer: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  dropdown: {
    height: 44,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },

  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
    height: 300,
    width: '100%',
  },
  downloadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
export default styles;
