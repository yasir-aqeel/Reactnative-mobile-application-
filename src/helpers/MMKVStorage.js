// src/helpers/MMKVStorage.js
import { createMMKV } from 'react-native-mmkv';
import Config from 'react-native-config';

const ENCRYPTION_KEY = Config.REDUX_ENCRYPTION_KEY;
// console.log('ENCRYPTION_KEY', ENCRYPTION_KEY);
export const mmkv = createMMKV({
  id: 'redux-storage',
  encryptionKey: ENCRYPTION_KEY,
  encryptionType: 'AES-256',
  mode: 'single-process',
});

export const MMKVStorage = {
  setItem: (key, value) => {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = mmkv.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    mmkv.delete(key);
    return Promise.resolve();
  },
};
