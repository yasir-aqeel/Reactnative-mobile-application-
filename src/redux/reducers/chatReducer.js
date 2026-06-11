// redux/reducers/chatReducer.js
import { USER_LOGOUT } from '../types/auth_action_types';
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
// ------------------------------------
// INITIAL STATE
// ------------------------------------
const INITIAL_STATE = {
  chats: [],
  messages: {},
  selectedChatId: null,
  typingUsers: {},
  loadingChats: false,
  loadingMessages: false,
  selectedJobChat: null,
  selectedChatPerson: null,
};

// ------------------------------------
// REDUCER
// ------------------------------------
export default function chatReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // get all chats
    case GET_ALL_CHAT_REQUEST:
      return {
        ...state,
        loadingChats: true,
        error: null,
      };
    case GET_ALL_CHAT_REQUEST_SUCCESS:
      return {
        ...state,
        loadingChats: false,
        chats: action.payload,
      };

    case GET_ALL_CHAT_REQUEST_FAILED:
      return {
        ...state,
        loadingChats: false,
        error: action.payload,
      };

    case ADD_CHAT: {
      const alreadyExists = state.chats.some(
        c => c.jobId === action.payload.jobId,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    }

    case UPDATE_CHAT:
      return {
        ...state,
        chats: state.chats.map(chat => {
          const { jobId, clientId, data } = action.payload;

          // update by jobId
          if (jobId && chat.jobId === jobId) {
            return {
              ...chat,
              ...data,
            };
          }

          // update by clientId
          if (clientId && chat.clientId === clientId) {
            return {
              ...chat,
              ...data,
            };
          }

          return chat;
        }),
      };

    case SET_SELECTED_CHAT:
      return {
        ...state,
        selectedChatId: action.payload,
      };

    case SET_SELECTED_JOB_CHAT:
      return {
        ...state,
        selectedJobChat: action.payload,
      };
    case SET_SELECTED_CHAT_PERSON:
      return {
        ...state,
        selectedChatPerson: action.payload,
      };

    // --------------------------------
    // MESSAGES
    // --------------------------------
    case SET_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.jobId]: action.payload.messages,
        },
      };

    case ADD_MESSAGE: {
      const existingMessages = state.messages[action.payload.jobId] || [];

      // prevent duplicates
      const alreadyExists = existingMessages.some(
        m =>
          m?.id &&
          action.payload.message?.id &&
          m.id === action.payload.message.id,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.jobId]: [...existingMessages, action.payload.message],
        },
      };
    }

    // --------------------------------
    // TYPING
    // --------------------------------
    case SET_TYPING_USER:
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.jobId]: action.payload.user,
        },
      };

    // --------------------------------
    // LOADING
    // --------------------------------
    case SET_LOADING_CHATS:
      return {
        ...state,
        loadingChats: action.payload,
      };

    case SET_LOADING_MESSAGES:
      return {
        ...state,
        loadingMessages: action.payload,
      };
    // DELETE ENTIRE CHAT
    case DELETE_CHAT: {
      const updatedMessages = { ...state.messages };
      delete updatedMessages[action.payload];

      return {
        ...state,
        chats: state.chats.filter(chat => chat.jobId !== action.payload),
        messages: updatedMessages,
        selectedChatId:
          state.selectedChatId === action.payload ? null : state.selectedChatId,
      };
    }

    // DELETE SINGLE MESSAGE
    case DELETE_MESSAGE: {
      const { jobId, messageId } = action.payload;

      const existingMessages = state.messages[jobId] || [];

      const filteredMessages = existingMessages.filter(
        msg => msg.id !== messageId,
      );

      return {
        ...state,
        messages: {
          ...state.messages,
          [jobId]: filteredMessages,
        },
      };
    }
    // user logout states empty
    case USER_LOGOUT:
      return {
        ...state,
        chats: [],
        messages: {},
        selectedChatId: null,
        typingUsers: {},
        loadingChats: false,
        loadingMessages: false,
        selectedJobChat: null,
        selectedChatPerson: null,
      };
    default:
      return state;
  }
}
