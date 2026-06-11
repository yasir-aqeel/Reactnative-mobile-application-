import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { contractorReducer } from './contractorReducer';
// import { propertyOwnerReducer } from './propertyOwnerReducer';
import chatReducer from './chatReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  contractor: contractorReducer,
  chat: chatReducer,
  // propertyOwner: propertyOwnerReducer,
});

export default rootReducer;
