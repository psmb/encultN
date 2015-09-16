import React from 'react';
import {List, Map} from 'immutable';
import {Answer} from './components';
import {Voting} from './containers';

const initialState = Map({
  'activeAnswer': null,
  'votedAnswer': null,
  'answers': List.of(
    Map({
      'id': 123,
      'test': 'Hello world',
      'liked': null,
    }),
    Map({
      'id': 124,
      'test': 'Hello world 2',
      'liked': null,
    }),
  ),
});

const answers = List.of(
  Map({
    'id': 123,
    'test': 'Hello world',
    'liked': null,
  }),
  Map({
    'id': 124,
    'test': 'Hello world 2',
    'liked': null,
  }),
);

export default class Application extends React.Component {
  render() {
    return (
      <div>
      	Hello world!
      	<Voting answers="{answers}" />
      </div>
    );
  }
}

React.render(<Application />, document.getElementById('root'));
