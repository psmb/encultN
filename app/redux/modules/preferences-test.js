import {Map} from 'immutable';
import {expect} from 'chai';
import preferences, {setPreferText} from './preferences.js';

describe('preferences reducer', () => {
  it('handles SET_PREFER_TEXT to true', () => {
    const initialState = Map();
    const nextState = preferences(initialState, setPreferText(true));
    expect(nextState).to.equal(
      Map({
        'preferText': true,
      })
    );
  });
});
