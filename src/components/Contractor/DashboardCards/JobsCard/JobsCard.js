import React from 'react';
import { View, Text } from 'react-native';
import {
  CurvedArrow,
  EyeIcon,
  Globe,
  VerticalDots,
} from '../../../../assets/svg';
import { FontSizes } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../Button';
import { getStatusLabel } from '../../../../helpers/Data';
import styles from './style';
import { deadlineParts } from '../../../../helpers/services';
const Info = ({ label, value }) => {
  const isPropertyOwner = label === 'Property Owner';

  return (
    <View
      style={[
        styles.infoBox,
        {
          flex: isPropertyOwner ? 1.7 : 1,
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

const JobsCard = ({ item, navigation, openModal, refreshJobs }) => {
  // console.log('job', item);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.title}{' '}
        <Text style={styles.highlight}>{item?.property?.name || ''}</Text>
      </Text>
      <Text style={styles.address}>{item?.property?.address || ''}</Text>

      <View style={styles.tagsRow}>
        {!item.isPrivate && (
          <View style={styles.tag}>
            <Globe style={styles.globe} />
            <Text style={styles.text}>Public</Text>
          </View>
        )}

        <View style={styles.row}>
          <View style={styles.jobIdView}>
            <Text style={styles.idText}>{item?.displayId}</Text>
            <CurvedArrow style={styles.curve} />
          </View>

          <View style={styles.grayView}>
            <Text style={styles.grayText}>
              {getStatusLabel(item.jobStatus)} Job
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Info
            label={'Deadline'}
            value={`${deadlineParts(item?.deadline).relative}`}
          />
          <Info label={'Total Hours'} value={'Fixed'} />
          <Info
            label="Property Owner"
            value={item.postedBy.firstName + '' + item?.postedBy?.lastName}
          />
        </View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <Button
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          flex={0.15}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() =>
            openModal('quick_action', {
              ...item,
              refreshJobs,
            })
          }
          leftIcon={<VerticalDots style={{ height: 6, width: 22 }} />}
        />
        <Button
          text={'View'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          flex={0.85}
          leftIcon={<EyeIcon style={{ height: 16, width: 16 }} />}
          fontFamily={PopinsFont.medium}
          fontSize={FontSizes.s}
          lineHeight={FontSizes.l}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() =>
            navigation.navigate('MyJobsDetail', { selectedJobId: item.id })
          }
        />
      </View>
    </View>
  );
};

export default JobsCard;
