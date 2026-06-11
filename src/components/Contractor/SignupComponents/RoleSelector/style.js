import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import { Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: { flex: 1 },
  mainView: {
    marginTop: 30,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    textAlign: 'center',
  },
  touch: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: Spacing.s,
    paddingHorizontal: 10,
    paddingVertical: 14,
    height: 152,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default styles;
