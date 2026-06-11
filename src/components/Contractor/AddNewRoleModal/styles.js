import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    width: '100%',
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 12,
  },
  defaultText: {
    color: '#151515',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
    textAlign: 'left',
    marginBottom: 8,
  },
  defaultTextValue: {
    color: '#151515',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    textAlign: 'left',
  },
  touch: {
    borderWidth: 1,
    paddingHorizontal: Spacing.s,
    borderRadius: Spacing.s,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 12,
  },
  innerView: {
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
    gap: 10,
  },
  innerText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    textAlign: 'left',
  },
  icon: { height: 20, width: 20 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  inputView: {
    width: '100%',
    marginBottom: 12,
    height: 50,
  },

  textArea: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#F1F1F1',
    height: 45,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    textAlignVertical: 'center',
    alignItems: 'center',
    borderRadius: Spacing.s,
  },
});
export default styles;
