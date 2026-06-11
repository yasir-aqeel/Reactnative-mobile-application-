import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../screens/main/Contractor/Notifications';
import MyJobsDetail from '../../screens/main/Contractor/MyJobsDetail';
import ContractorTabs from './ContractorBottomTab';
import MyBids from '../../screens/main/Contractor/MyBids';
import Invitations from '../../screens/main/Contractor/Invitations';
import JobFeedDetails from '../../screens/main/Contractor/JobFeedDetails';
import MakeOffer from '../../screens/main/Contractor/MakeOffer';
import Teams from '../../screens/main/Contractor/Teams';
import TeamMemberDetails from '../../screens/main/Contractor/TeamMemberDetails';
import Reviews from '../../screens/main/Contractor/Reviews';
import Profile from '../../screens/main/Contractor/Profile';
import EditProfile from '../../screens/main/Contractor/EditProfile';
import Settings from '../../screens/main/Contractor/Settings';
import LinkBankAccount from '../../screens/main/Contractor/LinkBankAccount';
import Subscription from '../../screens/main/Contractor/Subscription';
import Security from '../../screens/main/Contractor/Security';
import NotificationSettings from '../../screens/main/Contractor/NotificationSettings';
import Enable2FA from '../../screens/main/Contractor/Enable2FA';
import Enable2FAOTP from '../../screens/main/Contractor/Enable2FAOTP';
import BusinessDetails from '../../screens/main/Contractor/BusinessDetails';
import MessagesScreen from '../../screens/main/Contractor/MessagesScreen';
import MessagesInboxScreen from '../../screens/main/Contractor/MessagesInboxScreen';
import UpdatePassowrd from '../../screens/main/Contractor/UpdatePassowrd';
import Roles from '../../screens/main/Contractor/Roles';

const ContractorStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={ContractorTabs} />
      <Stack.Screen name="MyJobsDetail" component={MyJobsDetail} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="MyBids" component={MyBids} />
      <Stack.Screen name="Invitations" component={Invitations} />
      <Stack.Screen name="JobFeedDetails" component={JobFeedDetails} />
      <Stack.Screen name="MakeOffer" component={MakeOffer} />
      <Stack.Screen name="Teams" component={Teams} />
      <Stack.Screen name="TeamMemberDetails" component={TeamMemberDetails} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="LinkBankAccount" component={LinkBankAccount} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
      />
      <Stack.Screen name="Enable2FA" component={Enable2FA} />
      <Stack.Screen name="Enable2FAOTP" component={Enable2FAOTP} />
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen
        name="MessagesInboxScreen"
        component={MessagesInboxScreen}
      />
      <Stack.Screen name="updatePassword" component={UpdatePassowrd} />
      <Stack.Screen name="roles" component={Roles} />
    </Stack.Navigator>
  );
};

export default ContractorStack;
