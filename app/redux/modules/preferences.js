import {Map} from 'immutable';
import {createAction} from 'redux-actions';

const RESET = 'preferences/RESET';
const SET_PREFER_TEXT = 'preferences/SET_PREFER_TEXT';
const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case RESET:
    return initialState;
  case SET_PREFER_TEXT:
    return state.set('preferText', action.payload);
  default:
    return state;
  }
}

export const reset = createAction(RESET);

export const setPreferText = createAction(SET_PREFER_TEXT, preferText => preferText);
