import puttext from 'puttext';
import en from './en.po.json';

const ru = {};
const messages = {en, ru};

let currentLang;

export function setLang(lang) {
  currentLang = lang;
}
export function getLang() {
  return currentLang;
}


export default function() {
  return puttext(messages[currentLang]);
}
