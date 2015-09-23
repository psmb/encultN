import {createStore, compose} from 'redux';
import {reduxReactRouter} from 'redux-router';
import {devTools, persistState} from 'redux-devtools';
import createHistory from 'history/lib/createBrowserHistory';
import {List, Map} from 'immutable';
import appReducer from './modules/reducer';
import {setState} from './modules/voting';

const store = compose(
  reduxReactRouter({createHistory}),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)(appReducer);

export default store;


const initialState = Map({
  'activeAnswer': 0,
  'votedAnswer': null,
  'question': Map({
    'title': 'Самоубийство',
    'subTitle': 'Может ли человек добровольно лишить себя жизни?',
  }),
  'answers': List.of(
    Map({
      'id': 123,
      'text': 'Совершая самоубийство, человек делает нечто необратимое. Это та крайняя мера, которая всегда остается как последний аргумент. Человек вправе решить уйти из жизни, если сочтёт что его миссия и его роль закончены. Человек – это центр своей собственной вселенной, поэтому он вправе выбирать, как жить и как умереть, если у него есть возможность сделать свой выбор. Выбор смерти заслуживает уважения (если конечно речь не идёт о истеричке, хотевшей напугать маму).',
      'liked': null,
    }),
    Map({
      'id': 124,
      'text': 'Hello world 2',
      'liked': null,
    }),
  ),
});

store.dispatch(setState(initialState));
