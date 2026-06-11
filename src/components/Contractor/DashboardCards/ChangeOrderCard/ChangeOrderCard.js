import React from 'react';
import { View, Text } from 'react-native';
import {
  CheckIcon,
  CurvedArrow,
  EyeIcon,
  Globe,
  RejectIcon,
} from '../../../../assets/svg';
import { FontSizes } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../Button';
import styles from './style';

const ChangeOrderCard = ({ item, navigation }) => {
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

        <View style={styles.jobIdView}>
          <Text style={styles.idText}>{item?.jobId}</Text>
          <CurvedArrow style={styles.curve} />
        </View>
        <View style={styles.orangeView}>
          <Text style={styles.orangeText}>Change Order</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Budget</Text>

          <Text style={styles.infoValue}>{item.budget}</Text>
        </View>

        <View style={styles.divider} />
        <View style={styles.locationInner}>
          <Text style={styles.messageText}>Message</Text>
          <Text numberOfLines={2} style={styles.messageValue}>
            {item.message}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          text={'Cancel'}
          backgroundColor={'#FFECEC'}
          borderColor={'#FFD7D8'}
          borderWidth={1}
          color={'#CC2D30'}
          flex={1}
          leftIcon={<RejectIcon style={{ height: 16, width: 16 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={36}
          borderRadius={FontSizes.s}
        />

        <Button
          text={'View'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={1}
          leftIcon={<EyeIcon style={{ height: 16, width: 16 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={36}
          borderRadius={FontSizes.s}
        />
        <Button
          text={'Approve'}
          backgroundColor={'#ECF9F3'}
          borderColor={'#B2E5CE'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={1}
          leftIcon={<CheckIcon style={{ height: 16, width: 16 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={36}
          borderRadius={FontSizes.s}
        />
      </View>
    </View>
  );
};

export default ChangeOrderCard;
