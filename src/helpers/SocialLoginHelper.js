import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import { showToast } from './ToastConfig';

GoogleSignin.configure({
  webClientId:
    '87666115597-n9a3ivfun8i7gbv9ebr3pp7e64d825a2.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  scopes: ['profile', 'email'],
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();

    const googleIdToken = userInfo?.data?.idToken;

    if (!googleIdToken) {
      showToast('error', 'No Google ID token found');
      return;
    }

    // 2️⃣ Firebase Auth login
    const googleCredential = auth.GoogleAuthProvider.credential(googleIdToken);

    const userCredential = await auth().signInWithCredential(googleCredential);

    const user = userCredential.user;

    // 3️⃣ IMPORTANT FIX: Firebase ID Token (NOT Google token)
    const firebaseIdToken = await auth().currentUser.getIdToken(true);

    const finaluserData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      provider: 'google',
      idToken: firebaseIdToken, // ✅ FIXED
    };

    return finaluserData;
  } catch (error) {
    console.log('Google Login Error:', error);

    switch (error.code) {
      case 'SIGN_IN_CANCELLED':
        console.log('User cancelled login');
        break;

      case 'IN_PROGRESS':
        console.log('Sign in already in progress');
        break;

      case 'PLAY_SERVICES_NOT_AVAILABLE':
        console.log('Play services not available');
        break;

      case 'DEVELOPER_ERROR':
        console.log('Check SHA / WebClientId / google-services.json');
        break;

      default:
        console.log('Error:', error.message);
    }

    throw error;
  }
};

export const signInWithApple = async () => {
  try {
    if (!appleAuth.isSupported) {
      showToast('info', 'Apple Sign-In not supported on this device');
      return;
    }

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken, nonce, fullName } = appleAuthRequestResponse;

    if (!identityToken) {
      showToast('error', 'Apple Sign-In failed - no identity token');
      return;
    }

    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    const userCredential = await auth().signInWithCredential(appleCredential);

    const user = userCredential.user;

    const name =
      fullName?.givenName || fullName?.familyName
        ? `${fullName?.givenName || ''} ${fullName?.familyName || ''}`.trim()
        : user.displayName;

    // 🔥 FIX: Firebase token instead of Apple identityToken
    const firebaseIdToken = await auth().currentUser.getIdToken(true);

    return {
      uid: user.uid,
      name,
      email: user.email,
      photo: user.photoURL,
      idToken: firebaseIdToken, // ✅ FIXED
      provider: 'apple',
    };
  } catch (error) {
    console.log('Apple Login Error:', error);

    switch (error.code) {
      case appleAuth.Error.CANCELED:
        console.log('User cancelled Apple login');
        break;
      case appleAuth.Error.FAILED:
        console.log('Apple login failed');
        break;
      case appleAuth.Error.INVALID_RESPONSE:
        console.log('Invalid Apple response');
        break;
      case appleAuth.Error.NOT_HANDLED:
        console.log('Apple login not handled');
        break;
      default:
        console.log('Error:', error.message);
    }

    throw error;
  }
};
