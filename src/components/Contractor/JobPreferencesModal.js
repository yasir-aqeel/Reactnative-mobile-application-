// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   Switch,
//   FlatList,
// } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AppColor from '../../helpers/AppColor';
// import { PopinsFont } from '../../helpers/Fonts';
// import Button from '../Button';

// const distanceArray = [
//   {
//     distance: '5 mi',
//     id: '5_mi',
//     key: '5_mi',
//   },
//   {
//     distance: '10 mi',
//     id: '10_mi',
//     key: '10_mi',
//   },
//   {
//     distance: '15 mi',
//     id: '15_mi',
//     key: '15_mi',
//   },
//   {
//     distance: '30 mi',
//     id: '30_mi',
//     key: '30_mi',
//   },
//   {
//     distance: '60 mi',
//     id: '60_mi',
//     key: '60_mi',
//   },
//   {
//     distance: '100 mi',
//     id: '100_mi',
//     key: '100_mi',
//   },
// ];

// const JobPreferencesModal = ({ props }) => {
//   return (
//     <Modal
//       visible={props.showFilterModal}
//       animationType="slide"
//       transparent
//       statusBarTranslucent
//     >
//       <SafeAreaView edges={['bottom', 'top']} style={styles.overlay}>
//         <View style={styles.container}>
//           <View>
//             <Text style={styles.header}>Job Preferences Filters</Text>

//             <FlatList
//               data={props.categories}
//               keyExtractor={(item, index) => index.toString()}
//               showsVerticalScrollIndicator={false}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.checkboxRow}
//                   onPress={() => {
//                     props.setJobModalFilter(prev => {
//                       const exists = prev.categories.includes(item);

//                       return {
//                         ...prev,
//                         categories: exists
//                           ? prev.categories.filter(cat => cat !== item) // remove
//                           : [...prev.categories, item], // add
//                       };
//                     });
//                   }}
//                 >
//                   <View
//                     style={[
//                       styles.checkbox,
//                       props.jobModalFilter.categories.includes(item) &&
//                         styles.checkboxActive,
//                     ]}
//                   />
//                   <Text style={styles.checkboxText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               ListHeaderComponent={
//                 <>
//                   <View style={styles.row}>
//                     <Text style={styles.title}>Distance from Me</Text>
//                     <Switch
//                       value={props.jobModalFilter.enableDistance}
//                       onValueChange={() => {
//                         props.setJobModalFilter(prev => ({
//                           ...prev,
//                           enableDistance: !prev.enableDistance,
//                           distance: !prev.enableDistance ? 0 : prev.distance,
//                         }));
//                       }}
//                       trackColor={{
//                         false: '#DFDFDF',
//                         true: AppColor.primaryBlue,
//                       }}
//                       thumbColor={
//                         props.jobModalFilter.enableDistance
//                           ? AppColor.white
//                           : '#FFF'
//                       }
//                       ios_backgroundColor="#3e3e3e"
//                     />
//                   </View>

//                   <View style={styles.sliderWrapper}>
//                     <View style={styles.sliderTrack} />
//                     <Slider
//                       disabled={!props.jobModalFilter.enableDistance}
//                       style={styles.slider}
//                       minimumValue={5}
//                       maximumValue={100}
//                       step={1}
//                       value={props.jobModalFilter.distance}
//                       onValueChange={distance => {
//                         props.setJobModalFilter(prev => ({
//                           ...prev,
//                           distance: distance,
//                         }));
//                       }}
//                       minimumTrackTintColor="#1DA1F2"
//                       maximumTrackTintColor="transparent"
//                       thumbTintColor="#474747"
//                     />
//                   </View>
//                   <View style={styles.sliderLabels}>
//                     {distanceArray.map(item => {
//                       return (
//                         <Text key={item.key} style={styles.text}>
//                           {item.distance}
//                         </Text>
//                       );
//                     })}
//                   </View>
//                   {/* Categories */}
//                   <Text style={styles.title}>Job Category</Text>
//                 </>
//               }
//               ListFooterComponent={
//                 <>
//                   {/* Bid Type */}
//                   <Text style={styles.title}>Bid Type</Text>

//                   <View style={styles.radioRow}>
//                     {['All', 'FIXED_BID', 'T_AND_M'].map(type => (
//                       <TouchableOpacity
//                         key={type}
//                         style={styles.radioItem}
//                         onPress={() => {
//                           props.setJobModalFilter(prev => ({
//                             ...prev,
//                             jobType: type,
//                           }));
//                         }}
//                       >
//                         <View
//                           style={[
//                             styles.radio,
//                             props.jobModalFilter.jobType === type &&
//                               styles.radioActive,
//                           ]}
//                         />

