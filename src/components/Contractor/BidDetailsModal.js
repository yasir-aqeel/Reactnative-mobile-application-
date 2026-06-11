import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AppColor from '../../helpers/AppColor';
import ModalHeader from './ModalHeader';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import {
  CopyIcon,
  CurvedArrow,
  DownloadIcon,
  FileIcon,
  Globe,
  MessageIcon,
  RejectIcon,
} from '../../assets/svg';
import Button from '../Button';
import { calculateCommission } from '../../helpers/FeeCalculation';
import { iconColors } from '../../helpers/Data';
import { getFileName, hasInternet } from '../../helpers/services';
import { showToast } from '../../helpers/ToastConfig';
import { withdrawBid } from '../../redux/actions/contractorActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { downloadAndOpen } from '../../helpers/fileHandler';
const BidDetailsModal = ({ visible, onClose, openModal, state }) => {
  // console.log('=====', state);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const [loading, setLoading] = useState(false);
  const [loadingFileUrl, setLoadingFileUrl] = useState(null);
  const userId = userData?.user?.id;
  const handleWithdrawBid = async bid => {
    const internetStatus = await hasInternet();
    if (!internetStatus) {
      onClose();
      showToast('info', 'No Internet Connection');
      return;
    }
    if (!bid?.status === 'PENDING') {
      showToast('info', 'Not able to Withdraw');
      return;
    }

    setLoading(true);
    try {
      const isBidWithdrawn = await dispatch(withdrawBid(bid?.id, userId));
      // console.log('isBidWithdrawn', isBidWithdrawn);

      if (isBidWithdrawn.status === 200 && isBidWithdrawn?.data?.id) {
        // refresh parent bids list
        if (bid?.refreshBids) {
          await bid.refreshBids();
        }
        onClose();
        setTimeout(() => {
          showToast('success', 'Bid Withdraw Successfully');
        }, 500);
      }
    } catch (error) {
      showToast('error', error.message);
      console.log('handleWithdrawBid error', error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleFilePress = async (fileUrl, fileName, uniqueId) => {
    if (loadingFileUrl) return;
    setLoadingFileUrl(uniqueId);
    try {
      await downloadAndOpen(fileUrl, fileName);
    } catch (error) {
      console.log('Error opening file:', error);
    } finally {
      setLoadingFileUrl(null);
    }
  };
  const selectedBid = state;
  if (!visible || !selectedBid) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Bid Details'} onPress={() => onClose()} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollContainer}>
              <Text style={styles.label}>Job Details</Text>

              <View style={styles.jobDetailsCard}>
                <View style={styles.jobTitleRow}>
                  <View>
                    <Text style={styles.title}>
                      {selectedBid?.job?.title ?? ''} at{' '}
                      {/* <Text style={styles.highlight}>{jobData.location}</Text> */}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.budgetText}>Budget</Text>
                  </View>
                </View>
                <View style={styles.jobTitleRow}>
                  <View style={styles.topRow}>
                    {!selectedBid?.job?.isPrivate && (
                      <View style={styles.globe}>
                        <Globe
                          style={{ height: 12, width: 12 }}
                          fill={'#009FD9'}
                        />
                        <Text style={styles.public}>Public</Text>
                      </View>
                    )}

                    <View style={styles.grayView}>
                      <Text style={styles.grayText}>
                        {selectedBid?.job?.displayId}
                      </Text>
                      <CurvedArrow style={{ height: 11, width: 11 }} />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.budget}>
                      ${selectedBid?.job?.budget} (Fixed)
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.jobDetailsCard}>
                <View style={styles.jobTitleRow}>
                  <View>
                    <Text style={styles.label}>Property Owner</Text>
                    <Text style={styles.budget}>
                      {selectedBid?.job?.postedBy?.firstName +
                        ' ' +
                        selectedBid?.job?.postedBy?.lastName}
                    </Text>
                  </View>
                  <View style={styles.messageContainer}>
                    <MessageIcon
                      style={{ height: 22, width: 22 }}
                      fill={'#000000'}
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.label}>Your Offer</Text>

              <View style={styles.totalView}>
                <Text style={styles.totalText}>Budget</Text>
                <Text style={styles.totalAmount}>${selectedBid.amount}</Text>
              </View>
              <Text style={styles.fee}>
                Fee:{' '}
                {calculateCommission(Number(selectedBid?.amount) * 100, 0, 0)
                  .commissionCents / 100}{' '}
                You will receive : $
                {calculateCommission(Number(selectedBid?.amount) * 100, 0, 0)
                  .netCents / 100}
              </Text>

              <View style={styles.jobDetailsCard}>
                <Text style={styles.scopeText}>Scope of the Work</Text>
                <Text style={styles.scope}>{selectedBid?.message ?? ''}</Text>
              </View>
              <Text style={styles.label}>Attached Files</Text>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 8,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {Array.isArray(selectedBid?.contractorBidPhotos) &&
                  selectedBid?.contractorBidPhotos.length > 0 &&
                  selectedBid?.contractorBidPhotos.map((image, index) => {
                    return (
                      <Image
                        source={{ uri: image.url }}
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: Spacing.s,
                        }}
                        resizeMode="contain"
                      />
                    );
                  })}
              </ScrollView>
              {Array.isArray(selectedBid?.contractorBidFiles) &&
                selectedBid?.contractorBidFiles.length > 0 &&
                selectedBid?.contractorBidFiles.map((file, index) => {
                  const color = iconColors[index % iconColors.length];
                  return (
                    <View key={index} style={styles.documentItem}>
                      <View style={styles.row}>
                        <FileIcon style={styles.sideIcon} fill={color} />
                        <Text style={styles.documentText}>
                          {getFileName(file, index)}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          handleFilePress(
                            file.url,
                            getFileName(file, index),
                            file.url,
                          )
                        }
                      >
                        {loadingFileUrl === file.url ? (
                          <ActivityIndicator size={'small'} color="#121212" />
                        ) : (
                          <DownloadIcon style={styles.sideIcon} />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>

            <Button
              text={loading ? '' : 'Withdraw'}
              color={loading ? 'transparent' : '#CC2D30'}
              fontFamily={PopinsFont.regular}
              fontSize={FontSizes.s}
              lineHeight={Spacing.xl}
              height={44}
              backgroundColor={'#FFECEC'}
              borderWidth={1}
              borderColor={'#FFD7D8'}
              width={'95%'}
              borderRadius={Spacing.s}
              leftIcon={
                loading ? (
                  <ActivityIndicator size={'small'} color={'#CC2D30'} />
                ) : (
                  <RejectIcon style={styles.sideIcon} fill={'#CC2D30'} />
                )
              }
              iconSpacing={loading ? 0 : 8}
              onPress={() => handleWithdrawBid(selectedBid)}
              marginTop={10}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    width: '100%',
    maxHeight: '90%',
  },
  label: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    marginBottom: 12,
  },
  jobDetailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: Spacing.s,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    width: '100%',
    marginBottom: 12,
  },
  jobTitleRow: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  globe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    backgroundColor: '#FFF',
    borderRadius: Spacing.s,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.xs,
    width: 75,
    alignSelf: 'flex-start',
    marginVertical: 5,
    gap: 5,
  },
  public: {
    color: '#555555',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.m,
  },
  title: {
    color: '#2A2A2A',
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.xl,
  },

  highlight: {
    color: '#009FD9',
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },

  budgetText: {
    fontSize: FontSizes.s,
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  budget: {
    fontSize: FontSizes.m,
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    lineHeight: Spacing.xl,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },

  grayView: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  totalView: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: Spacing.s,
  },
  totalText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
  },
  totalAmount: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.l,
    lineHeight: Spacing.l,
  },

  messageContainer: { alignItems: 'center', alignSelf: 'center' },

  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    padding: Spacing.s,
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  documentText: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sideIcon: { height: 16, width: 16 },
  fee: {
    color: AppColor.primaryBlue,
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    width: '100%',
    marginLeft: 5,
    lineHeight: Spacing.xl,
    marginBottom: 12,
  },
  scopeText: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    marginBottom: 4,
  },
  scope: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    textAlign: 'left',
  },
});

export default BidDetailsModal;
