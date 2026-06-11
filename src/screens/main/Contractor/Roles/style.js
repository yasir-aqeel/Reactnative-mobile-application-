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

  headingText: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: AppColor.textColor,
    marginLeft: 5,
    marginBottom: 12,
  },
  flatlist: {
    backgroundColor: '#F7F7F7',
    borderRadius: Spacing.l,
    paddingTop: Spacing.xs,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 300,
    overflow: 'hidden',
    paddingBottom: 5,
  },
  icon: { height: 15, width: 15 },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
    height: 300,
    width: '100%',
  },
  text: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textAlign: 'center',
  },
  statusView: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textView: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRole: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.l,
    color: '#2A2A2A',
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
export default styles;
