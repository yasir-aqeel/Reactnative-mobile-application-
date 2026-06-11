import { StyleSheet } from 'react-native';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  loaderButton: {
    backgroundColor: AppColor.primaryBlue,
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  loaderContainer: { justifyContent: 'center', alignItems: 'center' },
  fullImage: {
    height: '100%',
    width: '100%',
  },
  stepBar: {
    height: 6,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 4,
    width: '90%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
export default styles;
