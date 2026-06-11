import React from 'react';
import { View, Text } from 'react-native';
import {
  ActiveBids,
  CurvedArrow,
  EyeIcon,
  Globe,
} from '../../../../assets/svg';
import { FontSizes } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../Button';
import styles from './style';
import moment from 'moment';

const Info = ({ label, value }) => {
  const isPropertyOwner = label === 'Property Owner';

  return (
    <View
      style={[
        styles.infoBox,
        {
          flex: isPropertyOwner ? 2 : 1,
          borderRightWidth: isPropertyOwner ? 0 : 1,
        },
      ]}
    >
      <Text style={styles.infoLabel}>{label}</Text>

      <Text numberOfLines={1} style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
};

const InvitationsCard = ({ item, navigation }) => {
  const propertyOwner =
    item?.job?.client ||
    item?.propertyOwner ||
    item?.requestedBy ||
    item?.job?.postedBy;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item?.job?.title} {''}
        <Text style={styles.highlight}>{item.job?.property.name}</Text>
      </Text>
      <Text style={styles.address}>{item.job?.property.address}</Text>
      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Globe style={styles.globe} />
          <Text style={styles.typeText}>Public</Text>
        </View>

        <View style={styles.jobIdView}>
          <Text style={styles.idText}>{item?.job?.displayId}</Text>
          <CurvedArrow style={styles.curve} />
        </View>
        <View style={styles.purpleView}>
          <Text style={styles.purpleText}>Invitation</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Info label="Amount" value={`$${item?.job?.budget}`} />
          <Info
            label="Deadline"
            value={moment(item?.job?.deadline).format('DD MMM YYYY, hh:mm A')}
          />
          <Info
            label="Property Owner"
            value={propertyOwner.firstName + ' ' + propertyOwner.lastName}
          />
        </View>
      </View>

      <View style={styles.actions}>
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
          onPress={() =>
            navigation.navigate('MyJobsDetail', { selectedJobId: item.job?.id })
          }
        />
        <Button
          text={'Offer'}
          backgroundColor={'#E6F6FC'}
          borderColor={'#CCECF7'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={1}
          leftIcon={
            <ActiveBids style={{ height: 16, width: 16 }} fill={'#007FAE'} />
          }
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() =>
            navigation.navigate('MakeOffer', { selectedJobId: item?.job?.id })
          }
        />
      </View>
    </View>
  );
};

export default InvitationsCard;
