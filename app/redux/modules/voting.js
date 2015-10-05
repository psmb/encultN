import {Map, fromJS} from 'immutable';
import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';


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
  switch (action.type) {
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
  case INIT_VOTES:
    return state.mergeDeepIn(['questions'], action.payload);
  case VOTE_FOR_ANSWER:
    return state.setIn(['questions', activeQuestion, 'votedAnswer'], state.getIn(['questions', activeQuestion, 'answers', activeAnswer, 'id']));
  case FETCH_QUESTIONS:
    return state.set('questions', action.payload);
  case FETCH_ANSWERS:
    return state.setIn(['questions', activeQuestion, 'answers'], action.payload);
  default:
    return state;
  }
}


function voteForAnswerPromise(id) {
  return fetch('http://localhost:3000/api/vote-for-answer?answerIdentifier=' + id, { method: 'put', credentials: 'include' }).then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
function fetchQuestionsPromise() {
  return fetch('http://localhost:3000/api/voprosy.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
function fetchAnswersPromise(path) {
  return fetch('http://localhost:3000/api/voprosy/' + path + '.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
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
