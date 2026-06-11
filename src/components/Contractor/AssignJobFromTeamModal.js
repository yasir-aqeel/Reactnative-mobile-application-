import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import ModalHeader from './ModalHeader';
import {
  CloseDrawer,
  CurvedArrow,
  Globe,
  MessageIcon,
  RatingStart,
  SearchIcon,
  VerifiedIcon,
} from '../../assets/svg';
import { images } from '../../assets/images';
import Button from '../Button';

const AssignJobFromTeamModal = ({ visible, onClose }) => {
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

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <ModalHeader title={'Assign Job'} onPress={() => onClose()} />
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.text}>Assigning to</Text>
            <View style={styles.topRow}>
              <View style={styles.secondRow}>
                <View style={styles.imageView}>
                  <Image
                    source={images.user1}
                    style={styles.image}
                    resizeMode="contain"
                  />

                  <View style={styles.greenDot} />
                </View>
                <View style={styles.nameContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.text}>Michael</Text>
                    <VerifiedIcon style={styles.verified} fill={'#009FD9'} />
                  </View>
                  <View style={styles.ratingView}>
                    <RatingStart style={styles.rating} />
                    <Text style={styles.text}>4.9</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.smsContainer}>
                <MessageIcon style={styles.message} fill={'#2A2A2A'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.search}>Search Member</Text>

            <View style={styles.view1}>
              <View style={styles.view2}>
                <SearchIcon style={styles.sideIcon} fill={'#6A6A6A'} />
                <TextInput
                  style={styles.textArea}
                  placeholder="Search Job"
                  placeholderTextColor={'#6A6A6A'}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  textAlignVertical="center"
                  textAlign="left"
                  cursorColor={AppColor.primaryBlue}
                />
              </View>
            </View>
            <View style={styles.jobDetailsCard}>
              <View style={styles.jobTitleRow}>
                <View>
                  <Text style={styles.title}>
                    Cleaning Job at{' '}
                    <Text style={styles.highlight}>Farmhouse</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.jobTitleRow}>
                <View style={styles.topRow1}>
                  <View style={styles.globe}>
                    <Globe style={{ height: 12, width: 12 }} fill={'#009FD9'} />
                    <Text style={styles.public}>Public</Text>
                  </View>
                  <View style={styles.grayView}>
                    <Text style={styles.grayText}>9209F5F</Text>
                    <CurvedArrow style={{ height: 11, width: 11 }} />
                  </View>
                </View>

                <CloseDrawer
                  style={{ height: 15, width: 15 }}
                  fill={'#000000'}
                />
              </View>
            </View>
            <View style={styles.view3}>
              <View style={styles.view4}>
                <Text style={styles.otherText}>Other Assigned Member</Text>
              </View>
              <View style={styles.view5}>
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

            <View style={styles.view6}>
              <Text style={styles.link}>Or copy the link</Text>

              <View style={styles.view7}>
                <View style={styles.view8}>
                  <View>
                    <Text style={styles.linkText}>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    padding: Spacing.s,
    borderRadius: Spacing.s,
  },
  secondRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  imageView: { position: 'relative' },
  image: { height: 50, width: 50 },
  greenDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    height: 12,
    width: 12,
    borderRadius: 100,
    backgroundColor: '#3DBE84',
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameContainer: { justifyContent: 'center' },
  nameRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  verified: { height: 17, width: 17 },
  ratingView: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  rating: { height: 13, width: 13 },
  smsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: Spacing.xl,
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#F1F1F1',
    borderWidth: 1,
  },
  message: { height: 22, width: 22 },
  jobDetailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: Spacing.s,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    width: '100%',
    marginBottom: 12,
  },
  jobTitleRow: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  topRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  globe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    backgroundColor: '#FFF',
    borderRadius: Spacing.s,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.xs,
    width: 75,
    alignSelf: 'flex-start',
    marginVertical: 5,
    gap: 5,
  },
  public: {
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.m,
  },
  title: {
    color: '#2A2A2A',
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
  },

  highlight: {
    color: '#009FD9',
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },

  budget: {
    fontSize: FontSizes.m,
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    lineHeight: Spacing.xl,
  },
  grayView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  grayText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  search: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.m,
    marginTop: 8,
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
  view2: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  view3: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: Spacing.s,
    padding: Spacing.xs,
    width: '100%',
  },
  view4: { alignItems: 'flex-start', marginVertical: 8 },
  otherText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.s,
    fontSize: FontSizes.m,
  },
  view5: {
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
  view6: {
    backgroundColor: '#F1F1F1',
    width: '100%',
    borderRadius: Spacing.s,
    paddingVertical: Spacing.s,
    paddingHorizontal: 5,
    marginVertical: 8,
  },
  link: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.m,
  },
  view7: {
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
  view8: { alignItems: 'flex-start' },
  linkText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    textAlign: 'left',
  },
  text: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
    fontSize: FontSizes.s,
    marginBottom: 8,
  },
});

export default AssignJobFromTeamModal;
