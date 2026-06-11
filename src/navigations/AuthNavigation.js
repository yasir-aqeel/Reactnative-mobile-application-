import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import LoginViaOTP from '../screens/auth/LoginViaOTP';
import ForgetPassword from '../screens/auth/ForgetPassword';
import OTPVerification from '../screens/auth/OTPVerification';
import ResetPassowrd from '../screens/auth/ResetPassowrd';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import OnBoarding from '../screens/auth/OnBoarding';
import EmailVerification from '../screens/auth/EmailVerification';
import VerifyMFALogin from '../screens/auth/VerifyMFALogin';
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="loginViaOtp" component={LoginViaOTP} />
      <Stack.Screen name="forgetPassword" component={ForgetPassword} />
      <Stack.Screen name="otp" component={OTPVerification} />
      <Stack.Screen name="resetPassword" component={ResetPassowrd} />
      <Stack.Screen name="emailVerification" component={EmailVerification} />

      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="onBoarding" component={OnBoarding} />
      <Stack.Screen name="verifyMFALogin" component={VerifyMFALogin} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
