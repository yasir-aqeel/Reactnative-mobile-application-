// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from '@react-navigation/drawer';
// import styles from './style';
// import { CloseDrawer } from '../../../assets/svg';
// import { useDispatch } from 'react-redux';

// import { images } from '../../../assets/images';
// import {
//   useBidsScreenInSearchJobs,
//   useMyJobsScreenInSearchJobs,
// } from '../../../redux/actions/contractorActions';
// import { PopinsFont } from '../../../helpers/Fonts';
// import AppColor from '../../../helpers/AppColor';

// const CustomDrawer = props => {
//   const dispatch = useDispatch();

//   // You can intercept clicks here
//   const handleDrawerItemPress = screenName => {
//     // Bids Screens
//     if (screenName === 'My Bids') {
//       dispatch(useBidsScreenInSearchJobs(false));
//     }

//     if (screenName === 'Search Jobs') {
//       dispatch(useBidsScreenInSearchJobs(true));
//       dispatch(
//         useMyJobsScreenInSearchJobs({
//           isMyJobScreenShow: true,
//           type: 'job_in_process',
//         }),
//       );
//     }

//     if (screenName === 'My Jobs') {
//       dispatch(
//         useMyJobsScreenInSearchJobs({
//           isMyJobScreenShow: false,
//           type: '',
//         }),
//       );
//     }

//     props.navigation.navigate(screenName);
//   };

//   return (
//     <View style={styles.mainConatiner}>
//       {/* Top header */}
//       <View style={styles.topView}>
//         <View style={styles.textView}>
//           <Text style={styles.fixrliText}>FIXRLI</Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => props.navigation.toggleDrawer()}
//           style={styles.iconContainer}
//         >
//           <CloseDrawer style={styles.icon} />
//         </TouchableOpacity>
//       </View>

//       {/* Drawer items */}
//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
//       >
//         <View style={styles.contentView}>
//           {props.state.routeNames.map((name, index) => {
//             // Get icon for screen
//             const screen = props.state.routes[index];
//             const icon = (() => {
//               if (name === 'My Bids')
//                 return (
//                   <Image
//                     source={images.bids}
//                     style={{ height: 25, width: 25, left: 5 }}
//                   />
//                 );
//               const matchedScreen =
//                 props.descriptors[screen.key]?.options?.drawerIcon;
//               return matchedScreen ? matchedScreen() : null;
//             })();

//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   padding: 16,
//                 }}
//                 onPress={() => handleDrawerItemPress(name)}
//               >
//                 {icon}
//                 <Text
//                   style={{
//                     marginLeft: 16,
//                     fontSize: 18,
//                     fontFamily: PopinsFont.regular,
//                     color: AppColor.black,
//                     left: screen.name === 'My Bids' ? 15 : 0,
//                   }}
//                 >
//                   {name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* Bottom links */}
//         <View style={styles.bottomView}>
//           <TouchableOpacity style={styles.touch}>
//             <Text style={styles.text}>Help</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.touch}>
//             <Text style={styles.text}>Privacy Policy</Text>
//           </TouchableOpacity>
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   );
// };

// export default CustomDrawer;
