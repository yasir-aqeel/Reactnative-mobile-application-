import { StyleSheet } from 'react-native';
import { Spacing, FontSizes } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  card: {
    padding: Spacing.s,
    marginVertical: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderRadius: Spacing.s,
    width: '100%',
    alignItems: 'center',
  },
  greenDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    height: 12,
    width: 12,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    marginBottom: 4,
  },
  lastMessageText: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.xs,
    lineHeight: Spacing.l,
  },
  timeText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.xs,
    lineHeight: Spacing.l,
    marginBottom: 4,
  },
  imageView: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  nameContainer: {
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
  view1: {
    position: 'relative',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  countView: {
    backgroundColor: AppColor.primaryBlue,
    borderRadius: 100,
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFF',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    textAlign: 'center',
    lineHeight: Spacing.l,
  },
  endView: {
    width: '20%',
    alignItems: 'center',
    right: 20,
  },
  contentView: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
export default styles;
