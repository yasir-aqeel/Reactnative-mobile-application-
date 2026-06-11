import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Spacing, FontSizes } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import { images } from '../../assets/images';
import { CurvedArrow, RatingStart } from '../../assets/svg';
import moment from 'moment';

const ReviewsCard = ({ item }) => {
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
    <View style={styles.card}>
      <View style={styles.view1}>
        <Text style={styles.text1}>Team</Text>
        {userImages.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginRight: -10,
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

      <View style={styles.tagsRow}>
        <View style={styles.view2}>
          <Text style={styles.text2}>
            {item.fromUser?.firstName + '' + item.fromUser?.lastName} •
          </Text>
          <Text style={styles.text3}>
            {' '}
            {moment(item.createdAt).format('MM-DD-YYYY')}{' '}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <RatingStart style={{ height: 17, width: 17 }} fill={'#FF8D28'} />
          <Text style={styles.text4}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.view3}>
        <Text style={styles.text5}>{item.comment}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.view4}>
        <Text style={styles.text6}>Job ID •</Text>
        <View style={styles.grayView}>
          <Text style={styles.grayText}>{item?.job?.displayId}</Text>
          <CurvedArrow style={{ height: 11, width: 11 }} fill={'#2A2A2A'} />
        </View>
      </View>
    </View>
  );
};

export default ReviewsCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingTop: Spacing.s,
    // paddingBottom: Spacing.xs,
    borderRadius: Spacing.s,
    width: '100%',
  },

  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xs,
    marginVertical: 16,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    gap: 2,
    width: '35%',
    marginLeft: 8,
  },
  text1: {
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
  },
  img: {
    width: 25,
    height: 25,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#fff', // white ring
    backgroundColor: '#eee', // fallback bg
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  text2: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
  },
  text3: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  text4: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
  },
  view3: {
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  text5: {
    color: '#444444',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  divider: {
    height: 1,
    backgroundColor: '#E1E1E1',
    width: '100%',
  },
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 8,
    marginLeft: 5,
  },
  text6: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  grayView: {
    paddingVertical: Spacing.xxs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  grayText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: FontSizes.l,
    color: '#404040',
  },
});
