import { combineReducers } from 'redux';
import modularReducer from './modularReducer';

const rootReducer = combineReducers({
  modular: modularReducer,
});

export default rootReducer;
