import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import AppColor from '../../../../helpers/AppColor';
import { Spacing } from '../../../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flex: 1,
  },
  iconWrapper: {
    marginRight: 12,
  },

  sectionHeader: {
    fontSize: 14,
    color: '#6A6A6A',
    marginVertical: 10,
    fontFamily: PopinsFont.medium,
    lineHeight: Spacing.l,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '97%',
    backgroundColor: '#FFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderTopLeftRadius: Spacing.s,
    borderTopRightRadius: Spacing.s,
    paddingVertical: Spacing.s,
    paddingHorizontal: Spacing.l,
  },
});
export default styles;
