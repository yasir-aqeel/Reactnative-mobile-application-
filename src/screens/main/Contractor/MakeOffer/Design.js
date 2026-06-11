import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import { KeyboardChatScrollView } from 'react-native-keyboard-controller';
import {
  CameraIcon,
  CloseDrawer,
  CopyIcon,
  DateTimePickerIcon,
  EmptyImage,
  FileIcon,
  Globe,
  MakeOfferButtonIcon,
  UploadIcon,
} from '../../../../assets/svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import CustomSwitch from '../../../../components/CustomSwitch';
import { getFileColor, handleCopyText } from '../../../../helpers/services';
import DiscardBidModal from '../../../../components/Contractor/DiscardBidModal';
import { calculateCommission } from '../../../../helpers/FeeCalculation';
import moment from 'moment';
import AppColor from '../../../../helpers/AppColor';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
import JobInProgressSkeleton from '../../../../sekeletons/Contractor/JobInProgressSkeleton';
const Design = props => {
  if (props.isFirstLoading) {
    return <JobInProgressSkeleton />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => props.openDiscardModal()}
          style={styles.backIconContainer}
        >
          <CloseDrawer fill={'#CC2D30'} style={styles.leftIcon} />
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.tag}>
            <Globe style={styles.globe} />
            <Text style={styles.public}>Public</Text>
          </View>
        </View>
      </View>
      <KeyboardChatScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.infoContainer}
        >
          <View
            pointerEvents={props.isLoading ? 'none' : 'auto'}
            style={styles.header}
          >
            <View style={styles.nameRow}>
              <Text style={styles.title}>
                {props.selectedJob.title} at{' '}
                <Text style={styles.highlight}>
                  {props.selectedJob.property.name}
                </Text>
              </Text>
            </View>

            <View style={styles.jobIdRow}>
              <Text style={styles.jobIdLabel}>
                Job ID • {props?.selectedJob?.displayId}
              </Text>
              <TouchableOpacity
                onPress={() => handleCopyText(props.selectedJob.displayId)}
              >
                <CopyIcon style={{ height: 12, width: 12, top: 3 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            pointerEvents={props.isLoading ? 'none' : 'auto'}
            style={styles.mainView}
          >
            <Text style={styles.headingText}>Make an offer</Text>
            <View style={styles.uploadImageView}>
              <Text style={styles.label}>Upload Images</Text>
              <View style={styles.imagePickerButton}>
                {props.imageLoading ? (
                  <ActivityIndicator size={'small'} color={'#2A2A2A'} />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 20,
                      width: '50%',
                      alignSelf: 'center',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => props.openImagePicker('gallery')}
                    >
                      <EmptyImage style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => props.openImagePicker('camera')}
                    >
                      <CameraIcon style={{ height: 35, width: 35 }} />
                    </TouchableOpacity>
                  </View>
                )}

                <Text style={styles.imagePickerText}>
                  Select Images from gallery or take photos with camera
                </Text>
                <Text style={styles.imagePickerNote}>
                  Max. 5 images & image size is 2MB
                </Text>
              </View>

              {Array.isArray(props.form.contractorBidPhotos) &&
                props.form.contractorBidPhotos.length > 0 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.imagesRow}
                  >
                    {props.form.contractorBidPhotos.map((img, idx) => (
                      <View key={idx} style={styles.imageThumbnail}>
                        <Image
                          source={{
                            uri: typeof img === 'string' ? img : img?.url,
                          }}
                          style={styles.image}
                          resizeMode="cover"
                        />

                        <TouchableOpacity
                          style={styles.removeImageBtn}
                          onPress={() => props.removeImage(idx)}
                        >
                          <CloseDrawer
                            style={{ height: 13, width: 13 }}
                            fill="#151515"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                )}

              {props.form.contractorBidPhotos.length > 0 && (
                <Button
                  text={'Remove all'}
                  onPress={props.removeAllImages}
                  backgroundColor={'#F7F7F7'}
                  borderColor={'#E1E1E1'}
                  borderWidth={1}
                  color={'#151515'}
                  fontFamily={PopinsFont.regular}
                  fontSize={FontSizes.m}
                  lineHeight={Spacing.m}
                  width={'100%'}
                  height={44}
                  marginVertical={10}
                  borderRadius={Spacing.s}
                />
              )}
            </View>
            <View
              style={{
                marginBottom: props.documents.length > 0 ? 10 : -10,
                marginLeft: 5,
              }}
            >
              <Text style={styles.label}>Upload Documents</Text>
              <View style={styles.uploadDocumentButtonView}>
                <Button
                  text={props.documentsLoading ? '' : 'Choose File'}
                  backgroundColor={'#F1F1F1'}
                  color={props.documentsLoading ? 'transparent' : '#6A6A6A'}
                  borderRadius={10}
                  paddingVertical={6}
                  paddingHorizontal={14}
                  fontFamily={PopinsFont.regular}
                  fontSize={18}
                  lineHeight={Spacing.l}
                  height={44}
                  onPress={() => props.pickDocument()}
                  leftIcon={
                    props.documentsLoading ? (
                      <ActivityIndicator size={'large'} color={'#2A2A2A'} />
                    ) : null
                  }
                />
                <Text style={styles.imagePickerNote}>i.e. File-name.pdf</Text>
              </View>
              <View
                style={{
                  marginVertical: 12,
                }}
              >
                <Text style={styles.label}>
                  Max. 10 documents & document size is 2MB
                </Text>
              </View>
              {props.form.contractorBidFiles.map((fileUrl, index) => {
                const fileName = fileUrl?.split('/').pop() || 'Document';

                const color = getFileColor(fileName);

                return (
                  <View key={index} style={styles.documentItem}>
                    <View style={styles.row}>
                      <FileIcon style={styles.sideIcon} fill={color} />

                      <Text
                        style={styles.documentText}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                      >
                        {fileName}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => props.removeDocument(index)}
                    >
                      <CloseDrawer style={styles.sideIcon} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Your Offer</Text>

            <View style={styles.amountInputWrapper}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                value={props.form.amount}
                onChangeText={text =>
                  props.setForm(prev => ({
                    ...prev,
                    amount: Number(text),
                  }))
                }
                placeholder="i.e.89"
                returnKeyType="done"
                placeholderTextColor={'#6A6A6A'}
                textAlignVertical={'center'}
              />
            </View>
            {props.form.amount !== 0 && (
              <>
                <Text
                  style={styles.feeText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Fee :$
                  {calculateCommission(Number(props.form.amount) * 100, 0, 0)
                    .commissionCents / 100}{' '}
                  • You will receive : $
                  {calculateCommission(Number(props.form.amount) * 100, 0, 0)
                    .netCents / 100}
                </Text>
              </>
            )}

            <View style={styles.visitView}>
              <Text style={styles.visitText}>Request the Site Visit</Text>
              <CustomSwitch
                value={props.siteVisit}
                onValueChange={value => props.setSiteVisit(value)}
              />
            </View>

            <Text style={styles.sectionTitle}>
              Choose Date & Time for visit
            </Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={props.openDateTimePickerModal}
            >
              <Text style={styles.dateTime}>
                {props.form.proposedStartDate
                  ? moment(props.form.proposedStartDate).format(
                      'MMM. DD, YYYY - HH:mm',
                    )
                  : 'Select Date & Time'}
              </Text>

              <DateTimePickerIcon
                style={{ height: 20, width: 20 }}
                fill={'#2A2A2A'}
              />
            </TouchableOpacity>
            {/* <View style={{ marginVertical: 5 }}>
              <Text style={styles.sectionTitle}>Notes (Optional)</Text>
              <TextInput
                style={styles.textArea}
                multiline
                value={props.scopeOfWork}
                onChangeText={text => props.setScopeOfWork(text)}
                placeholder="Write a message"
                textAlignVertical="top"
                placeholderTextColor={'#6A6A6A'}
              />
            </View> */}

            <View style={{ marginVertical: 5 }}>
              <Text style={styles.sectionTitle}>Scope of the work</Text>
              <TextInput
                style={styles.textArea}
                multiline
                value={props.form.message}
                onChangeText={text =>
                  props.setForm(prev => ({
                    ...prev,
                    message: text,
                  }))
                }
                placeholder="Write about work "
                textAlignVertical="top"
                placeholderTextColor={'#6A6A6A'}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardChatScrollView>

      <View style={styles.button}>
        <Button
          text={props.isLoading ? '' : 'Make an offer'}
          color={props.isLoading ? 'transparent' : '#FFF'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.s}
          lineHeight={Spacing.xl}
          height={44}
          backgroundColor={'#009FD9'}
          width={'100%'}
          borderRadius={Spacing.s}
          leftIcon={
            props.isLoading ? (
              <ActivityIndicator size={'small'} color={AppColor.white} />
            ) : (
              <MakeOfferButtonIcon style={styles.sideIcon} />
            )
          }
          iconSpacing={props.isLoading ? 0 : 5}
          onPress={() => props.handleSubmitOffer()}
        />
      </View>
      {props.openDateTimePicker && (
        <DateTimePicker
          value={
            props.form?.proposedStartDate
              ? new Date(props.form.proposedStartDate)
              : new Date()
          }
          mode={Platform.OS === 'ios' ? 'datetime' : props.mode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onValueChange={(event, selectedDate) => {
            if (event.type === 'dismissed') {
              props.onDismiss?.();
              return;
            }

            props.onValueChange(selectedDate);
          }}
        />
      )}
      <DiscardBidModal
        visible={props.showDiscardModal}
        onClose={props.onClose}
        onDiscard={props.onDiscard}
      />
      <ModalRenderer
        activeModal={props.activeModal}
        closeModal={props.closeModal}
        openModal={props.openModal}
        state={props.state}
        setState={props.setState}
      />
    </View>
  );
};

export default Design;
