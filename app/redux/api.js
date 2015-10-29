import fetch from 'isomorphic-fetch';
import { fromJS } from 'immutable';
import { ownAddress } from '../shared-settings'; // relative path for the sake of tests

const apiUrl = ownAddress + '/api/en/';

export function voteForAnswerPromise(id) {
  return fetch(ownAddress + 'vote-for-answer?answerIdentifier=' + id, { method: 'put', credentials: 'include' }).then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchQuestionsPromise() {
  return fetch(apiUrl + 'voprosy.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchAnswersPromise(path) {
  return fetch(apiUrl + 'voprosy/' + path + '.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchWorldviewsPromise() {
  return fetch(apiUrl + 'mirovozzreniya.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
