import { StyleSheet } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
const styles = StyleSheet.create({
  container: { flex: 1 },
  mainView: {
    marginTop: 30,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },

  headingMain: {
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: 14,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    paddingTop: 12,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    width: '90%',
    alignSelf: 'center',
    height: '80%',
  },

  heading: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 6,
    fontFamily: PopinsFont.bold,
    color: '#2A2A2A',
  },

  text: {
    fontSize: 13,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },
  title: {
    fontSize: 22,
    fontFamily: PopinsFont.semiBold,
    marginBottom: 10,
    color: '#2A2A2A',
  },

  subHeader: {
    fontSize: 13,
    color: '#2A2A2A',
    marginBottom: 15,
    fontFamily: PopinsFont.medium,
  },

  text: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
  },

  bullet: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
  },
});
export default styles;
