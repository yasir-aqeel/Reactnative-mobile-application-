import apiClient from '../../helpers/apiClient';
import {
  ADD_CHAT,
  UPDATE_CHAT,
  SET_SELECTED_CHAT,
  SET_MESSAGES,
  ADD_MESSAGE,
  SET_TYPING_USER,
  SET_LOADING_CHATS,
  SET_LOADING_MESSAGES,
  SET_SELECTED_JOB_CHAT,
  SET_SELECTED_CHAT_PERSON,
  DELETE_CHAT,
  DELETE_MESSAGE,
  // get all chats
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_REQUEST_SUCCESS,
  GET_ALL_CHAT_REQUEST_FAILED,
} from '../types/chat_action_types';
// -------- CHAT --------

export const addChat = chat => ({
  type: ADD_CHAT,
  payload: chat,
});

export const updateChat = payload => ({
  type: UPDATE_CHAT,
  payload,
});

export const setSelectedChat = jobId => ({
  type: SET_SELECTED_CHAT,
  payload: jobId,
});

export const setSelectedJobChat = jobChat => ({
  type: SET_SELECTED_JOB_CHAT,
  payload: jobChat,
});
export const setSelectedChatPerson = chatPerson => ({
  type: SET_SELECTED_CHAT_PERSON,
  payload: chatPerson,
});

// -------- MESSAGES --------
export const setMessages = (jobId, messages) => ({
  type: SET_MESSAGES,
  payload: {
    jobId,
    messages,
  },
});

export const addMessage = (jobId, message) => ({
  type: ADD_MESSAGE,
  payload: {
    jobId,
    message,
  },
});

// -------- TYPING --------
export const setTypingUser = (jobId, user) => ({
  type: SET_TYPING_USER,
  payload: {
    jobId,
    user,
  },
});

// -------- LOADING --------
export const setLoadingChats = loading => ({
  type: SET_LOADING_CHATS,
  payload: loading,
});

export const setLoadingMessages = loading => ({
  type: SET_LOADING_MESSAGES,
  payload: loading,
});
export const deleteChat = jobId => ({
  type: DELETE_CHAT,
  payload: jobId,
});

export const deleteMessage = (jobId, messageId) => ({
  type: DELETE_MESSAGE,
  payload: {
    jobId,
    messageId,
  },
});
// get all chats
const allChatRequest = () => {
  return {
    type: GET_ALL_CHAT_REQUEST,
  };
};
const allChatRequestSuccess = data => {
  return {
    type: GET_ALL_CHAT_REQUEST_SUCCESS,
    payload: data,
  };
};

const allChatRequestFailed = error => {
  return {
    type: GET_ALL_CHAT_REQUEST_FAILED,
    payload: error,
  };
};

export const getAllChats = () => {
  return async dispatch => {
    dispatch(allChatRequest());
    try {
      const response = await apiClient.get('chat/list');

      // console.log('allChats response', response.data);

      dispatch(allChatRequestSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(allChatRequestFailed(error.message));

      if (error.response) {
        throw error.response.data;
      } else {
        return error.message;
      }
    }
  };
};
export const deleteChatThread = jobId => {
  return async dispatch => {
    dispatch(setLoadingChats(true));

    try {
      const deleteChatResponse = await apiClient.delete(`chat/thread/${jobId}`);
      console.log('deleteChatResponse', deleteChatResponse.data);
      // update redux state locally
      dispatch({
        type: DELETE_CHAT,
        payload: jobId,
      });

      return deleteChatResponse.data;
    } catch (error) {
      dispatch(setLoadingChats(false));
      throw error.response?.data || error.message;
    } finally {
      dispatch(setLoadingChats(false));
    }
  };
};
