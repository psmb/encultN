import {Map} from 'immutable';
import {createAction} from 'redux-actions';
import * as api from '../api';

const RESET = 'about/RESET';
const FETCH_ABOUT = 'about/FETCH_ABOUT';

const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case RESET:
    return initialState;
  case FETCH_ABOUT:
    return action.payload;
  default:
    return state;
  }
}

export const reset = createAction(RESET);

export const fetchAbout = createAction(FETCH_ABOUT, async (path) => {
  return await api.fetchAboutPromise(path);
});
