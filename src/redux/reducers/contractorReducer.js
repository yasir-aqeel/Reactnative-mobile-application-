import { RESET_ALL_LOADING, USER_LOGOUT } from '../types/auth_action_types';
import {
  // contractor earnings
  GET_EARNINGS_REQUEST,
  GET_EARNINGS_REQUEST_SUCCESS,
  GET_EARNINGS_REQUEST_FAILED,
  // action items
  ACTION_ITEMS_REQUEST,
  ACTION_ITEMS_REQUEST_SUCCESS,
  ACTION_ITEMS_REQUEST_FAILED,
  // my applied Jobs
  GET_MY_JOBS_REQUEST,
  GET_MY_JOBS_REQUEST_SUCCESS,
  GET_MY_JOBS_REQUEST_FAILED,
  // jobs for contractor new
  GET_JOBS_FOR_CONTRACTOR_REQUEST_FAILED,
  GET_JOBS_FOR_CONTRACTOR_REQUEST_SUCCESS,
  GET_JOBS_FOR_CONTRACTOR_REQUEST,
  // get jobs due today for contractor
  GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST,
  GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_SUCCESS,
  GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_FAILED,
  // submit Bid on Job
  SUBMIT_BID_REQUEST,
  SUBMIT_BID_REQUEST_SUCCESS,
  SUBMIT_BID_REQUEST_FAILED,
  // get submitted bids
  SUBMITTED_BIDS_REQUEST,
  SUBMITTED_BIDS_REQUEST_SUCCESS,
  SUBMITTED_BIDS_REQUEST_FAILED,
  // withdraw bid
  WITHDRAW_BID_REQUEST,
  WITHDRAW_BID_REQUEST_SUCCESS,
  WITHDRAW_BID_REQUEST_FAILED,

  // get all reviwes
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_REQUEST_SUCCESS,
  GET_REVIEWS_REQUEST_FAILED,
  // get notifications
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_REQUEST_SUCCESS,
  GET_NOTIFICATIONS_REQUEST_FAILED,
  // get all sessions
  GET_ALL_SESSIONS_REQUEST,
  GET_ALL_SESSIONS_REQUEST_SUCCESS,
  GET_ALL_SESSIONS_REQUEST_FAILED,
  // get direct assigned bids
  GET_DIRECT_ASSIGNED_BIDS_REQUEST,
  GET_DIRECT_ASSIGNED_BIDS_REQUEST_SUCCESS,
  GET_DIRECT_ASSIGNED_BIDS_REQUEST_FAILED,

  // get single job details
  GET_SINGLE_JOB_DETAILS_REQUEST,
  GET_SINGLE_JOB_DETAILS_REQUEST_SUCCESS,
  GET_SINGLE_JOB_DETAILS_REQUEST_FAILED,
  // notification preferences
  GET_NOTIFICATIONS_PREFERENCES_REQUEST,
  GET_NOTIFICATIONS_PREFERENCES_REQUEST_SUCCESS,
  GET_NOTIFICATIONS_PREFERENCES_REQUEST_FAILED,
} from '../types/contractor_action_types';

const appState = {
  contractorEarnings: null,
  actionItemData: null,
  contractorAppliedJobs: null,
  newJobsForContractor: null,
  allSubmittedBids: null,
  useBidsScreen: false,
  useMyJobsScreen: false,
  jobsDueToday: null,
  wonJobsWithStatus: null,
  allReviwesForContractor: null,
  allNotifications: null,
  allSessions: null,
  allDirectAssingedBids: null,
  singleJobDetails: null,
  notificationsPreferences: null,
};

const initialState = {
  data: appState,
  isLoading: false,
  error: null,
};

export const contractorReducer = (state = initialState, action) => {
  switch (action.type) {
    // reset loading
    case RESET_ALL_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    // contractor earning Data
    case GET_EARNINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_EARNINGS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          contractorEarnings: action.payload,
        },
      };
    case GET_EARNINGS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // Action Items Data
    case ACTION_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_ITEMS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          actionItemData: action.payload,
        },
      };

    case ACTION_ITEMS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // contractor applied Jobs
    case GET_MY_JOBS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_MY_JOBS_REQUEST_SUCCESS:
      const prevJobs = state.data?.contractorJobs;

      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          contractorAppliedJobs:
            action.payload.page === 1
              ? action.payload.data
              : [...prevJobs, ...action.payload.data],
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
        },
      };

    case GET_MY_JOBS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // contractor new Jobs
    case GET_JOBS_FOR_CONTRACTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_JOBS_FOR_CONTRACTOR_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          newJobsForContractor: action.payload,
        },
      };

    case GET_JOBS_FOR_CONTRACTOR_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // submit Bid On New Job
    case SUBMIT_BID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SUBMIT_BID_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   newJobsForContractor: action.payload,
        // },
      };

    case SUBMIT_BID_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // withdraw Bid

    case WITHDRAW_BID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case WITHDRAW_BID_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // data: {
        //   ...state.data,
        //   newJobsForContractor: action.payload,
        // },
      };

    case WITHDRAW_BID_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // get Submiotted Bids
    case SUBMITTED_BIDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SUBMITTED_BIDS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          allSubmittedBids: action.payload,
        },
      };

    case SUBMITTED_BIDS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // get Submiotted Bids
    case GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          jobsDueToday: action.payload,
        },
      };

    case GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // get Reviwes for contractor
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_REVIEWS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          allReviwesForContractor: action.payload,
        },
      };

    case GET_REVIEWS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // get Notificatoins for contractor
    case GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case GET_NOTIFICATIONS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          allNotifications: action.payload,
        },
      };

    case GET_NOTIFICATIONS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // get Notificatoins preferences
    case GET_NOTIFICATIONS_PREFERENCES_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case GET_NOTIFICATIONS_PREFERENCES_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          notificationsPreferences: action.payload,
        },
      };

    case GET_NOTIFICATIONS_PREFERENCES_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // get all sessions
    case GET_ALL_SESSIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_SESSIONS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          allSessions: action.payload,
        },
      };

    case GET_ALL_SESSIONS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // get direct assigned bids
    case GET_DIRECT_ASSIGNED_BIDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_DIRECT_ASSIGNED_BIDS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          allDirectAssingedBids: action.payload,
        },
      };

    case GET_DIRECT_ASSIGNED_BIDS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // get single job details
    case GET_SINGLE_JOB_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_SINGLE_JOB_DETAILS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          singleJobDetails: action.payload,
        },
      };

    case GET_SINGLE_JOB_DETAILS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // user logout states empty
    case USER_LOGOUT:
      return {
        ...state,
        data: {
          ...state.data,
          contractorEarnings: null,
          actionItemData: null,
          contractorAppliedJobs: null,
          newJobsForContractor: null,
          allSubmittedBids: null,
          useBidsScreen: false,
          useMyJobsScreen: false,
          jobsDueToday: null,
          wonJobsWithStatus: null,
          allReviwesForContractor: null,
          allNotifications: null,
          allSessions: null,
          allDirectAssingedBids: null,
          allChatList: null,
          singleJobDetails: null,
          notificationsPreferences: null,
        },
      };

    default:
      return state;
  }
};
