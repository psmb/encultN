import React from 'react';
import {Route} from 'react-router';
import {
    App,
    Voting,
    NotFound,
  } from 'containers';

export default function() {
  return (
    <Route component={App}>
      <Route path="/" component={Voting}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
