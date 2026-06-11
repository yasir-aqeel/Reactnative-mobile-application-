import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import {
  CameraIcon,
  ChangeOrder,
  CheckIcon,
  EyeIcon,
  JobsIcon,
  PauseIcon,
  PencilIcon,
  RatingStart,
  RejectIcon,
  ResumeIcon,
  ReviewIcon,
  StarIcon,
} from '../../assets/svg';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import Button from '../../components/Button';
import { images } from '../../assets/images';
import { useMemo } from 'react';
import {
  formatChangeOrderType,
  formatDate,
  formatMoney,
  getEventTime,
  getJobEndedAt,
  getJobStartedAt,
} from '../../helpers/services';

function getJobStatusEvent(job) {
  const status =
    typeof job?.jobStatus === 'string' ? job.jobStatus.toUpperCase() : '';
  if (!status) return null;

  const baseTime = job?.updatedAt ?? job?.createdAt ?? new Date();
  const statusConfig = {
    PENDING: {
      title: 'Job is pending',
      icon: CheckIcon,
    },
    ACTIVE: {
      title: 'Job is Active',
      icon: JobsIcon,
    },
    ASSIGNED: {
      title: 'Job has been assigned',
      icon: JobsIcon,
    },
    IN_PROGRESS: {
      title: 'Job is in progress',
      time: job?.resumedAt ?? getJobStartedAt(job),
      icon: JobsIcon,
    },
    PAUSED: {
      title: 'Job has been paused',
      icon: PauseIcon,
    },
    PENDING_APPROVAL: {
      title: 'Job is pending approval',
      time: getJobEndedAt(job),
      icon: JobsIcon,
    },
    COMPLETED: {
      title: 'Job has been completed',
      time: getJobEndedAt(job),
      icon: JobsIcon,
    },
    CANCELLED: {
      title: 'Job has been cancelled',
      time: job?.cancellationApprovedAt ?? job?.cancellationRequestedAt,
      icon: RejectIcon,
    },
    CANCELED: {
      title: 'Job has been canceled',
      time: job?.cancellationApprovedAt ?? job?.cancellationRequestedAt,
      icon: RejectIcon,
    },
  };

  const config = statusConfig[status];
  if (!config) {
    return {
      type: 'JOB_STATUS_CHANGED',
      title: `Job status changed to ${formatChangeOrderType(status)}`,
      time: baseTime,
      icon: JobsIcon,
      meta: { status },
    };
  }

  return {
    type: 'JOB_STATUS_CHANGED',
    title: config.title,
    time: config.time ?? baseTime,
    icon: config.icon,
    meta: { status },
  };
}

function isPaymentEvent(event) {
  return event.type.startsWith('PAYMENT_');
}

function isChangeOrderEvent(event) {
  return event.type.startsWith('CHANGE_ORDER');
}

