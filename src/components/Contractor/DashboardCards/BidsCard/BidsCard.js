import React from 'react';
import { View, Text } from 'react-native';
import {
  CurvedArrow,
  EyeIcon,
  Globe,
  RejectIcon,
} from '../../../../assets/svg';
import { FontSizes } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../Button';
import styles from './style';
import { showToast } from '../../../../helpers/ToastConfig';
import { getStatusLabel } from '../../../../helpers/Data';

const Info = ({ label, value }) => {
  const isPropertyOwner = label === 'Property Owner';

  return (
    <View
      style={[
        styles.infoBox,
        {
          flex: isPropertyOwner ? 2.5 : 1,
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

const BidsCard = ({ item, openModal, refreshBids }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.job.title} at{' '}
        <Text style={styles.highlight}>{item.job.property.name ?? ''}</Text>
      </Text>
      <Text style={styles.address}>{item?.job?.property?.address ?? ''}</Text>

      <View style={styles.tagsRow}>
        {!item?.job?.isPrivate && (
          <View style={styles.tag}>
            <Globe style={styles.globe} />
            <Text style={styles.typeText}>Public</Text>
          </View>
        )}

        <View style={styles.jobIdView}>
          <Text style={styles.idText}>{item?.job?.displayId}</Text>
          <CurvedArrow style={styles.curve} />
        </View>
        {item?.isActive && (
          <View
            style={[
              styles.greenView,
              {
                backgroundColor:
                  item.status === 'REJECTED'
                    ? '#FFECEC'
                    : item.status === 'PENDING'
                    ? '#F7F7F7'
                    : '#ECF9F3',
                borderColor:
                  item.status === 'REJECTED'
                    ? '#FFD7D8'
                    : item.status === 'PENDING'
                    ? '#E1E1E1'
                    : '#B2E5CE',
              },
            ]}
          >
            <Text
              style={[
                styles.greenText,
                {
                  color:
                    item.status === 'REJECTED'
                      ? '#CC2D30'
                      : item.status === 'PENDING'
                      ? '#404040'
                      : '#25724F',
                },
              ]}
            >
              {getStatusLabel(item.status)} Bid
            </Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Info label="Amount" value={item?.job?.budget} />
          <Info label="Your Offer" value={`$${item.amount}`} />
          <Info
            label="Property Owner"
            value={
              item?.job?.postedBy.firstName + ' ' + item?.job?.postedBy.lastName
            }
          />
        </View>
      </View>

      <View style={styles.actions}>
        {item.status !== 'REJECTED' && (
          <Button
            text={'Withdraw'}
            backgroundColor={'#FFECEC'}
            borderColor={'#FFD7D8'}
            borderWidth={1}
            color={'#CC2D30'}
            flex={1}
            leftIcon={<RejectIcon style={styles.sideIcon} />}
            fontFamily={PopinsFont.medium}
            fontSize={FontSizes.s}
            lineHeight={FontSizes.l}
            height={36}
            borderRadius={FontSizes.s}
            onPress={() =>
              item.status === 'PENDING'
                ? openModal('withdraw_bid_modal', {
                    ...item,
                    refreshBids,
                  })
                : showToast('info', 'Not able to Withdraw')
            }
          />
        )}

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
          onPress={() =>
            openModal('bid_details_modal', {
              ...item,
              refreshBids,
            })
          }
        />
      </View>
    </View>
  );
};

export default React.memo(BidsCard);
