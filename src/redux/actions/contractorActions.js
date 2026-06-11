import apiClient from '../../helpers/apiClient';
import {
  // contractor earnings
  GET_EARNINGS_REQUEST,
  GET_EARNINGS_REQUEST_SUCCESS,
  GET_EARNINGS_REQUEST_FAILED,
  // action items
  ACTION_ITEMS_REQUEST,
  ACTION_ITEMS_REQUEST_SUCCESS,
  ACTION_ITEMS_REQUEST_FAILED,
  // contractor applied Jobs
  GET_MY_JOBS_REQUEST,
  GET_MY_JOBS_REQUEST_SUCCESS,
  GET_MY_JOBS_REQUEST_FAILED,

  // jobs for contractor new
  GET_JOBS_FOR_CONTRACTOR_REQUEST,
  GET_JOBS_FOR_CONTRACTOR_REQUEST_SUCCESS,
  GET_JOBS_FOR_CONTRACTOR_REQUEST_FAILED,
  // submit Bid on Job
  SUBMIT_BID_REQUEST,
  SUBMIT_BID_REQUEST_SUCCESS,
  SUBMIT_BID_REQUEST_FAILED,
  // get submitted bids
  SUBMITTED_BIDS_REQUEST,
  SUBMITTED_BIDS_REQUEST_SUCCESS,
  SUBMITTED_BIDS_REQUEST_FAILED,
  // get jobs due today for contractor
  GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST,
  GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_SUCCESS,
  GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_FAILED,
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
  // withdraw bid
  WITHDRAW_BID_REQUEST,
  WITHDRAW_BID_REQUEST_SUCCESS,
  WITHDRAW_BID_REQUEST_FAILED,
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
  // update notification preferences
  UPDATE_NOTIFICATIONS_PREFERENCES_REQUEST,
  UPDATE_NOTIFICATIONS_PREFERENCES_REQUEST_SUCCESS,
  UPDATE_NOTIFICATIONS_PREFERENCES_REQUEST_FAILED,
} from '../types/contractor_action_types';
import { RESET_ALL_LOADING } from '../types/auth_action_types';
// reset loading
export const resetAllLoading = () => ({
  type: RESET_ALL_LOADING,
});
// contractor earnings
const contractorEarningsRequest = () => {
  return {
    type: GET_EARNINGS_REQUEST,
  };
};
const contractorEarningsRequestSuccess = data => {
  return {
    type: GET_EARNINGS_REQUEST_SUCCESS,
    payload: data,
  };
};

