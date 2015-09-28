import { combineReducers } from 'redux';
import preferences from './preferences';
import worldviews from './worldviews';
import voting from './voting';
import {routerStateReducer} from 'redux-router';

export default combineReducers({
  preferences,
  worldviews,
  voting,
  router: routerStateReducer,
});
