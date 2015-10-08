import {Map, fromJS} from 'immutable';
import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { ownAddress } from '../../shared-settings'; // relative path for the sake of tests


const SELECT_QUESTION = 'voting/SELECT_QUESTION';
const SELECT_ANSWER = 'voting/SELECT_ANSWER';
const LIKE_ANSWER = 'voting/LIKE_ANSWER';
const DISLIKE_ANSWER = 'voting/DISLIKE_ANSWER';
const INIT_VOTES = 'voting/INIT_VOTES';
const VOTE_FOR_ANSWER = 'voting/VOTE_FOR_ANSWER';
const FETCH_QUESTIONS = 'voting/FETCH_QUESTIONS';
const FETCH_ANSWERS = 'voting/FETCH_ANSWERS';

const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  const activeQuestion = state.get('activeQuestion');
  const activeAnswer = state.getIn(['questions', activeQuestion, 'activeAnswer']);
  let activeAnswerIndex;
  let gotoAnswerIndex;
  let gotoAnswerId;
  if (activeAnswer) {
    activeAnswerIndex = state.getIn(['questions', activeQuestion, 'answers']).findIndex(item => item.get('id') === activeAnswer);
    gotoAnswerIndex = (state.getIn(['questions', activeQuestion, 'answers']).count() === activeAnswerIndex + 1) ? activeAnswerIndex : activeAnswerIndex + 1;
    gotoAnswerId = state.getIn(['questions', activeQuestion, 'answers', gotoAnswerIndex]).get('id');
  }

  switch (action.type) {
  case SELECT_QUESTION:
    return state.set('activeQuestion', action.payload);
  case SELECT_ANSWER:
    return state.setIn(['questions', activeQuestion, 'activeAnswer'], action.payload);
  case LIKE_ANSWER:
    return state
      .setIn(['questions', activeQuestion, 'answers', activeAnswerIndex, 'liked'], true)
      .setIn(['questions', activeQuestion, 'activeAnswer'], gotoAnswerId);
  case DISLIKE_ANSWER:
    return state
      .setIn(['questions', activeQuestion, 'answers', activeAnswerIndex, 'liked'], false)
      .setIn(['questions', activeQuestion, 'activeAnswer'], gotoAnswerId);
  case INIT_VOTES:
    return state.mergeDeepIn(['questions'], action.payload);
  case VOTE_FOR_ANSWER:
    return state.setIn(['questions', activeQuestion, 'votedAnswer'], state.getIn(['questions', activeQuestion, 'answers', activeAnswerIndex, 'id']));
  case FETCH_QUESTIONS:
    return state.set('questions', action.payload);
  case FETCH_ANSWERS:
    const firstAnswerId = action.payload.getIn([0, 'id']);
    return state
      .setIn(['questions', activeQuestion, 'answers'], action.payload)
      .setIn(['questions', activeQuestion, 'activeAnswer'], firstAnswerId);
  default:
    return state;
  }
}

function voteForAnswerPromise(id) {
  return fetch(ownAddress + '/api/vote-for-answer?answerIdentifier=' + id, { method: 'put', credentials: 'include' }).then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
function fetchQuestionsPromise() {
  return fetch(ownAddress + '/api/voprosy.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
function fetchAnswersPromise(path) {
  return fetch(ownAddress + '/api/voprosy/' + path + '.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}

export const selectQuestion = createAction(SELECT_QUESTION, id => id);
export const selectAnswer = createAction(SELECT_ANSWER, id => id);
export const likeAnswer = createAction(LIKE_ANSWER);
export const dislikeAnswer = createAction(DISLIKE_ANSWER);
export const initVotes = createAction(INIT_VOTES, votes => {
  const votesMap = {};
  for (const key in votes) {
    if (votes.hasOwnProperty(key)) {
      votesMap[key] = {'votedAnswer': votes[key]};
    }
  }
  return fromJS(votesMap);
});
export const voteForAnswer = createAction(VOTE_FOR_ANSWER, async id => {
  return await voteForAnswerPromise(id);
});
export const fetchQuestions = createAction(FETCH_QUESTIONS, async () => {
  return await fetchQuestionsPromise();
});
export const fetchAnswers = createAction(FETCH_ANSWERS, async path => {
  return await fetchAnswersPromise(path);
});