function compareContractorTimelineEvents(a, b) {
  if (isChangeOrderEvent(a) && isPaymentEvent(b)) {
    return a.meta?.isChangeOrderAfterDownpayment ? 1 : -1;
  }

  if (isPaymentEvent(a) && isChangeOrderEvent(b)) {
    return b.meta?.isChangeOrderAfterDownpayment ? -1 : 1;
  }

  return getEventTime(a) - getEventTime(b);
}
function groupJobPhotosByType(jobPhotos) {
  if (!Array.isArray(jobPhotos)) return;
  return jobPhotos.reduce((acc, photo) => {
    const type = photo.type; // "BEFORE", "PROGRESS", "AFTER"
    if (!acc[type]) acc[type] = [];
    acc[type].push(photo.url);
    return acc;
  }, {});
}
function formatPhotoType(type) {
  switch (type) {
    case 'BEFORE':
      return 'Before';
    case 'PROGRESS':
      return 'During';
    case 'AFTER':
      return 'After';
    default:
      return type;
  }
}
function buildContractorBidTimelineEvents(job, ownerFirst, props) {
  const events = [];
  const navigation = props?.navigation;

  // ----- Existing: Bid events (unchanged) -----
  job?.Bid?.forEach(bid => {
    if (bid.status === 'ACCEPTED') return;
    events.push({
      type: `BID_${bid.status}`,
      title: `Bid ${bid.status.toLowerCase()}`,
      time: bid.createdAt,
      icon: JobsIcon,
      meta: {
        id: bid.id,
        amount: bid.amount,
      },
    });
  });

  // ----- NEW: Group job photos -----
  const groupedPhotos = groupJobPhotosByType(job.jobPhoto);
  const beforePhotos = groupedPhotos?.BEFORE || [];
  const progressPhotos = groupedPhotos?.PROGRESS || [];
  const afterPhotos = groupedPhotos?.AFTER || [];

  // ----- Existing: Down payment events (unchanged) -----
  if (job?.downPaymentRequestedAt) {
    events.push({
      type: 'PAYMENT_REQUESTED',
      title: 'Down payment requested',
      time: job.downPaymentRequestedAt,
      icon: PencilIcon,
      meta: {
        amount: formatMoney(job.downPaymentAmount, job?.currency ?? 'USD'),
        contractorName:
          job.bids[0]?.contractor?.firstName +
          ' ' +
          job.bids[0]?.contractor?.lastName,
      },
    });
  }

  if (job?.downPaymentReleased) {
    events.push({
      type: 'PAYMENT_RELEASED',
      title: 'Down payment has been approved',
      time: job.downPaymentReleasedAt ?? job.updatedAt ?? new Date(),
      icon: CheckIcon,
      meta: {
        amount: formatMoney(job.downPaymentAmount, job?.currency ?? 'USD'),
        contractorName:
          job.bids[0]?.contractor?.firstName +
          ' ' +
          job.bids[0]?.contractor?.lastName,
        status: 'RELEASED',
      },
    });
  }

  // ----- Existing: Change order events (unchanged) -----
  job?.changeOrders?.forEach(co => {
    events.push({
      type: 'CHANGE_ORDER',
      title: 'You requested change order',
      time: co.requestedAt,
      icon: ChangeOrder,
      meta: {
        id: co.id,
        amount: formatMoney(co.amount, job?.currency ?? 'USD'),
        currency: co.currency ?? job?.currency ?? 'USD',
        evidencePhotos: Array.isArray(co.evidencePhotos)
          ? co.evidencePhotos
          : [],
        status: co.status,
        typeLabel: formatChangeOrderType(co.type),
        isChangeOrderAfterDownpayment: Boolean(
          co.isChangeOrderAfterDownpayment,
        ),
        message:
          co.description || co.changeDescription || 'No description provided.',
      },
    });
  });

  // ----- NEW: Progress photos after change orders (but before completion) -----
  if (progressPhotos.length > 0) {
    events.push({
      type: 'JOB_PHOTOS_PROGRESS',
      title: 'During progress photos',
      time: job.updatedAt, // or use a more specific timestamp if available
      icon: CameraIcon,
      meta: {
        photoType: 'PROGRESS',
        photos: progressPhotos,
      },
    });
  }

  // ----- Existing: Job status event (unchanged) -----
  const statusEvent = getJobStatusEvent(job);
  if (statusEvent) {
    const isDuplicateCompleted =
      statusEvent.meta?.status === 'COMPLETED' &&
      job?.jobStatus === 'COMPLETED';
    if (!isDuplicateCompleted) {
      events.push(statusEvent);
    }
  }

  // ----- Existing: Contractors marking job as completed (unchanged) -----
  const completionAt =
    job?.contractorCompletionReviewAt ??
    getJobEndedAt(job) ??
    job?.updatedAt ??
    new Date();
  const completionBody = job?.contractorCompletionDescription;
  const payment = formatMoney(
    (job?.bids?.find(b => b.status === 'ACCEPTED')?.job
      ?.contractorPayoutCents ?? 0) / 100,
    job?.currency ?? 'USD',
  );
  if (job?.jobStatus === 'COMPLETED') {
    events.push({
      type: 'CONTRACTOR_MARK_JOB_COMPLETED',
      title: 'You marked this job as complete.',
      time: completionAt,
      icon: CheckIcon,
      meta: {
        message: completionBody,
        amount: payment,
        status: job?.financialTransactions?.[0]?.status,
        afterPhotos: afterPhotos,
      },
    });
  }

  // ----- LEAD events (placed at the very beginning) -----
  const lead = [];

  // ✅ BEFORE photos as the first event in lead
  if (beforePhotos.length > 0) {
    lead.push({
      type: 'JOB_PHOTOS_BEFORE',
      title: 'You Uploaded Before Photos',
      time: job.createdAt,
      icon: CameraIcon,
      meta: {
        photoType: 'BEFORE',
        photos: beforePhotos,
      },
    });
  }

  // Original lead events (owner accepted, job started)
  const acceptedBid = job?.bids?.find(b => b.status === 'ACCEPTED');
  const offerTime = acceptedBid?.createdAt ?? job?.createdAt;
  const acceptedBidAmount = formatMoney(
    acceptedBid?.amount,
    job?.currency ?? 'USD',
  );
  if (offerTime) {
    lead.push({
      type: 'OWNER_ACCEPT_ORDER',
      title: acceptedBidAmount
        ? `${ownerFirst} accepted your offer of ${acceptedBidAmount}`
        : `${ownerFirst} accepted your offer`,
      time: offerTime,
      icon: JobsIcon,
    });
  }
  const jobStartedAt = getJobStartedAt(job);
  if (jobStartedAt) {
    lead.push({
      type: 'CONTRACTOR_JOB_STARTED',
      title: 'Job has been started',
      time: jobStartedAt,
      icon: JobsIcon,
    });
  }

  // ----- EXTENSION events (owner accepted request) -----
  const extension = [];
  const ownerAcceptedAt = job?.ownerAcceptedRequestAt;
  if (ownerAcceptedAt) {
    extension.push({
      type: 'OWNER_ACCEPTED_REQUEST',
      title: `${ownerFirst} just accepted your request.`,
      time: ownerAcceptedAt,
      icon: CheckIcon,
    });
  }

  // ----- Sorting and splitting existing events -----
  const sorted = events.sort(compareContractorTimelineEvents);
  const earlySorted = sorted.slice(0, 2);
  const restSorted = sorted.slice(2);

  // ----- TAIL events (reviews) -----
  const tail = [];
  if (job?.jobStatus === 'COMPLETED') {
    const feedbacks = Array.isArray(job?.feedbacks) ? job.feedbacks : [];
    const ownerReviewFeedbacks = feedbacks.filter(
      feedback => feedback?.fromUserId === job.postedBy?.id,
    );
    const myFeedbacksToOwner = feedbacks.filter(
      feedback => feedback?.fromUserId === job.bids[0]?.contractor?.id,
    );

    ownerReviewFeedbacks.forEach(feedback => {
      tail.push({
        type: 'OWNER_LEFT_REVIEW_FOR_CONTRACTOR',
        title: `${ownerFirst} approved the job and left a ${feedback.rating} star review.`,
        time: feedback.createdAt,
        icon: StarIcon,
        meta: {
          reviewText: feedback.comment || 'No review comment provided.',
          rating: feedback.rating ?? 0,
          fromOwner: job?.postedBy?.id === feedback?.fromUserId,
        },
      });
    });
    myFeedbacksToOwner.forEach(feedback => {
      tail.push({
        type: 'CONTRACTOR_LEFT_REVIEW_FOR_OWNER',
        title: `You gave ${ownerFirst} a review.`,
        time: feedback.createdAt,
        icon: ReviewIcon,
        meta: {
          reviewText: feedback.comment || 'No review comment provided.',
          rating: feedback.rating ?? 0,
          fromMe: feedback?.fromUserId === job.bids[0]?.contractor?.id,
        },
      });
    });
  }

  const hasUserReviewed = props?.jobDetails?.feedbacks?.some(
    fb => fb?.fromUserId === props?.jobDetails?.bids?.[0]?.contractor?.id,
  );

  const payoutEvent =
    job?.jobStatus === 'COMPLETED'
      ? {
          type: 'JOB_COMPLETED_CHECK_PAYOUTS',
          title: 'Payout has been initiated',
          time: completionAt,
          icon: CheckIcon,
          meta: {
            message: `Your payout for this job of amount ${payment} has been initiated. For more details, view the Finance tab.`,
          },
          actionButton: {
            name: 'View payout Status',
            onPress: () =>
              navigation.navigate('Dashboard', {
                screen: 'Finance',
              }),
            icon: EyeIcon,
            iconColor: '#2A2A2A',
          },
        }
      : null;

  // ----- Final assembly -----
  return [
    ...lead,
    ...earlySorted,
    ...extension,
    ...restSorted,
    ...tail.sort(compareContractorTimelineEvents),
    ...(payoutEvent ? [payoutEvent] : []),
  ];
}

