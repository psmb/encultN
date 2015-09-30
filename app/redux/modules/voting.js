import {Map, List, fromJS} from 'immutable';
import {createAction} from 'redux-actions';

const SET_STATE = 'voting/SET_STATE';
const SELECT_QUESTION = 'voting/SELECT_QUESTION';
const SELECT_ANSWER = 'voting/SELECT_ANSWER';
const LIKE_ANSWER = 'voting/LIKE_ANSWER';
const DISLIKE_ANSWER = 'voting/DISLIKE_ANSWER';
const VOTE_FOR_ANSWER = 'voting/VOTE_FOR_ANSWER';
const FETCH_ANSWERS = 'voting/FETCH_ANSWERS';

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
  case FETCH_ANSWERS:
    return state.setIn(['questions', activeQuestion, 'answers'], action.payload);
  default:
    return state;
  }
}


function fetchAnswersPromise(id) {
  return fetch('http://localhost:3000/state.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}

export const setState = createAction(SET_STATE, state => state);
export const selectQuestion = createAction(SELECT_QUESTION, id => id);
export const selectAnswer = createAction(SELECT_ANSWER, id => id);
export const likeAnswer = createAction(LIKE_ANSWER);
export const dislikeAnswer = createAction(DISLIKE_ANSWER);
export const voteForAnswer = createAction(VOTE_FOR_ANSWER);

export const fetchAnswers = createAction(FETCH_ANSWERS, async id => {
  return await fetchAnswersPromise(id);
});
