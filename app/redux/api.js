import fetch from 'isomorphic-fetch';
import {fromJS} from 'immutable';
import {getLang} from 'i18n/index';
import {ownAddress} from '../shared-settings'; // relative path for the sake of tests

function fetchFromApi(url) {
  const fullUrl = ownAddress + '/api/' + url;
  return fetch(fullUrl, { method: 'put', credentials: 'include' })
    .then(response => response.json())
    .then(json => fromJS(json))
    .catch(error => {
      console.error('MIDDLEWARE ERROR:', fullUrl, error);
      return null;
    });
}

export function voteForAnswerPromise(id) {
  return fetchFromApi(`vote-for-answer?language=${getLang()}&answerIdentifier=${id}`);
}
export function fetchQuestionsPromise() {
  return fetchFromApi(getLang() + '/questions.json');
}
export function fetchAnswersPromise(path) {
  return fetchFromApi(getLang() + '/questions/' + path + '.json');
}
export function fetchWorldviewsPromise() {
  return fetchFromApi(getLang() + '/worldviews.json');
}
export function fetchWorldviewPromise(path) {
  return fetchFromApi(getLang() + '/worldviews/' + path + '.json');
}
export function fetchBlogsPromise() {
  return fetchFromApi(getLang() + '/blogs.json');
}
export function fetchBlogPromise(path) {
  return fetchFromApi(getLang() + '/blogs/' + path + '.json');
}
