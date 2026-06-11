// store.js (method 2)
import { initializeStore } from './setupStore'; // your async initializer

let storeInstance = null;
let persistorInstance = null;
let storeReadyPromise = null;

export const getStore = () => storeInstance;
export const getPersistor = () => persistorInstance;
export const waitForStore = () => storeReadyPromise;

// Start initialization immediately
storeReadyPromise = initializeStore().then(({ store, persistor }) => {
  storeInstance = store;
  persistorInstance = persistor;
  return { store, persistor };
});
