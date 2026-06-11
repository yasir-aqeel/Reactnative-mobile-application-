import { StyleSheet } from 'react-native';
import sizeHelper from '../../../helpers/sizeHelper';
import AppColor from '../../../helpers/AppColor';
import { PopinsFont } from '../../../helpers/Fonts';

const styles = StyleSheet.create({
  mainConatiner: { flex: 1, backgroundColor: AppColor.white },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 100,
    height: 30,
    width: 30,
  },
  topView: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: AppColor.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textView: { justifyContent: 'center', alignItems: 'center' },
  fixrliText: {
    fontSize: 22,
    color: AppColor.primaryBlue,
    fontFamily: PopinsFont.bold,
    textAlign: 'left',
  },
  icon: { height: 15, width: 15 },
  contentView: { bottom: 50 },
  bottomView: {
    backgroundColor: AppColor.white,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
    alignItems: 'center',
  },
  optionsView: {
    alignSelf: 'flex-start',
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  text: {
    color: AppColor.black,
    fontFamily: PopinsFont.regular,
    fontSize: 13,
  },
  touch2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  endView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
});
export default styles;
