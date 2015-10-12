import {Map} from 'immutable';
import {createAction} from 'redux-actions';
import {cookie} from 'redux-effects-cookie';

const SET_PREFER_TEXT = 'preferences/SET_PREFER_TEXT';
const DISMISS_INTRO = 'preferences/DISMISS_INTRO';
const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case SET_PREFER_TEXT:
    return state.set('preferText', action.payload);
  case DISMISS_INTRO:
    return state.set('introDismissed', true);
  default:
    return state;
  }
}

export const setPreferText = createAction(SET_PREFER_TEXT, preferText => preferText);

export const dismissIntro = createAction(DISMISS_INTRO, () => cookie('introDismissed', 1));
