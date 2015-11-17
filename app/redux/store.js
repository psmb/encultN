import { createStore, compose, applyMiddleware } from 'redux';
import cookie from 'redux-effects-cookie';
import { devTools, persistState} from 'redux-devtools';
import promiseMiddleware from 'redux-promise';
import appReducer from './modules/reducer';
import { fromJS } from 'immutable';
import analytics from 'redux-analytics';

const initialState = {};
let persistStateUrl = '';
if (typeof(window) !== 'undefined') {
  const fromServer = window.__INITIAL_STATE__;
  initialState.voting = fromJS(fromServer.voting);
  initialState.about = fromJS(fromServer.about);
  initialState.blogs = fromJS(fromServer.blogs);
  initialState.preferences = fromJS(fromServer.preferences);
  persistStateUrl = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
}

function metrika(type, target, params) {
  if (typeof(yaCounter) !== 'undefined') {
    if (type === 'reachGoal') {
      yaCounter.reachGoal(target, params);
    }
  }
}

const analyticsMiddleware = analytics(({ type, payload }) => metrika(type, payload.target, payload.params));
let store = null;

export function initStore() {
  store = compose(
    applyMiddleware(promiseMiddleware, cookie(), analyticsMiddleware),
    devTools(),
    persistState(persistStateUrl),
  )(createStore)(appReducer, initialState);
}
initStore();

export default store;
