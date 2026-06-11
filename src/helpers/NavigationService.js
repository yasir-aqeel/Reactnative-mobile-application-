import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();
const NavigationService = {
  navigate(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  },
  dispatch(action) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(action);
    }
  },
  reset(routes) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes,
        }),
      );
    }
  },
};

export default NavigationService;
