import {
  ActiveBids,
  FinanceIcon,
  JobsIcon,
  MessageIcon,
  RejectIcon,
} from '../assets/svg';

export const NOTIFICATION_UI_CONFIG = {
  GENERAL: {
    icon: MessageIcon,
    bg: '#F7F7F7',
    border: '#E1E1E1',
    color: '#6A6A6A',
  },

  SYSTEM: {
    icon: MessageIcon,
    bg: '#F7F7F7',
    border: '#E1E1E1',
    color: '#6A6A6A',
  },

  BID: {
    icon: ActiveBids,
    bg: '#E6F6FC',
    border: '#CCECF7',
    color: '#007FAE',
  },

  JOB_UPDATE: {
    icon: JobsIcon,
    bg: '#ECF9F3',
    border: '#B2E5CE',
    color: '#31986A',
  },

  JOB_STARTED: {
    icon: JobsIcon,
    bg: '#ECF9F3',
    border: '#B2E5CE',
    color: '#31986A',
  },

  JOB_COMPLETED: {
    icon: JobsIcon,
    bg: '#ECF9F3',
    border: '#B2E5CE',
    color: '#31986A',
  },

  JOB_PAUSED: {
    icon: RejectIcon,
    bg: '#FFECEC',
    border: '#FFD7D8',
    color: '#FF383C',
  },

  JOB_CANCELLED: {
    icon: RejectIcon,
    bg: '#FFECEC',
    border: '#FFD7D8',
    color: '#FF383C',
  },

  PAYMENT_RELEASED: {
    icon: FinanceIcon,
    bg: '#F7F7F7',
    border: '#E1E1E1',
    color: '#6A6A6A',
  },

  PAYMENT_AUTHORIZED: {
    icon: FinanceIcon,
    bg: '#F7F7F7',
    border: '#E1E1E1',
    color: '#6A6A6A',
  },

  PAYMENT_CAPTURED: {
    icon: FinanceIcon,
    bg: '#F7F7F7',
    border: '#E1E1E1',
    color: '#6A6A6A',
  },

  PAYMENT_CANCELED: {
    icon: RejectIcon,
    bg: '#FFECEC',
    border: '#FFD7D8',
    color: '#FF383C',
  },

  PAYMENT_REQUESTED: {
    icon: FinanceIcon,
    bg: '#F7F7F7',
    border: '#E1E1E1',
    color: '#6A6A6A',
  },
};
