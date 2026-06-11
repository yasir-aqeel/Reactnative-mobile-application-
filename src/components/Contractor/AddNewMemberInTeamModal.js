import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import ModalHeader from './ModalHeader';
import { SearchIcon } from '../../assets/svg';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets/images';
import Button from '../Button';
import { Dropdown } from 'react-native-element-dropdown';
const AddNewMemberInTeamModal = ({ visible, onClose }) => {
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [value, setValue] = useState(null);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const userImages = [
    {
      image: images.user1,
      id: '1',
    },
    {
      image: images.user2,
      id: '2',
    },
    {
      image: images.user3,
      id: '3',
    },
    {
      image: images.user4,
      id: '4',
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <ModalHeader title={'Add Member'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={images.inviteTeam}
              style={{ height: 100, width: '100%' }}
              resizeMode="contain"
            />

            <Text style={styles.invite}>Invite via email</Text>

            <View style={styles.search}>
              <View style={styles.row}>
                <SearchIcon style={styles.sideIcon} fill={'#6A6A6A'} />
                <TextInput
                  style={styles.textArea}
                  placeholder="Enter Team member email"
                  placeholderTextColor={'#6A6A6A'}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  textAlignVertical="center"
                  textAlign="left"
                  cursorColor={AppColor.primaryBlue}
                />
              </View>
            </View>
            <Text style={styles.role}>Select Role</Text>
            <View style={styles.dropDowncontainer}>
              <Dropdown
                disable={true}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Worker'}
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>

            <View style={styles.box}>
              <Text style={styles.link}>Or copy the link</Text>

              <View style={styles.box1}>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.link}>
                    https://www.fixrli.com/hjfh6dj
                  </Text>
                </View>
                <Button
                  text={'Copy Link'}
                  color={'#FFF'}
                  backgroundColor={'#009FD9'}
                  height={Spacing.xl3}
                  width={98}
                  borderRadius={Spacing.s}
                  fontFamily={PopinsFont.medium}
                  fontSize={FontSizes.m}
                  lineHeight={Spacing.xl}
                  marginLeft={5}
                />
              </View>
            </View>
            <View style={styles.actions}>
              <Button
                text={'Not Now'}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                color={'#2A2A2A'}
                flex={1}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.s}
                lineHeight={FontSizes.s}
                height={44}
                borderRadius={FontSizes.s}
                onPress={onClose}
              />
              <Button
                text={'Invite'}
                backgroundColor={'#009FD9'}
                borderColor={'#009FD9'}
                borderWidth={1}
                color={'#FFF'}
                flex={1}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.s}
                lineHeight={FontSizes.l}
                height={44}
                borderRadius={FontSizes.s}
                onPress={onClose}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sheetContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    width: '100%',
  },

  sideIcon: { height: 20, width: 20 },
  textArea: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#F1F1F1',
    height: 44,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  dropDowncontainer: {
    backgroundColor: '#FFF',
    // paddingVertical: 10,
    width: '100%',
    marginBottom: 12,
  },
  dropdown: {
    height: 44,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    paddingHorizontal: 8,
    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  placeholderStyle: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    height: 44,
    width: '100%',
    borderRadius: Spacing.s,
    padding: Spacing.s,
  },
  invite: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.m,
    marginVertical: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  role: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.m,
    marginVertical: 8,
  },
  box: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingHorizontal: 5,
  },
  link: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.m,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: Spacing.s,
    marginVertical: 8,
    height: 44,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 5,
    gap: 5,
    width: '100%',
  },
  link: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    textAlign: 'left',
  },
  actions: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    width: '100%',
    marginTop: 24,
  },
});

export default AddNewMemberInTeamModal;
