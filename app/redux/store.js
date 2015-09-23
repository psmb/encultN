import {createStore, compose} from 'redux';
import {reduxReactRouter} from 'redux-router';
import {devTools, persistState} from 'redux-devtools';
import createHistory from 'history/lib/createBrowserHistory';
import {List, Map} from 'immutable';
import appReducer from './modules/reducer';
import {setState as setStateQuestions} from './modules/questions';
import {setState as setStateVoting} from './modules/voting';

const store = compose(
  reduxReactRouter({createHistory}),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)(appReducer);

export default store;

const initialStateQuestions = List.of(
  Map({
    'id': 10,
    'title': 'Самоубийство',
    'subTitle': 'Может ли человек добровольно лишить себя жизни?',
  }),
  Map({
    'id': 11,
    'title': 'Самоубийство2',
    'subTitle': 'Может ли человек добровольно лишить себя жизни?2',
  }),
);
store.dispatch(setStateQuestions(initialStateQuestions));

const initialStateVoting = Map({
  'activeAnswer': 0,
  'votedAnswer': null,
  'answers': List.of(
    Map({
      id: 123,
      quizText: 'Совершая самоубийство, человек делает нечто необратимое. Это та крайняя мера, которая всегда остается как последний аргумент. Человек вправе решить уйти из жизни, если сочтёт что его миссия и его роль закончены. Человек – это центр своей собственной вселенной, поэтому он вправе выбирать, как жить и как умереть, если у него есть возможность сделать свой выбор. Выбор смерти заслуживает уважения (если конечно речь не идёт о истеричке, хотевшей напугать маму).',
      worldviewId: 1,
      authorName: 'Вася',
      authorTitle: 'Доктор наук',
      fullVideo: 'https://vimeo.com/',
      fullText: 'Расшифровка видео ответа',
      votesCount: 123,
      liked: null,
    }),
    Map({
      id: 124,
      quizText: 'Другой какой-то ответ.',
      worldviewId: 1,
      authorName: 'Петя',
      authorTitle: 'Кандидат наук',
      fullVideo: 'https://vimeo.com/2',
      fullText: 'Расшифровка видео ответа 2',
      votesCount: 120,
      liked: null,
    }),
  ),
});
store.dispatch(setStateVoting(initialStateVoting));
