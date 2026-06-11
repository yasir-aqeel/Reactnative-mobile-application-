import { StyleSheet } from 'react-native';
import { Spacing, FontSizes } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
const styles = StyleSheet.create({
  card: {
    // width: '80%',
    borderRadius: Spacing.s,
    padding: Spacing.xs,
    marginBottom: 12,
    marginHorizontal: 18,
  },

  view1: {
    width: '100%',
    marginBottom: 8,
  },
  smsText: {
    fontSize: FontSizes.s,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
    left: -8,
  },
  text: {
    top: 5,
    color: AppColor.primaryBlue,
    fontSize: 12,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  timeView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: FontSizes.xs,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.x,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 'auto',
  },
  sideIcon: { height: 16, width: 16 },
  documentText: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },
  attchmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imageAttachment: {
    width: 200,
    height: 200,
    borderRadius: 10,
    margin: 8,
  },
  imageAttachmentContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  attchmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
});
export default styles;
