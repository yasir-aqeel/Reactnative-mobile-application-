import { StyleSheet } from 'react-native';
import { Spacing, FontSizes } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: Spacing.xs,
    borderRadius: Spacing.xs,
    width: '100%',
    marginBottom: 8,
  },

  title: {
    fontSize: FontSizes.m,
    lineHeight: FontSizes.xl,
    fontFamily: PopinsFont.medium,
    color: AppColor.textColor,
  },

  highlight: {
    color: '#009FD9',
    fontSize: FontSizes.m,
    lineHeight: FontSizes.l,
    fontFamily: PopinsFont.medium,
  },

  tagsRow: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 8,
  },

  tag: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },

  jobIdView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  idText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#6A6A6A',
  },

  actions: {
    gap: 5,
    alignSelf: 'center',
    width: '100%',
  },

  globe: { height: 12, width: 12 },
  address: {
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: AppColor.textColor,
    fontFamily: PopinsFont.regular,
    marginTop: 5,
  },
  curve: { height: 11, width: 11 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#555555',
  },
  budgetView: {
    backgroundColor: '#F7F7F7',
    padding: Spacing.xs,
    borderRadius: Spacing.xs,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
  },
  budgetValue: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    lineHeight: Spacing.xl3,
  },
});
export default styles;