//                         <Text>{type}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>

//                   {/* Direct Assignment */}
//                   <View style={styles.row}>
//                     <View>
//                       <Text style={styles.title}>Direct Assignments Only</Text>
//                       <Text style={styles.sub}>
//                         Show only jobs assigned directly to you.
//                       </Text>
//                     </View>

//                     <Switch
//                       value={props.jobModalFilter.isDirectAssignmentOnly}
//                       onValueChange={() => {
//                         props.setJobModalFilter(prev => ({
//                           ...prev,
//                           isDirectAssignmentOnly: !prev.isDirectAssignmentOnly,
//                         }));
//                       }}
//                       trackColor={{
//                         false: '#DFDFDF',
//                         true: AppColor.primaryBlue,
//                       }}
//                       thumbColor={
//                         props.jobModalFilter.isDirectAssignmentOnly
//                           ? AppColor.white
//                           : '#FFF'
//                       }
//                       ios_backgroundColor="#3e3e3e"
//                     />
//                   </View>
//                   {/* Buttons */}
//                   <View style={styles.buttonRow}>
//                     <Button
//                       text={'CANCLE'}
//                       color={AppColor.black}
//                       backgroundColor={AppColor.grayBackground}
//                       height={40}
//                       width={'45%'}
//                       borderRadius={10}
//                       onPress={() => props.onClose('close')}
//                       fontFamily={PopinsFont.semiBold}
//                       fontSize={15}
//                     />
//                     <Button
//                       text={'APPLY'}
//                       color={AppColor.white}
//                       backgroundColor={AppColor.primaryBlue}
//                       height={40}
//                       width={'45%'}
//                       borderRadius={10}
//                       fontFamily={PopinsFont.semiBold}
//                       fontSize={15}
//                       onPress={() => props.onClose('apply')}
//                     />
//                   </View>
//                 </>
//               }
//             />
//           </View>
//         </View>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// export default JobPreferencesModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },

//   container: {
//     height: '100%',
//     backgroundColor: AppColor.white,
//     padding: 20,
//     paddingBottom: 50,
//   },

//   header: {
//     fontSize: 15,
//     fontFamily: PopinsFont.semiBold,
//     color: AppColor.primaryBlue,
//     marginBottom: 20,
//   },

//   title: {
//     fontSize: 15,
//     fontFamily: PopinsFont.medium,
//     color: AppColor.black,
//     marginVertical: 5,
//   },

//   sub: {
//     fontSize: 12,
//     fontFamily: PopinsFont.regular,
//     color: AppColor.black,
//     // marginTop: 3,
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   sliderLabels: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     width: '100%',
//   },

//   text: {
//     fontFamily: PopinsFont.medium,
//     color: AppColor.black,
//     fontSize: 10,
//     textAlign: 'center',
//     flex: 1,
//   },

//   checkboxRow: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 8,
//     alignItems: 'center',
//     marginVertical: 3,
//   },
//   checkbox: {
//     width: 18,
//     height: 18,
//     borderWidth: 1,
//     borderColor: '#D9D9D9',
//     backgroundColor: '#D9D9D9',
//     marginRight: 10,
//     justifyContent: 'center',
//   },

//   checkboxActive: {
//     backgroundColor: AppColor.primaryBlue,
//     borderWidth: 2,
//   },

//   checkboxText: {
//     fontSize: 15,
//     fontFamily: PopinsFont.regular,
//     color: AppColor.black,
//     marginLeft: 5,
//   },

//   radioRow: {
//     flexDirection: 'row',
//     marginVertical: 15,
//   },

//   radioItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 25,
//   },

//   radio: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#D9D9D9',
//     marginRight: 6,
//   },

//   radioActive: {
//     backgroundColor: AppColor.primaryBlue,
//     borderWidth: 3,
//   },

//   buttonRow: {
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//   },

//   sliderWrapper: {
//     width: '95%',
//     height: 40,
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },

//   sliderTrack: {
//     position: 'absolute',
//     width: '100%',
//     height: 8,
//     backgroundColor: '#E5E5E5',
//     borderRadius: 10,
//   },

//   slider: {
//     width: '106%',
//     height: 40,
//     marginHorizontal: -8,
//   },
// });
