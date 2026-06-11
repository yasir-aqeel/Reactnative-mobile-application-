import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/main/Contractor/Dashboard';
import Notifications from '../../screens/main/Contractor/Notifications';
import MyJobs from '../../screens/main/Contractor/MyJobs';
import JobFeed from '../../screens/main/Contractor/JobFeed';
import Finance from '../../screens/main/Contractor/Finance';
import {
  FeedIcon,
  FinanceIcon,
  HomeIcon,
  JobsIcon,
  MoreIcon,
} from '../../assets/svg';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import MoreBottomSheet from '../../components/Contractor/MoreBottomSheet';
const Tab = createBottomTabNavigator();

const screensArray = [
  { name: 'Home', component: Dashboard, icon: HomeIcon },
  { name: 'Jobs', component: MyJobs, icon: JobsIcon },
  { name: 'Feed', component: JobFeed, icon: FeedIcon },
  { name: 'Finance', component: Finance, icon: FinanceIcon },
  { name: 'More', component: Notifications, icon: MoreIcon },
];
const ContractorTabs = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <View
      style={{
        width,
        height,
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          animation: 'none',
          tabBarStyle: {
            backgroundColor: AppColor.white,
            paddingBottom: 15,
            paddingHorizontal: 18,
            paddingBottom: 8,
            height: isLandscape ? '25%' : '17%',
          },
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 70,
                }}
              >
                {props.children}
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
      >
        {screensArray.map((screen, index) => (
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    color: focused ? '#2A2A2A' : '#888888',
                    fontSize: 12,
                    fontFamily: PopinsFont.regular,
                    top: 5,
                  }}
                >
                  {screen.name}
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    backgroundColor: focused ? '#CCECF7' : '#FFF',
                    borderRadius: 14,
                    height: 30,
                    width: 63,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <screen.icon
                    style={{ height: 20, width: 20 }}
                    fill={focused ? '#007FAE' : '#888888'}
                  />
                </View>
              ),
            }}
            key={index}
            name={screen.name}
            component={screen.component}
            listeners={({ route }) => ({
              tabPress: e => {
                if (route.name === 'More') {
                  e.preventDefault();
                  setSheetVisible(true);
                }
              },
            })}
          />
        ))}
      </Tab.Navigator>
      <MoreBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      />
    </View>
  );
};

export default ContractorTabs;
