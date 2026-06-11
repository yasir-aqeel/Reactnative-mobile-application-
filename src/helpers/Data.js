import moment from 'moment';
import { images } from '../assets/images';
import {
  Invites,
  ChangeOrder,
  SMSIcon,
  ContractorIcon,
  PropertyOwnerIcon,
  SecurityIcon,
  RightArrow,
  NotificationIcon,
  SubscriptionIcon,
  BusinessDetailsIcon,
  LinkedAccountIcon,
  FaqIcon,
  TermsOfServicesIcon,
  UserPolicyIcon,
  RedirectIcon,
} from '../assets/svg';
import NavigationService from './NavigationService';
import { Linking } from 'react-native';
export const iconColors = [
  '#FF383C',
  '#3DBE84',
  '#009FD9',
  '#FFB020',
  '#8E44AD',
];
export const roles = [
  {
    label: 'Contractor',
    value: 'CONTRACTOR',
    key: 'contractor',
    icon: ContractorIcon,
  },
  {
    label: 'Property Owner',
    value: 'PROPERTY_OWNER',
    key: 'propertyOwner',
    icon: PropertyOwnerIcon,
  },
];
export const topScreens = [
  {
    name: 'Security',
    id: 'security',
    leftIcon: SecurityIcon,
    rightIcon: RightArrow,
    onPress: () => {
      NavigationService.navigate('Security');
    },
  },
  {
    name: 'Notifications',
    id: 'notifications',
    leftIcon: NotificationIcon,
    rightIcon: null,
    onPress: () => {
      NavigationService.navigate('NotificationSettings');
    },
  },
  {
    name: 'Subscription',
    id: 'subscription',
    leftIcon: SubscriptionIcon,
    rightIcon: RightArrow,
    onPress: () => {
      NavigationService.navigate('Subscription');
    },
  },
  {
    name: 'Business Details',
    id: 'business_details',
    leftIcon: BusinessDetailsIcon,
    rightIcon: RightArrow,
    onPress: () => {
      NavigationService.navigate('BusinessDetails');
    },
  },
  {
    name: 'Linked Bank Acccount',
    id: 'linked_bank_acccount',
    leftIcon: LinkedAccountIcon,
    rightIcon: RightArrow,
    onPress: () => {
      NavigationService.navigate('LinkBankAccount');
    },
  },
];
export const bottomScreens = [
  {
    name: 'FAQs',
    id: 'faqs',
    leftIcon: FaqIcon,
    rightIcon: RedirectIcon,
    onPress: () => {
      Linking.openURL('https://fixrli.com/product/');
    },
  },
  {
    name: 'Terms of Services',
    id: 'terms_of_services',
    leftIcon: TermsOfServicesIcon,
    rightIcon: RedirectIcon,
    onPress: () => {
      Linking.openURL('https://fixrli.com/terms/');
    },
  },
  {
    name: 'User Policy',
    id: 'user_policy',
    leftIcon: UserPolicyIcon,
    rightIcon: RedirectIcon,
    onPress: () => {
      Linking.openURL('https://fixrli.com/contractors/');
    },
  },
];
const getTabCounts = (data = []) => {
  return data.reduce(
    (acc, item) => {
      if (item.type === 'message') {
        acc.message += 1;
      } else if (item.type === 'change_order') {
        acc.changeOrder += 1;
      } else if (item.type === 'invitation') {
        acc.newInvites += 1;
      }
      return acc;
    },
    {
      message: 0,
      changeOrder: 0,
      newInvites: 0,
    },
  );
};
export const dashboardTabs = (data = []) => {
  const counts = getTabCounts(data);

  return [
    {
      name: 'Change Order',
      value: 'CHANGE_ORDER',
      count: counts.changeOrder,
      icon: ChangeOrder,
      backgroundColor: '#FFF4EA',
      color: '#CC7120',
      borderColor: '#FFD1A9',
      activeColor: '#FFF4EA',
      activeBorderColor: '#FFD1A9',
    },
    {
      name: 'New Invites',
      value: 'NEW_INVITES',
      count: counts.newInvites,
      icon: Invites,
      backgroundColor: '#F8E9FA',
      color: '#9118A1',
      borderColor: '#E1A5E9',
      activeColor: '#F8E9FA',
      activeBorderColor: '#E1A5E9',
    },
    {
      name: 'Message',
      value: 'MESSAGE',
      count: counts.message,
      icon: SMSIcon,
      backgroundColor: '#ECF9F3',
      color: '#31986A',
      borderColor: '#B2E5CE',
      activeColor: '#ECF9F3',
      activeBorderColor: '#B2E5CE',
    },
  ];
};
export const dashboardData = {
  financeData: [
    {
      name: 'Cleaning Job at',
      owner: 'Mark Evens',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '2 days left',
      status: 'IN_PROGRESS',
      isJob: true,
      key: '@',
      jobId: '9209F5F',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      owner: 'Mark Evens',
      location: 'Farmhouse',

      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '2 days left',
      status: 'ASSIGNED',
      isJob: true,
      key: '!',
      jobId: '9209F5F',
      job_type: 'Fixed',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'ACTIVE',
      isJob: true,
      key: '1$',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'PAUSED',
      isJob: true,
      key: '$2',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'T&M',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'COMPLETED',
      isJob: true,
      key: '$3',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'T&M',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'CANCELED',
      isJob: true,
      key: '$4',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'PENDING',
      isJob: true,
      key: '$43',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'PENDING_APPROVAL',
      isJob: true,
      key: '$42',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'T&M',
      isFinance: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'REJECTED',
      isJob: true,
      key: '$41',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
      isFinance: true,
    },
  ],

  changeOrder: [
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      key: '@3',
      message:
        'I am on the site and I guess need few parts so I need budget to be increase by $50. Could you please accept the offer.',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      jobId: '9209F5F',
      isChangeOrder: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$99 (Fixed)',
      key: '@2',
      message:
        'I am on the site and I guess need few parts so I need budget to be increase by $50. Could you please accept the offer.',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      jobId: '9209F5F',
      isChangeOrder: true,
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$29 (Fixed)',
      key: '@1',
      isChangeOrder: true,
      message:
        'I am on the site and I guess need few parts so I need budget to be increase by $50. Could you please accept the offer.',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      jobId: '9209F5F',
    },
    {
      isChangeOrder: true,
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$29 (Fixed)',
      key: '@5',
      message:
        'I am on the site and I guess need few parts so I need budget to be increase by $50. Could you please accept the offer.',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      jobId: '9209F5F',
    },
  ],
  members: [
    {
      memberName: 'Michael',
      roles: 'Worker',
      propertyOwner: 'Mark Evens',
      status: 'ACTIVE',
      rating: '4.9',
      image: images.userImage,
      key: 'Michael',
    },
    {
      memberName: 'Anna',
      roles: 'Worker',
      propertyOwner: 'Mark Evens',
      status: 'ACTIVE',
      rating: '4.9',
      image: images.user2,
      key: 'Anna',
    },
    {
      memberName: 'Ammar',
      roles: 'Worker',
      propertyOwner: 'Mark Evens',
      status: 'ACTIVE',
      rating: '4.9',
      image: images.user3,
      key: 'Ammar',
    },
    {
      memberName: 'David',
      roles: 'Worker',
      propertyOwner: 'Mark Evens',
      status: 'ACTIVE',
      rating: '4.9',
      image: images.user4,
      key: 'David',
    },
    {
      memberName: 'Michael',
      roles: 'Worker',
      propertyOwner: 'Mark Evens',
      status: 'ACTIVE',
      rating: '4.9',
      image: images.user1,
      key: 'Michael1',
    },
  ],
  memberJobs: [
    {
      name: 'Cleaning Job at',
      owner: 'Mark Evens',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '2 days left',
      status: 'IN_PROGRESS',
      isJob: true,
      key: '@',
      jobId: '9209F5F',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
    },
    {
      name: 'Cleaning Job at',
      owner: 'Mark Evens',
      location: 'Farmhouse',

      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '2 days left',
      status: 'ASSIGNED',
      isJob: true,
      key: '!',
      jobId: '9209F5F',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'ACTIVE',
      isJob: true,
      key: '1$',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'PAUSED',
      isJob: true,
      key: '$2',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'T&M',
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'COMPLETED',
      isJob: true,
      key: '$3',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'T&M',
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'CANCELED',
      isJob: true,
      key: '$4',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'PENDING',
      isJob: true,
      key: '$43',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'PENDING_APPROVAL',
      isJob: true,
      key: '$42',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'T&M',
    },
    {
      name: 'Cleaning Job at',
      location: 'Farmhouse',
      type: 'Public',
      budget: '$89 (Fixed)',
      deadline: '4 days left',
      status: 'REJECTED',
      isJob: true,
      key: '$41',
      jobId: '9209F5F',
      owner: 'Mark Evens',
      address: '920 N, Old World 3rd St, Milwaukee, WI 53202, USA',
      job_type: 'Fixed',
    },
  ],
  reviewsData: [
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '1',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '2',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '3',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '321',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '35',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '34',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '33',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '32',
    },
    {
      name: 'Davis John',
      date: ' 15-04-2025',
      rating: '4.9',
      review:
        'I had a great experience working with mark and he is very kind person and would love to work with him again.',
      jobId: '9209F5F',
      key: '31',
    },
  ],
  messages: [
    {
      image: images.user1,
      header: 'Owner',
      name: 'Mark Evens',
      message: 'I am on the site and I guess need',
      key: '@',
      isMessage: true,
    },
    {
      image: images.user1,
      isMessage: true,
      header: 'Owner',
      name: 'Mark Evens',
      message: 'I am on the site and I guess need',
      key: '@1',
    },
    {
      image: images.user11,
      isMessage: true,
      header: 'Owner',
      name: 'Mark Evens',
      message: 'I am on the site and I guess need',
      key: '@12',
    },
    {
      image: images.user1,
      isMessage: true,
      header: 'Owner',
      name: 'Mark Evens',
      message: 'I am on the site and I guess need',
      key: '@21',
    },
    {
      image: images.user1,
      isMessage: true,
      header: 'Owner',
      name: 'Mark Evens',
      message: 'I am on the site and I guess need',
      key: '@112',
    },
    {
      image: images.user1,
      isMessage: true,
      header: 'Owner',
      name: 'Mark Evens',
      message: 'I am on the site and I guess need',
      key: '@221',
    },
    {
      image: images.user1,
      isMessage: true,
      header: 'Owner',
      name: 'Mark Evens',
      message: 'I am on the site and I guess need',
      key: '@212',
    },
  ],
  transactions: [
    {
      name: 'Monthly Pro Subscription',
      id: '9876',
      deadline: '-$90',
      date: '06/01/2026, 12:93',
      status: 'NEW',
      transactionId: 'cmkldw02u0019s60dn82gzvig',
    },
    {
      name: 'Monthly Pro Subscription',
      id: '9876',
      deadline: '-$90',
      date: '06/01/2026, 12:93',
      status: 'COMPLETED',
      transactionId: 'cmkldw02u0019s60dn82gzvig',
    },
    {
      name: 'Monthly Pro Subscription',
      id: '9876',
      deadline: '-$90',
      date: '06/01/2026, 12:93',
      status: 'COMPLETED',
      transactionId: 'cmkldw02u0019s60dn82gzvig',
    },
    {
      name: 'Monthly Pro Subscription',
      id: '9876',
      deadline: '-$90',
      date: '06/01/2026, 12:93',
      status: 'COMPLETED',
      transactionId: 'cmkldw02u0019s60dn82gzvig',
    },
    {
      name: 'Monthly Pro Subscription',
      id: '9876',
      deadline: '-$90',
      date: '06/01/2026, 12:93',
      status: 'COMPLETED',
      transactionId: 'cmkldw02u0019s60dn82gzvig',
    },
    {
      name: 'Monthly Pro Subscription',
      id: '9876',
      deadline: '-$90',
      date: '06/01/2026, 12:93',
      status: 'NEW',
      transactionId: 'cmkldw02u0019s60dn82gzvig',
    },
  ],
};
const formatStatus = status => {
  const map = {
    IN_PROGRESS: 'In Progress',
    ASSIGNED: 'Assigned',
    ACTIVE: 'Active',
    ACCEPTED: 'Accepted',
    PAUSED: 'Paused',
    COMPLETED: 'Complete',
    CANCELED: 'Cancelled',
    PENDING: 'Pending',
    REJECTED: 'Rejected',
    PENDING_APPROVAL: ' Pending Approval',
    REJECTED: 'Rejected',
    EXPIRED: 'Expired',
    OFFER_SENT: 'Offer Sent',
    CONVERTED: 'Converted',
    ACTIVE_MEMBER: 'Active Member',
    OTHERS: 'Others',
    NEW_INVITES: 'New Invites',
    CHANGE_ORDER: 'Change Order',
    MESSAGE: 'Message',
    NEW: 'New',
    BEST: 'Best',
    GOOD: 'Good',
    POOR: 'Poor',
    PAID: 'Paid',
    PROCESSING: 'Processing',
  };

  return map[status] || status;
};
export const getStatusLabel = value => {
  if (value === 'all') return 'All';
  return formatStatus(value);
};
export const statusColors = {
  IN_PROGRESS: '#FF8D28',
  ASSIGNED: '#009FD9',
  ACTIVE: '#B51EC9',
  PAUSED: '#A6A6A6',
  COMPLETED: '#3DBE84',
  PAID: '#3DBE84',
  CANCELED: '#FF383C',
  PENDING: '#FF8D28',
  PENDING_APPROVAL: '#007FAE',
  REJECTED: '#EB5757',
};
export const filterStatus = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Assigned', value: 'ASSIGNED' },
  { label: 'Cancelled', value: 'CANCELED' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Paused', value: 'PAUSED' },
  { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
  { label: 'Rejected', value: 'REJECTED' },
];
export const financeFilterStatus = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Pending Approval', value: 'Pending Approval' },
];
export const reviewsFilterStatus = [
  { label: 'All', value: 'all' },
  { label: 'Best', value: 'BEST' },
  { label: 'Good', value: 'Good' },
  { label: 'Poor', value: 'POOR' },
];
export const reviewOptions = [
  { label: 'Last 7 Days', value: 'last_7_days' },
  { label: 'Last 30 Days', value: 'last_30_days' },
  { label: 'This Month', value: 'this_month' },
];

