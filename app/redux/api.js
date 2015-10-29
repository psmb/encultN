import fetch from 'isomorphic-fetch';
import {fromJS} from 'immutable';
import {getLang} from 'i18n/index';
import {ownAddress} from '../shared-settings'; // relative path for the sake of tests

export function voteForAnswerPromise(id) {
  return fetch(ownAddress + '/api/vote-for-answer?answerIdentifier=' + id, { method: 'put', credentials: 'include' }).then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchQuestionsPromise() {
  return fetch(ownAddress + '/api/' + getLang() + '/' + 'voprosy.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchAnswersPromise(path) {
  return fetch(ownAddress + '/api/' + getLang() + '/' + 'voprosy/' + path + '.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchWorldviewsPromise() {
  return fetch(ownAddress + '/api/' + getLang() + '/' + 'mirovozzreniya.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
