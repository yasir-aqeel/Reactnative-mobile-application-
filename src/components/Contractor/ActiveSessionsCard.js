import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
const ActiveSessionsCard = ({ item, index }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageView}>
        <Image
          source={item.imagae}
          style={{ height: 40, width: 40 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ width: '80%' }}>
        <View style={styles.row}>
          <Text style={styles.sessionName}>{item.name}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.logout}>Sign Out</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.row}>
          <Text style={styles.current}> Current Session </Text>
          {/* <Text style={styles.dot}> • </Text> */}
          {/* <Text style={styles.location}> {item.location} </Text> */}
        </View>
      </View>
    </View>
  );
};

export default ActiveSessionsCard;

const styles = StyleSheet.create({
  sessionName: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    marginBottom: 5,
  },
  logout: {
    color: '#FF383C',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    marginBottom: 5,
  },
  dot: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.medium,
    fontSize: 14,
    lineHeight: 18,
  },
  current: {
    color: '#009FD9',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  location: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  card: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xs,
    borderRadius: Spacing.s,
    marginTop: 8,
    gap: 5,
    width: '100%',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: Spacing.xs,
    height: 70,
    width: 70,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
