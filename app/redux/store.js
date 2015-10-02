import { createStore, compose, applyMiddleware } from 'redux';
import { devTools, persistState} from 'redux-devtools';
import promiseMiddleware from 'redux-promise';
import appReducer from './modules/reducer';
import { fromJS } from 'immutable';

const initialState = {};
let persistStateUrl = '';
if (typeof(window) !== 'undefined') {
  const fromServer = window.__INITIAL_STATE__;
  initialState.voting = fromJS(fromServer.voting);
  initialState.preferences = fromJS(fromServer.preferences);
  initialState.worldviews = fromJS(fromServer.worldviews);
  persistStateUrl = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
}
const store = compose(
  applyMiddleware(promiseMiddleware),
  devTools(),
  persistState(persistStateUrl),
)(createStore)(appReducer, initialState);

export default store;
