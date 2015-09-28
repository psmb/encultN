import {Map} from 'immutable';

const SET_STATE = 'voting/SET_STATE';
const SELECT_QUESTION = 'voting/SELECT_QUESTION';
const SELECT_ANSWER = 'voting/SELECT_ANSWER';
const LIKE_ANSWER = 'voting/LIKE_ANSWER';
const DISLIKE_ANSWER = 'voting/DISLIKE_ANSWER';
const VOTE_FOR_ANSWER = 'voting/VOTE_FOR_ANSWER';

const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  const activeQuestion = state.get('activeQuestion');
  const activeAnswer = state.getIn(['questions', activeQuestion, 'activeAnswer']);
  switch (action.type) {
  case SET_STATE:
    return action.payload;
  case SELECT_QUESTION:
    return state.set('activeQuestion', action.payload);
  case SELECT_ANSWER:
    return state.setIn(['questions', activeQuestion, 'activeAnswer'], action.payload);
  case LIKE_ANSWER:
    const gotoAnswer = (state.getIn(['questions', activeQuestion, 'answers']).count() === activeAnswer + 1) ? 0 : activeAnswer + 1;
    return state
      .setIn(['questions', activeQuestion, 'answers', activeAnswer, 'liked'], true)
      .setIn(['questions', activeQuestion, 'activeAnswer'], gotoAnswer);
  case DISLIKE_ANSWER:
    const gotoAnswer1 = (state.getIn(['questions', activeQuestion, 'answers']).count() === activeAnswer + 1) ? 0 : activeAnswer + 1;
    return state
      .setIn(['questions', activeQuestion, 'answers', activeAnswer, 'liked'], false)
      .setIn(['questions', activeQuestion, 'activeAnswer'], gotoAnswer1);
  case VOTE_FOR_ANSWER:
    return state.setIn(['questions', activeQuestion, 'votedAnswer'], state.getIn(['questions', activeQuestion, 'answers', activeAnswer, 'id']));
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

export function selectQuestion(id) {
  return {
    type: SELECT_QUESTION,
    payload: id,
  };
}

export function selectAnswer(id) {
  return {
    type: SELECT_ANSWER,
    payload: id,
  };
}

export function likeAnswer() {
  return {
    type: LIKE_ANSWER,
  };
}

export function dislikeAnswer() {
  return {
    type: DISLIKE_ANSWER,
  };
}

export function voteForAnswer() {
  return {
    type: VOTE_FOR_ANSWER,
  };
}
