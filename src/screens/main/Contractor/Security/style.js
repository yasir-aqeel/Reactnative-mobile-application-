import { StyleSheet } from 'react-native';
import AppColor from '../../../../helpers/AppColor';
import { PopinsFont } from '../../../../helpers/Fonts';
import sizeHelper, { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  infoContainer: {
    backgroundColor: AppColor.white,
    paddingBottom: 20,
  },

  sideIcon: { height: 16, width: 16 },

  nameContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.m,
    padding: Spacing.xs,
    marginBottom: 12,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  textHelp: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    textAlign: 'left',
    marginBottom: 12,
    marginLeft: 4,
  },
  textName: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    marginBottom: 4,
    marginLeft: 4,
  },
  session: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.xl,
    lineHeight: Spacing.xxl,
    marginLeft: 4,
  },

  previouos: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchView: { marginTop: 8, marginRight: 8 },
  flatlist: { flex: 1, backgroundColor: '#FFF', marginBottom: 12 },
});
export default styles;