export function filterFeedbacksByDate(feedbacks, filter) {
  const now = new Date();
  let from;

  switch (filter) {
    case 'last_7_days':
      from = new Date(now);
      from.setDate(from.getDate() - 7);
      break;
    case 'last_30_days':
      from = new Date(now);
      from.setDate(from.getDate() - 30);
      break;
    case 'this_month':
      from = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      return feedbacks;
  }

  return feedbacks.filter(fb => new Date(fb.createdAt) >= from);
}

export function filterFeedbacksBySentiment(feedbacks, sentiment) {
  switch (sentiment?.toLowerCase()) {
    case 'best':
      return feedbacks.filter(fb => fb.rating >= 4);

    case 'good':
      return feedbacks.filter(fb => fb.rating === 3);

    case 'poor':
      return feedbacks.filter(fb => fb.rating <= 2);

    default:
      return feedbacks;
  }
}

export const jobStatus = [
  // { name: 'Pending Bid', dotColor: '#FF8D28', id: 'pending_bid' },
  { name: 'Active', dotColor: '#00C0E8', id: 'ACTIVE' },
  { name: 'In Progress', dotColor: '#FF8D28', id: 'IN_PROGRESS' },
  { name: 'Assigned', dotColor: '#C44BD4', id: 'ASSIGNED' },
  { name: 'Paused', dotColor: '#FF383C', id: 'PAUSED' },
  { name: 'Pending Approval', dotColor: '#007FAE', id: 'PENDING_APPROVAL' },
  { name: 'Complete', dotColor: '#3DBE84', id: 'COMPLETED' },
  { name: 'Canceled', dotColor: '#C3C3C3', id: 'CANCELED' },
];

