import MainNavigation from './MainNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppColor from '../helpers/AppColor';
import { StyleSheet } from 'react-native';

const RootNavigation = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <MainNavigation />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
});
export default RootNavigation;
