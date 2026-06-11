import React from 'react';
import { View, Text } from 'react-native';
import { CopyIcon } from '../../../assets/svg';
import { FontSizes } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';
import Button from '../../Button';
import styles from './style';
import { handleCopyText } from '../../../helpers/services';
const Info = ({ label, value }) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text
        style={[
          styles.infoValue,
          { color: label === 'Deadline' ? '#CC2D30' : '#2A2A2A' },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const TransactionsCard = ({ item, navigation, openModal }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.idView}>
          <Text style={styles.idText}>{item?.id}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Info label="Deadline" value={item.deadline} />
          <Info label="Status" value={item.date} />
        </View>
      </View>

      <Button
        text={item.transactionId}
        backgroundColor={'#F1F1F1'}
        color={'#2A2A2A'}
        width={'100%'}
        rightIcon={<CopyIcon style={styles.sideIcon} />}
        fontFamily={PopinsFont.medium}
        fontSize={FontSizes.s}
        lineHeight={FontSizes.l}
        height={40}
        borderRadius={FontSizes.s}
        onPress={() => handleCopyText(item.transactionId)}
      />
    </View>
  );
};

export default TransactionsCard;
