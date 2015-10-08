import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { selectQuestion } from 'redux/modules/voting';
import Questions from 'components/Questions/Questions';
import Question from 'components/Question';
import Layout from 'components/Layout';
import store from 'redux/store';

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Questions} />
    <Route path='q/:id' component={Question} onEnter={(nextState) => store.dispatch(selectQuestion(nextState.params.id))} />
  </Route>
);
export default routes;
