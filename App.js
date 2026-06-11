import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { waitForStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import AppColor from './src/helpers/AppColor';
import { LogBox } from 'react-native';
import AppContent from './AppContent';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  `Each child in a list should have a unique "key" prop.`,
]);
const App = () => {
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    waitForStore().then(({ store, persistor }) => {
      setStore(store);
      setPersistor(persistor);
    });
  }, []);

  // Show loading indicator while store is initialising
  if (!store || !persistor) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={AppColor.primaryBlue} size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator color={AppColor.primaryBlue} size={'large'} />
          </View>
        }
        persistor={persistor}
      >
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
