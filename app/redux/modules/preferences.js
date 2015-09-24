import {Map} from 'immutable';

const SET_PREFER_TEXT = 'preferences/SET_PREFER_TEXT';
const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case SET_PREFER_TEXT:
    return state.set('preferText', action.payload);
  default:
    return state;
  }
}

export function setPreferText(preferText) {
  return {
    type: SET_PREFER_TEXT,
    payload: preferText,
  };
}
