// import { Image, View } from 'react-native';
// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import CustomDrawer from './CustomDrawer';
// import ContractorStack from '../ContractorStack';
// import AppColor from '../../../helpers/AppColor';
// import {
//   HomeDrawer,
//   SearchDrawer,
//   MyJobsDrawer,
//   MyReviwesDrawer,
// } from '../../../assets/svg';
// import { PopinsFont } from '../../../helpers/Fonts';
// import { images } from '../../../assets/images';
// import SearchJobs from '../../../screens/main/Contractor/SearchJobs';
// import MyBids from '../../../screens/main/Contractor/MyBids';
// import MyJobs from '../../../screens/main/Contractor/MyJobs';
// import MyReviews from '../../../screens/main/Contractor/MyReviews';
// const Drawer = createDrawerNavigator();

// const ContractorDrawer = () => {
//   const screensArray = [
//     { name: 'Home', component: ContractorStack, icon: HomeDrawer },
//     { name: 'Search Jobs', component: SearchJobs, icon: SearchDrawer },
//     { name: 'My Jobs', component: MyJobs, icon: MyJobsDrawer },
//     { name: 'My Bids', component: MyBids, icon: HomeDrawer },
//     { name: 'My Reviews', component: MyReviews, icon: MyReviwesDrawer },
//   ];

//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawer {...props} />}
//       initialRouteName="Home"
//       initialParams={{ fromDrawer: true }}
//       screenOptions={{
//         headerShown: false,
//         drawerType: 'front', // full screen overlay
//         drawerStyle: {
//           width: '100%', // full screen
//           backgroundColor: AppColor.white,
//         },
//         drawerActiveTintColor: AppColor.blue,
//         drawerActiveBackgroundColor: 'transparent',
//       }}
//     >
//       {screensArray.map((screen, index) => (
//         <Drawer.Screen
//           key={index}
//           name={screen.name} // unique screen name
//           component={screen.component}
//           options={{
//             drawerLabel: screen.name,
//             drawerLabelStyle: {
//               color: AppColor.black,
//               fontSize: 18,
//               fontFamily: PopinsFont.regular,
//             },
//             drawerIcon: () => (
//               <View
//                 style={{
//                   height: 40,
//                   width: 40,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 {screen.name === 'My Bids' ? (
//                   <Image
//                     source={images.bids}
//                     style={{ height: 25, width: 25 }}
//                     resizeMode={'contain'}
//                   />
//                 ) : (
//                   <screen.icon style={{ height: 25, width: 25 }} />
//                 )}
//               </View>
//             ),
//           }}
//         />
//       ))}
//     </Drawer.Navigator>
//   );
// };

// export default ContractorDrawer;
