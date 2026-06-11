import { StyleSheet } from 'react-native';
import { Spacing, FontSizes } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
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
    maxHeight: '90%',
  },
  title: {
    fontSize: 20,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#F1F1F1',
  },

  budgetInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    padding: 0,
    height: 44,
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    marginBottom: 8,
    lineHeight: Spacing.l,
  },
  label1: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    lineHeight: Spacing.l,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    padding: 10,
    minHeight: 120,
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    color: '#2A2A2A',
    textAlignVertical: 'top',
    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default styles;
