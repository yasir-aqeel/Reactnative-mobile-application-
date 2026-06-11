import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import AppColor from '../../../../helpers/AppColor';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  secondContainer: { flex: 1 },

  sideIcon: { height: 16, width: 16 },

  statsView: {
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 12,
  },

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

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
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
  },
  placeholderStyle: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  content2: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
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
  actionCard: {
    marginVertical: 5,
  },

  sideIcon: { height: 15, width: 15 },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusView: {
    justifyContent: 'center',
    marginBottom: 10,
    width: '92%',
    alignSelf: 'center',
  },
  topBox: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: Spacing.s,
    padding: Spacing.s,
    height: 105,
    marginBottom: 8,
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.xl4,
    lineHeight: Spacing.xl4,
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    flex: 1,
  },
  text2: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    textAlign: 'left',
    lineHeight: Spacing.l,
    marginTop: 30,
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
    height: 300,
    width: '100%',
  },
});
export default styles;
