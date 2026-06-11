import { StyleSheet } from 'react-native';
import AppColor from '../../../../helpers/AppColor';
import { PopinsFont } from '../../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
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
  searchIconView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  contentContainer: { paddingHorizontal: 18, flex: 1 },
  searchContainerOuter: { marginVertical: 10 },
  searchIcon: { height: 15, width: 15 },
  text: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textAlign: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
    height: 500,
    width: '100%',
  },
});
export default styles;
