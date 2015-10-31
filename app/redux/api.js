import fetch from 'isomorphic-fetch';
import {fromJS} from 'immutable';
import {getLang} from 'i18n/index';
import {ownAddress} from '../shared-settings'; // relative path for the sake of tests

export function voteForAnswerPromise(id, lang) {
  return fetch(ownAddress + `/api/vote-for-answer?language=${lang}&answerIdentifier=${id}`, { method: 'put', credentials: 'include' }).then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchQuestionsPromise() {
  return fetch(ownAddress + '/api/' + getLang() + '/questions.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchAnswersPromise(path) {
  return fetch(ownAddress + '/api/' + getLang() + '/questions/' + path + '.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchWorldviewsPromise() {
  return fetch(ownAddress + '/api/' + getLang() + '/worldviews.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchWorldviewPromise(path) {
  return fetch(ownAddress + '/api/' + getLang() + '/worldviews/' + path + '.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchBlogsPromise() {
  return fetch(ownAddress + '/api/' + getLang() + '/blogs.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
export function fetchBlogPromise(path) {
  return fetch(ownAddress + '/api/' + getLang() + '/blogs/' + path + '.json').then(response => response.json()).then(json => fromJS(json)).catch(error => console.error('MIDDLEWARE ERROR:', error));
}
