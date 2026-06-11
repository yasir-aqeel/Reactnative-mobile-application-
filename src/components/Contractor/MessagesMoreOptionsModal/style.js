import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../helpers/Fonts';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 50,
    paddingVertical: 20,
    paddingHorizontal: 12,
    width: '100%',
  },

  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  optionItem: {
    width: '45%', // 3 items per row
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingVertical: Spacing.xs,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    height: 85,
  },
  optionText: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.medium,
    color: '#888888',
    textAlign: 'center',
    marginTop: 10,
  },
});
export default styles;
