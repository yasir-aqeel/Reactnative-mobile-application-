import { StyleSheet } from 'react-native';
import AppColor from '../../../helpers/AppColor';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    paddingVertical: 15,
  },

  message: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#151515',
    lineHeight: Spacing.l,
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#E6F6FC',
    height: 100,
    width: 100,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.medium,
    color: '#151515',
    lineHeight: Spacing.l,
  },
  statusContainer: {
    marginBottom: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default styles;
