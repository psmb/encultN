import {Map, fromJS} from 'immutable';
import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';

const FETCH_STATE = 'worldviews/FETCH_STATE';
const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case FETCH_STATE:
    return action.payload;
  default:
    return state;
  }
}


function fetchStatePromise() {
  return fetch('http://dev.enculturation.dev/mirovozzreniya.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}

export const fetchState = createAction(FETCH_STATE, async () => {
  return await fetchStatePromise();
});
