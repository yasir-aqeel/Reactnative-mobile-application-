import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  ArrowDown,
  CopyIcon,
  Globe,
  LeftArrow,
  ResumeIcon,
} from '../../../../assets/svg';
import styles from './style';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import { getStatusLabel, statusColors } from '../../../../helpers/Data';
import Button from '../../../../components/Button';
import JobInProgress from '../../../../components/Contractor/JobInProgress';
import JobInformation from '../../../../components/Contractor/JobInformation';
import StatusModal from '../../../../components/Contractor/JobsActionModals/StatusModal';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
import JobInProgressSkeleton from '../../../../sekeletons/Contractor/JobInProgressSkeleton';
import { handleCopyText } from '../../../../helpers/services';
import AppColor from '../../../../helpers/AppColor';

const Design = props => {
  // Show skeleton immediately when loading OR when jobDetails is null and not loading
  if (props.isLoading || (!props.isLoading && props.jobDetails === null)) {
    return <JobInProgressSkeleton />;
  }

  const buttonData = props.playback;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backIconContainer}
        >
          <LeftArrow style={styles.leftIcon} />
        </TouchableOpacity>
        <View style={styles.row}>
          {!props?.jobDetails?.isPrivate && (
            <View style={styles.tag}>
              <Globe style={styles.globe} />
              <Text style={styles.public}>Public</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => props.toggleStatusModal()}
            style={styles.tag2}
          >
            <View
              style={{
                height: 11,
                width: 11,
                borderRadius: 10,
                backgroundColor: statusColors[props?.jobDetails?.jobStatus],
              }}
            />
            <Text style={styles.inProgress}>
              {getStatusLabel(props?.jobDetails?.jobStatus)}
            </Text>
            <ArrowDown style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        pointerEvents={props?.isLoading ? 'none' : 'auto'}
        style={styles.tabContainer}
      >
        <TouchableOpacity
          style={[
            styles.tab,
            props.activeTab === 'progress' && styles.activeTab,
          ]}
          onPress={() => props.setActiveTab('progress')}
        >
          <Text
            style={[
              styles.tabText,
              props.activeTab === 'progress' && styles.activeTabText,
            ]}
          >
            Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, props.activeTab === 'info' && styles.activeTab]}
          onPress={() => props.setActiveTab('info')}
        >
          <Text
            style={[
              styles.tabText,
              props.activeTab === 'info' && styles.activeTabText,
            ]}
          >
            Job Information
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.nameRow}>
          <Text style={styles.title}>
            {props?.jobDetails?.title}{' '}
            <Text style={styles.highlight}>
              {props?.jobDetails?.bids[0]?.job?.property?.name ?? ''}
            </Text>
          </Text>
        </View>
        <View style={styles.jobIdRow}>
          <Text style={styles.jobIdLabel}>
            Job ID • {props?.jobDetails?.displayId}
          </Text>
          <TouchableOpacity
            onPress={() => handleCopyText(props?.jobDetails?.displayId)}
          >
            <CopyIcon style={{ height: 12, width: 12, top: 3 }} />
          </TouchableOpacity>
        </View>
      </View>
      {props.activeTab === 'progress' && (
        <View style={styles.buttonsView}>
          <Button
            text={'Quick Actions'}
            backgroundColor={'#F7F7F7'}
            borderColor={'#E1E1E1'}
            borderWidth={1}
            color={'#2A2A2A'}
            width={'100%'}
            fontFamily={PopinsFont.medium}
            fontSize={FontSizes.s}
            lineHeight={FontSizes.s}
            borderRadius={FontSizes.s}
            height={44}
            onPress={() =>
              props.openModal('quick_action', { ...props?.jobDetails })
            }
          />
        </View>
      )}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            colors={[
              AppColor.primaryBlue,
              AppColor.green1,
              AppColor.redDark,
              AppColor.purpleLight,
            ]}
            progressBackgroundColor={AppColor.white}
            tintColor={AppColor.primaryBlue}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.content}
      >
        {props.activeTab === 'progress' ? (
          <JobInProgress props={props} />
        ) : (
          <JobInformation props={props} />
        )}
      </ScrollView>

      {/* Bottom Timer Row */}
      <View style={styles.timerContainer}>
        {buttonData.icon && buttonData?.label && (
          <View style={styles.timerRow}>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Button
                text={props?.jobActionLoading ? '' : buttonData.label}
                color={props?.jobActionLoading ? 'transparent' : '#151515'}
                backgroundColor={'#F7F7F7'}
                width={'100%'}
                height={44}
                fontFamily={PopinsFont.medium}
                fontSize={FontSizes.s}
                lineHeight={Spacing.l}
                borderRadius={Spacing.s}
                marginVertical={10}
                leftIcon={
                  props?.jobActionLoading ? (
                    <ActivityIndicator color={'#151515'} size={'small'} />
                  ) : (
                    <buttonData.icon
                      style={{
                        height: buttonData.id === 'PAUSE' ? 18 : 14,
                        width: buttonData.id === 'PAUSE' ? 18 : 14,
                      }}
                    />
                  )
                }
                borderColor={'#E1E1E1'}
                borderWidth={1}
                onPress={buttonData.action}
              />
            </View>

            <View style={styles.timeView}>
              <Text style={styles.timerValue}>00</Text>
              <Text style={styles.timerValue}>:</Text>
              <Text style={styles.timerValue}>00</Text>
            </View>
          </View>
        )}
      </View>
      {props.jobDetails?.jobStatus === 'ACTIVE' && (
        <View style={styles.timerContainer}>
          <View style={styles.timerRow}>
            <Button
              text={'Start Job'}
              color={props?.jobActionLoading ? 'transparent' : '#151515'}
              backgroundColor={'#F7F7F7'}
              width={'100%'}
              height={44}
              fontFamily={PopinsFont.medium}
              fontSize={FontSizes.s}
              lineHeight={Spacing.l}
              borderRadius={Spacing.s}
              marginVertical={10}
              leftIcon={<ResumeIcon style={{ height: 14, width: 12 }} />}
              borderColor={'#E1E1E1'}
              borderWidth={1}
              onPress={() =>
                props.openModal('photos_before_job_start_modal', {
                  ...props.jobDetails,
                })
              }
            />
          </View>
        </View>
      )}

      <StatusModal
        visible={props.showStatusModal}
        onClose={props.toggleStatusModal}
        jobDetails={props.jobDetails}
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
