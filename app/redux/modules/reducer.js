import { combineReducers } from 'redux';
import preferences from './preferences';
import voting from './voting';

export default combineReducers({
  preferences,
  voting,
});
