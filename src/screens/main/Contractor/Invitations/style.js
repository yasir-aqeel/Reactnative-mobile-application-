import { StyleSheet } from 'react-native';
import AppColor from '../../../../helpers/AppColor';
import { PopinsFont } from '../../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },

  statCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginBottom: 10,
  },

  statLabel: {
    fontSize: 10,
    color: AppColor.black,
    fontFamily: PopinsFont.medium,
  },
  statLabel: {
    fontSize: 10,
    color: AppColor.black,
    fontFamily: PopinsFont.medium,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2A3A',
  },
  statSubLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A3A',
    marginTop: 4,
  },
  jobCard: {
    backgroundColor: AppColor.white,
    // borderRadius: 24,
    paddingVertical: 10,
    marginBottom: 20,
    width: '100%',
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2A3A',
    marginBottom: 4,
    textAlign: 'center',
  },
  jobAddress: {
    fontSize: 15,
    color: '#6F7D95',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    marginVertical: 14,
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: AppColor.white,
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  tagText: {
    fontSize: 12,
    marginLeft: 3,
    fontFamily: PopinsFont.light,
    color: AppColor.black,
  },
  tagText2: {
    fontSize: 12,
    fontFamily: PopinsFont.medium,
    color: '#FF0004',
  },
  jobDescription: {
    fontSize: 12,
    lineHeight: 20,
    color: '#3F3F3F',
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColor.white,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#000000',
    fontFamily: PopinsFont.medium,
  },

  propertyImage: { height: 300, width: '100%', justifyContent: 'flex-end' },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 300,
  },
  view2: {
    backgroundColor: 'rgba(255, 255, 255, 0.91)',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
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
  label: {
    marginBottom: 6,
    color: AppColor.black,
    fontFamily: PopinsFont.medium,
    fontSize: 14,
  },
  inputBlock: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },

  placeholderStyle: {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: PopinsFont.medium,
    color: AppColor.black,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: AppColor.black,
    fontFamily: PopinsFont.regular,
    backgroundColor: 'transparent',
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    color: AppColor.black,
    fontFamily: PopinsFont.semiBold,
  },

  scrollContent: {
    flex: 1,
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
    lineHeight: Spacing.xl,
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
  searchIconView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
});
export default styles;
