import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import AuthNavigation from './AuthNavigation';
import ContractorStack from './ContractorMain/ContractorStack';
const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="auth" component={AuthNavigation} />
      <Stack.Screen name="Contractor" component={ContractorStack} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
