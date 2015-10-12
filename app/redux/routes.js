import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { selectQuestion } from 'redux/modules/voting';
import Questions from 'components/Questions/Questions';
import Question from 'components/Question';
import About from 'components/About/About';
import Stats from 'components/Stats/Stats';
import Layout from 'components/Layout';
import store from 'redux/store';

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Questions} />
    <Route path='q/:id' component={Question} onEnter={(nextState) => store.dispatch(selectQuestion(nextState.params.id))} />
    <Route path='about' component={About} />
    <Route path='stats' component={Stats} />
  </Route>
);
export default routes;
