import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import AppColor from '../../helpers/AppColor';
import { PopinsFont } from '../../helpers/Fonts';
import Button from '../Button';
import { images } from '../../assets/images';
const JobCard = ({ item, index, onNotInterested, onPressJobCard }) => {
  return (
    <View style={styles.jobCard}>
      <FastImage
        source={images.fixrliGif}
        style={styles.propertyImage}
        resizeMode={FastImage.resizeMode.cover} // same as 'cover'
      >
        {/* Overlay content */}
        <View style={styles.view2}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobAddress}>{item.location}</Text>
        </View>
      </FastImage>

      <View style={styles.tagsRow}>
        <Text style={styles.tagText}>{item.skills} </Text>
      </View>

      <Text style={styles.jobDescription}>{item.description}</Text>

      {/* Job meta row */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>
            Job Type:{' '}
            {item.JobType === 'T_AND_M' ? 'Time and Materials' : 'Fixed Bid'}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Budget: {item.budget}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>
            Rating: {item.postedBy.rating ?? 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text={'Submit Bid'}
          color={AppColor.white}
          fontFamily={PopinsFont.medium}
          backgroundColor={AppColor.green2}
          padding={10}
          width={'95%'}
          borderRadius={5}
          height={45}
          marginBottom={10}
          onPress={() => onPressJobCard(item)}
        />

        <Button
          text={'Not Interested'}
          color={AppColor.primaryBlue}
          fontFamily={PopinsFont.medium}
          backgroundColor={AppColor.grayBackground}
          padding={10}
          width={'95%'}
          borderRadius={5}
          height={45}
          onPress={onNotInterested}
        />
      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: AppColor.white,
    // borderRadius: 24,
    paddingVertical: 10,
    marginBottom: 20,
    width: '100%',
  },
  propertyImage: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 300,
  },
  view2: {
    backgroundColor: 'rgba(255, 255, 255, 0.91)',
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2A3A',
    marginBottom: 4,
    textAlign: 'center',
  },
  jobAddress: {
    fontSize: 15,
    color: '#6F7D95',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    marginVertical: 14,
  },
  tag: {
    backgroundColor: AppColor.white,
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  tagText: {
    fontSize: 12,
    marginLeft: 3,
    fontFamily: PopinsFont.light,
    color: AppColor.black,
  },
  jobDescription: {
    fontSize: 12,
    lineHeight: 20,
    color: '#3F3F3F',
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColor.white,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#000000',
    fontFamily: PopinsFont.medium,
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
});
