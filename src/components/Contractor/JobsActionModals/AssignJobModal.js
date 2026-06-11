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

import { PopinsFont } from '../../../helpers/Fonts';
import AppColor from '../../../helpers/AppColor';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import ModalHeader from '../ModalHeader';
import { SearchIcon } from '../../../assets/svg';
import { images } from '../../../assets/images';
import Button from '../../Button';

const AssignJobModal = ({ visible, onClose, state }) => {
  const [search, setSearch] = useState('');
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

  if (!visible || !state) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <ModalHeader title={'Assign Job'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.text1}>Search Member</Text>
            <View style={styles.view1}>
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
              <Button
                text={'Invite'}
                color={'#FFF'}
                backgroundColor={'#009FD9'}
                height={Spacing.xl3}
                width={70}
                borderRadius={Spacing.s}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.m}
                lineHeight={Spacing.xl}
              />
            </View>
            <View style={styles.view2}>
              <View style={styles.view3}>
                <Text style={styles.text2}>Assigned Member</Text>
              </View>
              <View style={styles.imageRow}>
                {userImages.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        marginRight: -20,
                        zIndex: userImages.length - index,
                      }}
                    >
                      <Image
                        source={item.image}
                        style={styles.img}
                        resizeMode="cover"
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.view4}>
              <Text style={styles.text3}>Or copy the link</Text>

              <View style={styles.view5}>
                <View style={styles.view6}>
                  <View>
                    <Text style={styles.text4}>
                      https://www.fixrli.com/hjfh6dj
                    </Text>
                  </View>
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
  contentContainerStyle: { paddingHorizontal: 10 },
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
  },
  text1: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.m,
    marginBottom: 8,
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    height: 44,
    width: '100%',
    borderRadius: Spacing.s,
    padding: Spacing.s,
    marginVertical: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  view2: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: Spacing.s,
    padding: Spacing.xs,
    width: '100%',
  },
  view3: { alignItems: 'flex-start', marginVertical: 8 },
  text2: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.s,
    fontSize: FontSizes.m,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 5,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#fff', // white ring
    backgroundColor: '#eee', // fallback bg
  },
  view4: {
    backgroundColor: '#F1F1F1',
    width: '100%',
    borderRadius: Spacing.s,
    paddingVertical: Spacing.s,
    paddingHorizontal: 5,
    marginVertical: 8,
  },
  text3: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.m,
  },
  view5: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: Spacing.s,
    marginVertical: 8,
    height: 44,
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    gap: 5,
    width: '100%',
  },
  view6: { alignItems: 'flex-start' },
  text4: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    textAlign: 'left',
  },
});

export default AssignJobModal;
