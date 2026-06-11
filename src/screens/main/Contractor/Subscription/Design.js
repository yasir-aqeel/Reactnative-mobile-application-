import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './style';

import { UpgradePlan } from '../../../../assets/svg';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import { images } from '../../../../assets/images';

const Design = props => {
  return (
    <View style={styles.container}>
      <Header
        showBackIcon
        title={'Subscription'}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoContainer}
      >
        <View style={styles.topArray}>
          <Image
            source={images.pro}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Pro Package</Text>
          <View style={styles.innerRow}>
            <Text style={styles.text1}>Next Payment</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.date}>Jan 20, 2026</Text>
          </View>
          <Button
            text={'Upgrade Plan'}
            fontFamily={PopinsFont.medium}
            fontSize={FontSizes.m}
            color={'#2A2A2A'}
            width={'100%'}
            height={Spacing.xl6}
            backgroundColor={'#FFFFFF'}
            borderRadius={Spacing.s}
            marginTop={30}
            leftIcon={<UpgradePlan style={styles.sideIcon} fill={'#2A2A2A'} />}
          />
        </View>
        <View>
          <Image
            source={images.verified}
            style={styles.verified}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Design;
