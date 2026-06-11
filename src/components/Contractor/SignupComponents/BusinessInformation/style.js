import { Platform, StyleSheet } from 'react-native';

import { PopinsFont } from '../../../../helpers/Fonts';

import AppColor from '../../../../helpers/AppColor';

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingBottom: 20,
  },
  heading: {
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    textAlign: 'left',
  },
  touch: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 5,
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#F7F7F7',
    borderColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mainView1: {
    marginTop: 30,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  mainView: {
    backgroundColor: '#F1F1F1',
    width: '90%',
    alignSelf: 'center',
    padding: 8,
    borderRadius: 20,
  },
  emailContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  emailInput: {
    height: 52,
    paddingHorizontal: 12,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 5,
    fontFamily: PopinsFont.regular,
    color: '#726666',
    fontSize: 15,
    borderWidth: 1,
    borderColor: AppColor.white,
    textAlign: 'left',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: AppColor.white,
    borderRadius: 10,
  },

  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
    top: Platform.OS === 'ios' ? 40 : 0,
  },
  text: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    color: '#2A2A2A',
    marginLeft: 5,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 30,
  },
});
export default styles;
