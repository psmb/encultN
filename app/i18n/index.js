import puttext from 'puttext';
import en from './en.po.json';

const ru = {};
const messages = {en, ru};

let currentLang;

export function setLang(lang) {
  if (lang in messages) {
    currentLang = lang;
  } else {
    currentLang = 'ru';
  }
}
export function getLang() {
  return currentLang;
}


export default function() {
  return puttext(messages[currentLang]);
}
