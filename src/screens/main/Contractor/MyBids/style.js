import { StyleSheet } from 'react-native';
import AppColor from '../../../../helpers/AppColor';
import { PopinsFont } from '../../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  scrollContent: {
    flex: 1,
  },

  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    width: '100%',
    fontFamily: PopinsFont.regular,
    fontSize: 12,
    alignItems: 'left',
    color: AppColor.black,
  },

  searchContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.s,
    height: Spacing.xl6,
    paddingHorizontal: Spacing.s,
    paddingVertical: Spacing.xs,
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F1F1F1',
    height: Spacing.xl6,
    paddingHorizontal: 10,
    width: '100%',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: AppColor.black,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    borderRadius: Spacing.s,
  },
  actionCard: {
    marginVertical: 5,
  },
  flatlistView: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: Spacing.xl,
    borderTopRightRadius: Spacing.xl,
    paddingHorizontal: Spacing.l,
    paddingTop: Spacing.l,
  },
  flatlist: { flex: 1 },
  headingText: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: AppColor.textColor,
    marginLeft: 5,
    marginBottom: 5,
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
  searchIconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  filterOptions: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterList: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  text: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textAlign: 'center',
  },
  footer1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
    height: 500,
    width: '100%',
  },
});

export default styles;
