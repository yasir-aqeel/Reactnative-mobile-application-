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
});
export default styles;
