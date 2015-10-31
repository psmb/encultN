import { combineReducers } from 'redux';
import preferences from './preferences';
import voting from './voting';
import blogs from './blogs';

export default combineReducers({
  preferences,
  voting,
  blogs,
});
