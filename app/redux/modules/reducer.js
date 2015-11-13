import { combineReducers } from 'redux';
import preferences from './preferences';
import voting from './voting';
import blogs from './blogs';
import about from './about';

export default combineReducers({
  preferences,
  voting,
  blogs,
  about,
});
