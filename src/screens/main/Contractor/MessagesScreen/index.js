import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats, setChats } from '../../../../redux/actions/chatActions';
import Design from './Design';
import MessagesListCard from '../../../../components/Contractor/MessagesListCard/MessagesListCard';
const MessagesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loadingChats = useSelector(state => state.chat.loadingChats);
  const chats = useSelector(state => state?.chat?.chats || []);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  // console.log('chats', chats);
  useEffect(() => {
    loadChats();
  }, []);
  const loadChats = useCallback(async () => {
    try {
      const res = await dispatch(getAllChats());
    } catch (error) {
      console.log('Load chats error:', error);
    }
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await loadChats();
    } finally {
      setRefreshing(false);
    }
  }, [loadChats]);

  const filteredChats = useMemo(() => {
    return chats
      .filter(chat => {
        if (!searchText.trim()) return true;
        const text = searchText.toLowerCase();
        return (
          chat?.clientName?.toLowerCase()?.includes(text) ||
          chat?.title?.toLowerCase()?.includes(text) ||
          chat?.lastMessage?.toLowerCase()?.includes(text)
        );
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [chats, searchText]);

  const renderChatListCard = useCallback(
    ({ item }) => <MessagesListCard item={item} navigation={navigation} />,
    [navigation],
  );

  return (
    <Design
      navigation={navigation}
      loadingChats={loadingChats}
      refreshing={refreshing}
      allChats={filteredChats}
      renderChatListCard={renderChatListCard}
      searchText={searchText}
      setSearchText={setSearchText}
      onRefresh={onRefresh}
    />
  );
};

export default MessagesScreen;
