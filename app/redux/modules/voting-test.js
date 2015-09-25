import {List, Map} from 'immutable';
import {expect} from 'chai';
import voting from './voting.js';
import {selectAnswer, likeAnswer, dislikeAnswer, voteForAnswer} from './voting.js';

const initialState = Map({
  'activeAnswer': 0,
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

describe('voting reducer', () => {
  it('handles SELECT_ANSWER', () => {
    const nextState = voting(initialState, selectAnswer(1));
    expect(nextState).to.equal(
      Map({
        'activeAnswer': 1,
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
      })
    );
  });

  it('handles LIKE_ANSWER', () => {
    const nextState = voting(initialState, likeAnswer());
    expect(nextState).to.equal(
      Map({
        'activeAnswer': 1,
        'votedAnswer': null,
        'answers': List.of(
          Map({
            'id': 123,
            'test': 'Hello world',
            'liked': true,
          }),
          Map({
            'id': 124,
            'test': 'Hello world 2',
            'liked': null,
          }),
        ),
      })
    );
  });

  it('handles DISLIKE_ANSWER', () => {
    const nextState = voting(initialState, dislikeAnswer());
    expect(nextState).to.equal(
      Map({
        'activeAnswer': 1,
        'votedAnswer': null,
        'answers': List.of(
          Map({
            'id': 123,
            'test': 'Hello world',
            'liked': false,
          }),
          Map({
            'id': 124,
            'test': 'Hello world 2',
            'liked': null,
          }),
        ),
      })
    );
  });

  it('handles VOTE_FOR_ANSWER', () => {
    const nextState = voting(initialState, voteForAnswer());
    expect(nextState).to.equal(
      Map({
        'activeAnswer': 0,
        'votedAnswer': 123,
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
      })
    );
  });
});
