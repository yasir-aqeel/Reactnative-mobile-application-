import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { CloseDrawer } from '../../assets/svg';
const ModalHeader = ({ title, onPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <CloseDrawer style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#F1F1F1',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: FontSizes.l,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },
  iconContainer: {
    backgroundColor: '#F1F1F1',
    height: 36,
    width: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { height: 15, width: 15 },
});