const JobInProgress = ({ props }) => {
  // const hasShownModal = useRef(false);
  // useEffect(() => {
  //   const hasApprovedChangeOrder = props?.jobDetails?.changeOrders?.some(
  //     co => co?.status === 'APPROVED',
  //   );
  //   if (hasApprovedChangeOrder && !hasShownModal.current) {
  //     hasShownModal.current = true;
  //     props.openModal(
  //       'congratulations_on_budget_increase_modal',
  //       props.jobDetails,
  //     );
  //   }
  // }, [props?.jobDetails]);

  const activityData = useMemo(() => {
    const proertyOwnerName =
      props.jobDetails?.postedBy.firstName +
      '' +
      props.jobDetails?.postedBy.lastName;

    if (!props.jobDetails) return [];

    return buildContractorBidTimelineEvents(
      props.jobDetails,
      proertyOwnerName,
      props,
    );
  }, [props.jobDetails]);

  const hasUserReviewed = props?.jobDetails?.feedbacks?.some(
    fb => fb?.fromUserId === props?.jobDetails?.bids?.[0]?.contractor?.id,
  );

  const renderActivityItem = (item, index) => {
    const isLast = index === activityData.length - 1;
    const showLine =
      item.type !== 'OWNER_ACCEPT_ORDER' &&
      item.type !== 'CONTRACTOR_JOB_STARTED' &&
      item.type !== 'JOB_STATUS_CHANGED';

    const beforePhotos = item.meta?.photos || [];
    const photoType = item.meta?.photoType;
    const typeLabel = formatPhotoType(photoType);

    return (
      <View style={styles.itemContainer}>
        {!isLast && <View style={styles.line} />}
        <View style={styles.timelineIcon}>
          <item.icon style={styles.sideIcon} fill={'#2A2A2A'} />
        </View>

        <View style={styles.activityItem}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityDate}>{formatDate(item.time)}</Text>
          {showLine && <View style={styles.bottomLine} />}
          {item.meta?.message && (
            <Text style={styles.activityMessage}>{item.meta.message}</Text>
          )}
          {photoType === 'BEFORE' &&
            Array.isArray(beforePhotos) &&
            beforePhotos.length > 0 && (
              <View>
                <Text
                  style={[
                    styles.activityMessage,
                    { marginVertical: Spacing.xs },
                  ]}
                >
                  {typeLabel &&
                    `${typeLabel} ${
                      beforePhotos.length > 1 ? 'Photos' : 'Photo'
                    } ${beforePhotos.length}`}
                </Text>

                <FlatList
                  horizontal
                  data={beforePhotos}
                  keyExtractor={(url, idx) => `${photoType}-${idx}`}
                  renderItem={({ item: url }) => (
                    <View>
                      <Image
                        source={{ uri: url }}
                        style={{
                          width: 160,
                          height: 114,
                          borderRadius: Spacing.s,
                          marginRight: Spacing.s,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                  showsHorizontalScrollIndicator={true}
                />
              </View>
            )}
          {/* Change order type label */}
          {item.meta?.typeLabel && (
            <View
              style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            >
              <Text style={styles.activityMessage}>Type: </Text>
              <Text style={styles.activityMessage}>{item.meta.typeLabel}</Text>
            </View>
          )}
          {/* Change order evidence photos (keep original) */}
          {item.type === 'CHANGE_ORDER' && (
            <View style={styles.starRow}>
              {Array.isArray(item.meta.evidencePhotos) &&
                item.meta.evidencePhotos.map((image, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: image }}
                    style={{
                      width: 160,
                      height: 114,
                      borderRadius: Spacing.s,
                    }}
                    resizeMode="contain"
                  />
                ))}
            </View>
          )}
          {/* // ----- AFTER photos (inside CONTRACTOR_MARK_JOB_COMPLETED) ----- */}
          {item.type === 'CONTRACTOR_MARK_JOB_COMPLETED' &&
            item.meta?.afterPhotos?.length > 0 && (
              <View style={{ marginVertical: Spacing.xs }}>
                <FlatList
                  horizontal
                  data={item.meta.afterPhotos}
                  keyExtractor={(url, idx) => `after-${idx}`}
                  renderItem={({ item: url }) => (
                    <View>
                      <Image
                        source={{ uri: url }}
                        style={{
                          width: 160,
                          height: 114,
                          borderRadius: Spacing.s,
                          marginRight: Spacing.s,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                  showsHorizontalScrollIndicator={true}
                />
              </View>
            )}
          {/* Amount block */}
          {item?.meta?.amount && (
            <View style={styles.budgetContainer}>
              <View>
                <Text style={styles.budgetLabel}>
                  {' '}
                  {item?.type === 'CONTRACTOR_MARK_JOB_COMPLETED'
                    ? 'Released Amount'
                    : 'Amount'}
                </Text>
                <Text style={styles.budgetValue}>{item.meta.amount}</Text>
              </View>
              {item.meta.status && (
                <Text style={styles.activityMessage}>{item.meta.status}</Text>
              )}
            </View>
          )}

          {/* Rating block */}
          {item.meta?.rating && (
            <View style={styles.ratingsContainer}>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>Work Quality</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <RatingStart
                      key={star}
                      style={styles.sideIcon}
                      fill={star <= item.meta.rating ? '#FF8D28' : '#E1E1E1'}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>Communication</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <RatingStart
                      key={star}
                      style={styles.sideIcon}
                      fill={star <= item.meta.rating ? '#FF8D28' : '#E1E1E1'}
                    />
                  ))}
                </View>
              </View>
              {item.meta.reviewText && (
                <>
                  <View
                    style={[
                      styles.reviewBox,
                      {
                        backgroundColor: item.meta.fromOwner
                          ? '#FFF4EA'
                          : '#E6F6FC',
                      },
                    ]}
                  >
                    <Text style={styles.review}>Review</Text>
                    <Text style={styles.reviewText}>
                      {item.meta?.reviewText}
                    </Text>
                  </View>
                  {!hasUserReviewed && (
                    <Button
                      text={'Complete Job & Submit Review'}
                      color={AppColor.white}
                      backgroundColor={'#009FD9'}
                      width={'100%'}
                      height={44}
                      fontFamily={PopinsFont.regular}
                      fontSize={FontSizes.m}
                      lineHeight={Spacing.xl}
                      borderRadius={Spacing.s}
                      marginVertical={10}
                      onPress={() =>
                        props.openModal('review_rating', props.jobDetails)
                      }
                    />
                  )}
                </>
              )}
            </View>
          )}
          {/* Action button (payout status) */}
          {item.actionButton &&
            item?.type === 'JOB_COMPLETED_CHECK_PAYOUTS' &&
            props.jobDetails?.jobStatus === 'COMPLETED' && (
              <View style={styles.actionButtons}>
                <Button
                  text={item?.actionButton.name}
                  color={'#151515'}
                  fontFamily={PopinsFont.regular}
                  fontSize={FontSizes.s}
                  lineHeight={Spacing.l}
                  leftIcon={<item.actionButton.icon style={styles.icon} />}
                  iconSpacing={5}
                  backgroundColor={'#F7F7F7'}
                  width={'100%'}
                  height={44}
                  borderRadius={Spacing.s}
                  onPress={item.actionButton.onPress}
                />
              </View>
            )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      {activityData.map((item, index) => {
        return <View>{renderActivityItem(item, index)}</View>;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    position: 'relative',
    borderTopLeftRadius: Spacing.l,
    borderTopRightRadius: Spacing.l,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: Spacing.l,
    position: 'relative',
    borderRadius: Spacing.l,
  },
  line: {
    position: 'absolute',
    top: 15,
    bottom: -17,
    left: 32,
    width: 1,
    backgroundColor: '#2A2A2A',
  },
  activityItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: Spacing.l,
    flex: 1,
    padding: Spacing.s,
  },

  timelineIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: '#2A2A2A',
    zIndex: 2,
    marginTop: -3,
  },
  activityTitle: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },

  activityDate: {
    color: '#6A6A6A',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.medium,
    lineHeight: Spacing.xl,
    marginTop: 8,
  },
  activityMessage: {
    fontSize: FontSizes.s,
    color: '#6A6A6A',
    lineHeight: Spacing.xl,
    marginTop: 6,
    fontFamily: PopinsFont.regular,
  },
  budgetContainer: {
    marginTop: 10,
    backgroundColor: '#F7F7F7',
    padding: Spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    width: '100%',
    alignSelf: 'center',
  },

  budgetLabel: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
  },
  budgetValue: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    lineHeight: Spacing.xl3,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },

  ratingsContainer: {
    marginTop: 12,
    flex: 1,
  },
  ratingRow: {
    alignItems: 'center',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    // width: 100,
    fontSize: FontSizes.x,
    lineHeight: Spacing.xl,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewBox: {
    backgroundColor: '#FFF4EA',
    paddingHorizontal: Spacing.s,
    paddingTop: Spacing.s,
    paddingBottom: Spacing.s,
    borderRadius: 12,
    width: '100%',
  },
  review: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
  },
  reviewText: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.xl,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },

  sideIcon: { height: 16, width: 16 },
  icon: { height: 20, width: 20 },

  starRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#E1E1E1',
    alignSelf: 'center',
    marginVertical: Spacing.xs,
  },
});
export default JobInProgress;
