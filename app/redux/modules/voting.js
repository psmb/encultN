import {List, Map} from 'immutable';

const SET_STATE = 'voting/SET_STATE';
const SELECT_ANSWER = 'voting/SELECT_ANSWER';
const LIKE_ANSWER = 'voting/LIKE_ANSWER';
const DISLIKE_ANSWER = 'voting/DISLIKE_ANSWER';
const VOTE_FOR_ANSWER = 'voting/VOTE_FOR_ANSWER';

const initialState = Map({
  'activeAnswer': null,
  'votedAnswer': null,
  'answers': List(),
});

let index;

export function voting(state = initialState, action = {}) {
  switch (action.type) {
    case SET_STATE:
      return Map({
        'activeAnswer': null,
        'votedAnswer': null,
        'answers': List.of(
          Map({
            'id': 1,
            'test': 'Hello world',
            'liked': true,
          }),
          Map({
            'id': 2,
            'test': 'Hello world 2',
            'liked': null,
          }),
        ),
      });
    case SELECT_ANSWER:
      return state.set('activeAnswer', action.payload);
    case LIKE_ANSWER:
      index = state.get('answers').map(item => item.get('id')).indexOf(action.payload);
      return state.setIn(['answers', index, 'liked'], true);
    case DISLIKE_ANSWER:
      index = state.get('answers').map(item => item.get('id')).indexOf(action.payload);
      const test = state.deleteIn(['answers', index]);
      return test;
    case VOTE_FOR_ANSWER:
      return state.set('votedAnswer', action.payload);
    default:
      return state;
  }
}

export function setState() {
  return {
    type: SET_STATE,
  };
}

export function selectAnswer(id) {
  return {
    type: SELECT_ANSWER,
    payload: id,
  };
}

export function likeAnswer(id) {
  return {
    type: LIKE_ANSWER,
    payload: id,
  };
}

export function dislikeAnswer(id) {
  return {
    type: DISLIKE_ANSWER,
    payload: id,
  };
}

export function voteForAnswer(id) {
  return {
    type: VOTE_FOR_ANSWER,
    payload: id,
  };
}