const contractorEarningsRequestFailed = error => {
  return {
    type: GET_EARNINGS_REQUEST_FAILED,
    payload: error,
  };
};
export const contractorEarnings = filters => {
  return async dispatch => {
    dispatch(contractorEarningsRequest());

    try {
      const response = await apiClient.get(`finance/contractor/earnings`, {
        params: {
          page: filters?.page,
          limit: filters?.limit,
          // search: filters?.search || '',
          // status: filters?.status || '',
          // fromDate: filters?.fromDate || '',
          // toDate: filters?.toDate || '',
        },
      });

      dispatch(contractorEarningsRequestSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(contractorEarningsRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// action items
const actionItemsRequest = () => {
  return {
    type: ACTION_ITEMS_REQUEST,
  };
};
const actionItemsRequestSuccess = data => {
  return {
    type: ACTION_ITEMS_REQUEST_SUCCESS,
    payload: data,
  };
};

const actionItemsRequestFailed = error => {
  return {
    type: ACTION_ITEMS_REQUEST_FAILED,
    payload: error,
  };
};

export const actionItemsData = filters => {
  return async dispatch => {
    dispatch(actionItemsRequest());

    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== '' && value !== null,
        ),
      );

      const response = await apiClient.get(`dashboard/action-items`, {
        params: cleanedFilters,
      });

      dispatch(actionItemsRequestSuccess(response.data));

      return response.data;
    } catch (error) {
      console.log('API error:', error?.response || error);

      dispatch(actionItemsRequestFailed(error.message));

      return error?.response?.data || error.message;
    }
  };
};
// get applied jobs data
const getAppliedJobsRequest = () => {
  return {
    type: GET_MY_JOBS_REQUEST,
  };
};
const getAppliedJobsRequestSuccess = data => {
  return {
    type: GET_MY_JOBS_REQUEST_SUCCESS,
    payload: data,
  };
};

const getAppliedJobsRequestFailed = error => {
  return {
    type: GET_MY_JOBS_REQUEST_FAILED,
    payload: error,
  };
};
export const getMyAppliedJobsData = (
  contractorId,
  page = 1,
  limit = 10,
  jobStatus,
) => {
  return async dispatch => {
    dispatch(getAppliedJobsRequest());

    try {
      const params = new URLSearchParams({
        page,
        limit,
      });

      if (jobStatus && jobStatus !== 'all') {
        params.append('jobStatus', jobStatus);
      }

      const response = await apiClient.get(
        `bids/contractor/${contractorId}/won?${params.toString()}`,
      );

      const payload = {
        page,
        data: response.data.jobs,
        totalCount: response.data.totalCount,
        totalPages: response.data.totalPages,
      };

      dispatch(getAppliedJobsRequestSuccess(payload));

      return payload;
    } catch (error) {
      dispatch(getAppliedJobsRequestFailed(error.message));

      if (error.response) throw error.response.data;

      return { message: error.message };
    }
  };
};
const getAvailablejobsForContractorRequest = () => {
  return {
    type: GET_JOBS_FOR_CONTRACTOR_REQUEST,
  };
};
const getAvailablejobsForContractorRequestSuccess = data => {
  return {
    type: GET_JOBS_FOR_CONTRACTOR_REQUEST_SUCCESS,
    payload: data,
  };
};

const getAvailablejobsForContractorRequestFailed = error => {
  return {
    type: GET_JOBS_FOR_CONTRACTOR_REQUEST_FAILED,
    payload: error,
  };
};

export const getAvailableJobsForContractorData = filters => {
  return async dispatch => {
    dispatch(getAvailablejobsForContractorRequest());
    try {
      const {
        page,
        limit,
        search,
        city,
        minBudget,
        maxBudget,
        sortBy,
        sortOrder,
      } = filters;

      // Build query params safely
      const params = new URLSearchParams();
      params.set('page', String(page || 1));
      params.set('limit', String(limit || 5));
      params.set('sortBy', sortBy || 'createdAt');
      params.set('sortOrder', sortOrder || 'desc');

      if (search?.trim()) params.set('search', search.trim());
      if (city?.trim()) params.set('city', city.trim());
      if (minBudget !== null && minBudget !== undefined && minBudget !== '') {
        params.set('minBudget', String(minBudget));
      }
      if (maxBudget !== null && maxBudget !== undefined && maxBudget !== '') {
        params.set('maxBudget', String(maxBudget));
      }

      const response = await apiClient.get(
        `jobs/available-for-contractor?${params.toString()}`,
      );

      // console.log('available-for-contractor response', response.data);

      dispatch(getAvailablejobsForContractorRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getAvailablejobsForContractorRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// submit Bid on Job
const submitBidRequest = () => {
  return {
    type: SUBMIT_BID_REQUEST,
  };
};
const submitBidRequestSuccess = data => {
  return {
    type: SUBMIT_BID_REQUEST_SUCCESS,
    payload: data,
  };
};

const submitBidRequestFailed = error => {
  return {
    type: SUBMIT_BID_REQUEST_FAILED,
    payload: error,
  };
};

export const submitBidOnNewJobData = body => {
  return async dispatch => {
    dispatch(submitBidRequest());
    try {
      const response = await apiClient.post(`bids`, body);

      // console.log('submitBidOnNewJobData response', response.data);

      dispatch(submitBidRequestSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(submitBidRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// withdraw bid
const withdrawBidRequest = () => {
  return {
    type: WITHDRAW_BID_REQUEST,
  };
};
const withdrawBidRequestSuccess = data => {
  return {
    type: WITHDRAW_BID_REQUEST_SUCCESS,
    payload: data,
  };
};

const withdrawBidRequestFailed = error => {
  return {
    type: WITHDRAW_BID_REQUEST_FAILED,
    payload: error,
  };
};

export const withdrawBid = (JobID, contractorId) => {
  return async dispatch => {
    dispatch(withdrawBidRequest());
    try {
      const response = await apiClient.delete(
        `bids/contractor/${JobID}/remove/${contractorId}`,
      );

      console.log('withdrawBid response', response.data);

      dispatch(withdrawBidRequestSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(withdrawBidRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// all submitted bids
const getSubmittedBidsRequest = () => {
  return {
    type: SUBMITTED_BIDS_REQUEST,
  };
};
const getSubmittedBidsRequestSuccess = data => {
  return {
    type: SUBMITTED_BIDS_REQUEST_SUCCESS,
    payload: data,
  };
};

const getSubmittedBidsRequestFailed = error => {
  return {
    type: SUBMITTED_BIDS_REQUEST_FAILED,
    payload: error,
  };
};

export const allSubmittedBidsData = (
  page,
  limit,
  jobId,
  contractorId,
  jobStatus,
  statusBid,
) => {
  return async dispatch => {
    dispatch(getSubmittedBidsRequest());
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (jobId) params.append('jobId', jobId);
      if (contractorId) params.append('contractorId', contractorId);
      if (jobStatus) {
        params.append('jobStatus', jobStatus);
      }
      if (statusBid) {
        params.append('status', statusBid);
      }
      const response = await apiClient.get(`bids?${params.toString()}`);

      // console.log('submitBidOnNewJobData response', response.data);

      dispatch(getSubmittedBidsRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getSubmittedBidsRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// all jobs due today
const getJobsDueTodayRequest = () => {
  return {
    type: GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST,
  };
};
const getJobsDueTodayRequestSuccess = data => {
  return {
    type: GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_SUCCESS,
    payload: data,
  };
};

const getJobsDueTodayRequestFailed = error => {
  return {
    type: GET_JOBS_DUE_TODAY_FOR_CONTRACTOR_REQUEST_FAILED,
    payload: error,
  };
};

export const getJobsDueTodayData = () => {
  return async dispatch => {
    dispatch(getJobsDueTodayRequest());
    try {
      const response = await apiClient.get('jobs/due-today');

      // console.log('getJobsDueTodayData response', response.data);

      dispatch(getJobsDueTodayRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getJobsDueTodayRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// all reviews
const getReviwesRequest = () => {
  return {
    type: GET_REVIEWS_REQUEST,
  };
};
const getReviwesRequestSuccess = data => {
  return {
    type: GET_REVIEWS_REQUEST_SUCCESS,
    payload: data,
  };
};

const getReviwesRequestFailed = error => {
  return {
    type: GET_REVIEWS_REQUEST_FAILED,
    payload: error,
  };
};

export const getAllReviwesData = userId => {
  return async dispatch => {
    dispatch(getReviwesRequest());
    try {
      const response = await apiClient.get(`feedback/to/${userId}`);

      // console.log('getAllReviwesData response', response.data);

      dispatch(getReviwesRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getReviwesRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// all notifications
const getNotificationsRequest = () => {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
  };
};
const getNotificationsRequestSuccess = data => {
  return {
    type: GET_NOTIFICATIONS_REQUEST_SUCCESS,
    payload: data,
  };
};

const getNotificationsRequestFailed = error => {
  return {
    type: GET_NOTIFICATIONS_REQUEST_FAILED,
    payload: error,
  };
};

export const getAllNotificationsData = () => {
  return async dispatch => {
    dispatch(getNotificationsRequest());
    try {
      const response = await apiClient.get(`notifications`);
      // console.log('getAllNotificationsData response', response.data);
      dispatch(getNotificationsRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getNotificationsRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// all preferences

const getNotificationsPreferencesRequest = () => {
  return {
    type: GET_NOTIFICATIONS_PREFERENCES_REQUEST,
  };
};
const getNotificationsPreferencesRequestSuccess = data => {
  return {
    type: GET_NOTIFICATIONS_PREFERENCES_REQUEST_SUCCESS,
    payload: data,
  };
};

const getNotificationsPreferencesRequestFailed = error => {
  return {
    type: GET_NOTIFICATIONS_PREFERENCES_REQUEST_FAILED,
    payload: error,
  };
};

export const getNotificationsPreferences = () => {
  return async dispatch => {
    dispatch(getNotificationsPreferencesRequest());
    try {
      const response = await apiClient.get(`notifications/preferences`);
      // console.log('getNotificationsPreferences response', response.data);
      dispatch(getNotificationsPreferencesRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getNotificationsPreferencesRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};

// update notification preferences

const updateNotificationsPreferencesRequest = () => {
  return {
    type: UPDATE_NOTIFICATIONS_PREFERENCES_REQUEST,
  };
};
const updateNotificationsPreferencesRequestSuccess = data => {
  return {
    type: UPDATE_NOTIFICATIONS_PREFERENCES_REQUEST_SUCCESS,
    payload: data,
  };
};

const updateNotificationsPreferencesRequestFailed = error => {
  return {
    type: UPDATE_NOTIFICATIONS_PREFERENCES_REQUEST_FAILED,
    payload: error,
  };
};

export const updateNotificationsPreferences = body => {
  return async dispatch => {
    dispatch(updateNotificationsPreferencesRequest());

    try {
      const response = await apiClient.patch(`notifications/preferences`, body);
      await dispatch(getNotificationsPreferences());
      dispatch(updateNotificationsPreferencesRequestSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(updateNotificationsPreferencesRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
const calculateMuted = ({ push, email, sms }) => {
  return !push && !email && !sms;
};
export const updateNotificationItem = (item, changedKey) => async dispatch => {
  try {
    const updatedItem = {
      ...item,
      [changedKey]: !item[changedKey],
    };
    const isMuted = calculateMuted(updatedItem);

    const body = {
      type: item.type,
      push: updatedItem.push,
      email: updatedItem.email,
      sms: updatedItem.sms,
      isMuted,
    };

    await dispatch(updateNotificationsPreferences(body));

    // refresh list after update
    await dispatch(getNotificationsPreferences());
  } catch (error) {
    console.log('update error', error);
  }
};
// get all sessions
const getAllSessionsRequest = () => {
  return {
    type: GET_ALL_SESSIONS_REQUEST,
  };
};
const getAllSessionsSuccess = data => {
  return {
    type: GET_ALL_SESSIONS_REQUEST_SUCCESS,
    payload: data,
  };
};

const getAllSessionsFailed = error => {
  return {
    type: GET_ALL_SESSIONS_REQUEST_FAILED,
    payload: error,
  };
};

export const getAllSessionssData = userId => {
  return async dispatch => {
    dispatch(getAllSessionsRequest());
    try {
      const response = await apiClient.get(`user/sessions/${userId}`);

      console.log('getAllSessionssData response', response.data);

      dispatch(getAllSessionsSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getAllSessionsFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
// get direct assigned bids
const directAssignedBidsRequest = () => {
  return {
    type: GET_DIRECT_ASSIGNED_BIDS_REQUEST,
  };
};
const directAssignedBidsSuccess = data => {
  return {
    type: GET_DIRECT_ASSIGNED_BIDS_REQUEST_SUCCESS,
    payload: data,
  };
};

const directAssignedBidsFailed = error => {
  return {
    type: GET_DIRECT_ASSIGNED_BIDS_REQUEST_FAILED,
    payload: error,
  };
};

export const directAssignedBids = (userId, filter) => {
  return async dispatch => {
    dispatch(directAssignedBidsRequest());
    try {
      const response = await apiClient.get(
        `bids/contractor/${userId}/assigned`,
        {
          params: filter,
        },
      );

      // console.log('directAssignedBids response', response.data);

      dispatch(directAssignedBidsSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(directAssignedBidsFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};

// get single job details

const getSingleJobDetailsRequest = () => {
  return {
    type: GET_SINGLE_JOB_DETAILS_REQUEST,
  };
};
const getSingleJobDetailsRequestSuccess = data => {
  return {
    type: GET_SINGLE_JOB_DETAILS_REQUEST_SUCCESS,
    payload: data,
  };
};

const getSingleJobDetailsRequestFailed = error => {
  return {
    type: GET_SINGLE_JOB_DETAILS_REQUEST_FAILED,
    payload: error,
  };
};

export const getSingleJobDetails = jobId => {
  return async dispatch => {
    dispatch(getSingleJobDetailsRequest());
    try {
      const response = await apiClient.get(`jobs/${jobId}`);

      // console.log('getSingleJobDetails response', response.data);

      dispatch(getSingleJobDetailsRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getSingleJobDetailsRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
