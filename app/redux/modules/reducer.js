import { combineReducers } from 'redux';
import voting from './voting';
import {routerStateReducer} from 'redux-router';

export default combineReducers({voting, router: routerStateReducer});
