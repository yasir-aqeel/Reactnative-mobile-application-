import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomView1: { marginBottom: 30, alignSelf: 'center' },
  bottomView2: { flexDirection: 'row', alignItems: 'center' },
  text1: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: PopinsFont.regular,
    color: '#888888',
  },
  touchText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: PopinsFont.regular,
    color: '#888888',
  },
  view1: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  text: {
    color: '#2A2A2A',
    fontSize: 36,
    fontFamily: PopinsFont.medium,
    top: 5,
  },
});
export default styles;
