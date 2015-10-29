import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import { selectQuestion } from 'redux/modules/voting';
import Questions from 'components/Questions/Questions';
import Question from 'components/Question';
import About from 'components/About/About';
import Stats from 'components/Stats/Stats';
import Root from 'components/Root';
import store from 'redux/store';
import {setLang} from 'i18n/index';

const routes = (
  <Route path='/:lang' component={Root} onEnter={(nextState) => setLang(nextState.params.lang)}>
    <IndexRoute component={Questions} />
    <Route path='q/:id' component={Question} onEnter={(nextState) => store.dispatch(selectQuestion(nextState.params.id))} />
    <Route path='about' component={About} />
    <Route path='stats' component={Stats} />
    <Redirect from='/' to='/ru' />
  </Route>
);
export default routes;
