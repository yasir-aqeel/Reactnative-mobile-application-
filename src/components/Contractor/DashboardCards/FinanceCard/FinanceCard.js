import React from 'react';
import { View, Text } from 'react-native';
import { CurvedArrow, EyeIcon, Globe } from '../../../../assets/svg';
import { FontSizes } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../Button';
import { getStatusLabel, statusColors } from '../../../../helpers/Data';
import styles from './style';

const Info = ({ label, value, isFull, showDot }) => {
  return (
    <View style={[styles.infoBox, isFull && { flex: 2 }]}>
      <Text style={styles.infoLabel}>{label}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {showDot && (
          <View
            style={{
              height: 11,
              width: 11,
              borderRadius: 10,
              backgroundColor: statusColors[value?.toUpperCase()],
            }}
          />
        )}

        <Text numberOfLines={1} style={styles.infoValue}>
          {showDot ? getStatusLabel(value) : value}
        </Text>
      </View>
    </View>
  );
};

const FinanceCard = ({ item, openModal }) => {
  // console.log('FinanceCard item', item);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.jobTitle} <Text style={styles.highlight}>{item.location}</Text>
      </Text>
      {/* <Text style={styles.address}>{item.address}</Text> */}

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Globe style={styles.globe} />
          <Text style={styles.typeText}>Public</Text>
        </View>
        <View style={styles.grayView}>
          <Text style={styles.grayText}>{item?.displayId}</Text>
          <CurvedArrow style={styles.curve} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Info label={'Type'} value={'Job'} />
          <Info label="Payout" value={`$${item.jobAmount}`} />
          <Info label="Status" value={item.status} showDot />
        </View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <Button
          text={'View'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={1}
          leftIcon={<EyeIcon style={styles.sideIcon} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() => openModal('receipt_modal', item)}
        />
      </View>
    </View>
  );
};

export default FinanceCard;
