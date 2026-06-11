import React from 'react';
import { View, Text } from 'react-native';
import {
  CurvedArrow,
  Globe,
  JobsIcon,
  MakeOfferButtonIcon,
} from '../../../assets/svg';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import Button from '../../Button';
import styles from './style';

const MessagesOfferCard = ({ item, navigation }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.name} <Text style={styles.highlight}>{item.location}</Text>
      </Text>
      <Text style={styles.address}>{item.address}</Text>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Globe style={styles.globe} />
          <Text style={styles.text}>{item.type}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.jobIdView}>
            <Text style={styles.idText}>{item?.jobId}</Text>
            <CurvedArrow style={styles.curve} />
          </View>
        </View>
      </View>
      <View style={styles.budgetView}>
        <Text style={styles.budgetLabel}>Budget</Text>
        <Text style={styles.budgetValue}>{item.budget}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          text={'Make an offer'}
          backgroundColor={'#009FD9'}
          color={'#fff'}
          width={'100%'}
          borderRadius={FontSizes.s}
          leftIcon={<MakeOfferButtonIcon style={{ height: 14, width: 15 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={Spacing.xl5}
          onPress={() => navigation.navigate('MakeOffer')}
        />
        <Button
          text={'View Job'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          width={'100%'}
          leftIcon={<JobsIcon style={{ height: 14, width: 14 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={Spacing.xl5}
          borderRadius={FontSizes.s}
          onPress={() => navigation.navigate('MyJobsDetail')}
        />
      </View>
    </View>
  );
};

export default MessagesOfferCard;