export const memberStatuses = [
  { name: 'Active', dotColor: '#00C0E8', id: 'active' },
  { name: 'Disable', dotColor: '#C3C3C3', id: 'disable' },
];

export const formatAmount = amount => {
  const num = Number(amount || 0);
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num;
};
export function numericValue(value, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}
export const getDateLabel = (from, to) => {
  if (!from || !to) return 'Select Date';
  const start = moment(from, 'YYYY-MM-DD');
  const end = moment(to, 'YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  // -------------------------
  // TODAY
  // -------------------------
  if (start.isSame(end, 'day') && start.format('YYYY-MM-DD') === today) {
    return 'Today';
  }
  // -------------------------
  // LAST 7 DAYS (reliable)
  // -------------------------
  const last7Start = moment().subtract(6, 'days').format('YYYY-MM-DD');
  const last7End = today;

  if (from === last7Start && to === last7End) {
    return 'Last 7 Days';
  }
  // -------------------------
  // LAST 30 DAYS
  // -------------------------
  const last30Start = moment().subtract(29, 'days').format('YYYY-MM-DD');
  if (from === last30Start && to === last7End) {
    return 'Last 30 Days';
  }
  // -------------------------
  // LAST 3 MONTHS
  // -------------------------
  const last3MonthStart = moment()
    .subtract(3, 'months')
    .startOf('day')
    .format('YYYY-MM-DD');
  if (from === last3MonthStart && to === last7End) {
    return 'Last 3 Months';
  }
  // -------------------------
  // DEFAULT
  // -------------------------
  return 'Custom';
};
