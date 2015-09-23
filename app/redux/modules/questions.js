import {List} from 'immutable';

const SET_STATE = 'questions/SET_STATE';
const initialState = List();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case SET_STATE:
    return action.payload;
  default:
    return state;
  }
}

export function setState(state) {
  return {
    type: SET_STATE,
    payload: state,
  };
}
