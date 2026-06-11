// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { updateChat } from '../redux/actions/chatActions';
import { onDisplayNotification } from './NotificationSender';
const SOCKET_SERVER_URL = 'https://dev.api.pro.fixrli.com';
export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children }) => {
  const token = useSelector(state => state?.auth?.data?.userData?.access_token);
  const userData = useSelector(state => state?.auth?.data?.userData);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const newSocket = io(SOCKET_SERVER_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      forceNew: false,
    });

    setSocket(newSocket);
    setIsConnected(false);

    newSocket.on('connect', () => {
      console.log('✅ Socket connected', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', reason => {
      console.log('❌ Socket disconnected', reason);
      setIsConnected(false);
    });
    newSocket.on('connect_error', err => {
      console.log('Socket connection error:', err.message);
    });
    const onReceiveMessage = newMsg => {
      if (!newMsg?.jobId) return;
      // console.log('newMsg', newMsg);

      if (newMsg?.sender?.id !== userData.user?.id) {
        dispatch(
          updateChat({
            jobId: newMsg.jobId,
            data: {
              lastMessage: newMsg.message,
              updatedAt: newMsg.createdAt || new Date().toISOString(),
            },
          }),
        );
        const notificationData = {
          title: `New message from ${newMsg?.sender?.firstName}`,
          message: newMsg?.message,
        };
        onDisplayNotification(notificationData);
      }
    };
    const onUnreadUpdated = ({ jobId, unreadCount }) => {
      dispatch(
        updateChat({
          jobId,
          data: {
            unreadCount,
          },
        }),
      );
    };
    const onUserOnline = ({ userId }) => {
      dispatch(
        updateChat({
          clientId: userId,
          data: {
            online: true,
          },
        }),
      );
    };

    const onUserOffline = ({ userId }) => {
      dispatch(
        updateChat({
          clientId: userId,
          data: {
            online: false,
          },
        }),
      );
    };

    newSocket.on('userOnline', onUserOnline);
    newSocket.on('userOffline', onUserOffline);
    newSocket.on('receiveMessage', onReceiveMessage);
    newSocket.on('unreadUpdated', onUnreadUpdated);
    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
