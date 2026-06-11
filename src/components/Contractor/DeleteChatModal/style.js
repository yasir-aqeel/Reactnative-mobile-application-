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
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#151515',
    lineHeight: 23,
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
    backgroundColor: '#FFECED',
    borderColor: '#FFD7D8',
    height: 60,
    width: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
});

export default styles;
