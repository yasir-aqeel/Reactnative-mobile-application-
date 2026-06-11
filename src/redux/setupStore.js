// src/redux/setupStore.js
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { MMKVStorage } from '../helpers/MMKVStorage';

export const initializeStore = async () => {
  const persistConfig = {
    key: 'root',
    storage: MMKVStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
