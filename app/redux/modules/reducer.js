import { combineReducers } from 'redux';
import preferences from './preferences';
import worldviews from './worldviews';
import voting from './voting';

export default combineReducers({
  preferences,
  worldviews,
  voting,
});
