import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LeftArrow } from '../assets/svg';
import { PopinsFont } from '../helpers/Fonts';

const AuthHeader = ({ title, onPress, height }) => {
  return (
    <View style={[styles.container, { height: height ? height : 80 }]}>
      <TouchableOpacity style={styles.iconButton} onPress={onPress}>
        <LeftArrow style={{ height: 25, width: 25 }} />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}

      {/* empty view to balance center alignment */}
      <View style={styles.rightSpace} />
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },

  iconButton: {
    backgroundColor: '#FFFFFF',
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: PopinsFont.medium,
  },

  rightSpace: {
    width: 40,
  },
});
