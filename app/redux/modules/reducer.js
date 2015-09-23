import { combineReducers } from 'redux';
import questions from './questions';
import voting from './voting';
import {routerStateReducer} from 'redux-router';

export default combineReducers({
  questions,
  voting,
  router: routerStateReducer,
});
