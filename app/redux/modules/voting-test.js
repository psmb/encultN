import {List, Map} from 'immutable';
import {expect} from 'chai';
import voting from './voting.js';
import {selectQuestion, selectAnswer, likeAnswer, dislikeAnswer, voteForAnswer, initVotes} from './voting.js';

const initialState = Map({
  'activeQuestion': '111',
  'questions': Map({
    '111': Map({
      'id': '111',
      'activeAnswer': '123',
      'answers': List.of(
        Map({
          'id': '123',
          'test': 'Hello world',
          'liked': null,
        }),
        Map({
          'id': '124',
          'test': 'Hello world 2',
          'liked': null,
        }),
      ),
    }),
  }),
});

describe('voting reducer', () => {
  it('handles SELECT_QUESTION', () => {
    const nextState = voting(initialState, selectQuestion('111'));
    expect(nextState).to.equal(

      Map({
        'activeQuestion': '111',
        'questions': Map({
          '111': Map({
            'id': '111',
            'activeAnswer': '123',
            'answers': List.of(
              Map({
                'id': '123',
                'test': 'Hello world',
                'liked': null,
              }),
              Map({
                'id': '124',
                'test': 'Hello world 2',
                'liked': null,
              }),
            ),
          }),
        }),
      })

    );
  });

  it('handles SELECT_ANSWER', () => {
    const nextState = voting(initialState, selectAnswer('124'));
    expect(nextState).to.equal(

      Map({
        'activeQuestion': '111',
        'questions': Map({
          '111': Map({
            'id': '111',
            'activeAnswer': '124',
            'answers': List.of(
              Map({
                'id': '123',
                'test': 'Hello world',
                'liked': null,
              }),
              Map({
                'id': '124',
                'test': 'Hello world 2',
                'liked': null,
              }),
            ),
          }),
        }),
      })

    );
  });

  it('handles LIKE_ANSWER', () => {
    const nextState = voting(initialState, likeAnswer());
    expect(nextState).to.equal(

      Map({
        'activeQuestion': '111',
        'questions': Map({
          '111': Map({
            'id': '111',
            'activeAnswer': '124',
            'answers': List.of(
              Map({
                'id': '123',
                'test': 'Hello world',
                'liked': true,
              }),
              Map({
                'id': '124',
                'test': 'Hello world 2',
                'liked': null,
              }),
            ),
          }),
        }),
      })

    );
  });

  it('handles DISLIKE_ANSWER', () => {
    const nextState = voting(initialState, dislikeAnswer());
    expect(nextState).to.equal(

      Map({
        'activeQuestion': '111',
        'questions': Map({
          '111': Map({
            'id': '111',
            'activeAnswer': '124',
            'answers': List.of(
              Map({
                'id': '123',
                'test': 'Hello world',
                'liked': false,
              }),
              Map({
                'id': '124',
                'test': 'Hello world 2',
                'liked': null,
              }),
            ),
          }),
        }),
      })

    );
  });

  it('handles VOTE_FOR_ANSWER', () => {
    const nextState = voting(initialState, {'type': 'voting/VOTE_FOR_ANSWER'});
    expect(nextState).to.equal(

      Map({
        'activeQuestion': '111',
        'questions': Map({
          '111': Map({
            'id': '111',
            'activeAnswer': '123',
            'votedAnswer': '123',
            'answers': List.of(
              Map({
                'id': '123',
                'test': 'Hello world',
                'liked': null,
              }),
              Map({
                'id': '124',
                'test': 'Hello world 2',
                'liked': null,
              }),
            ),
          }),
        }),
      })

    );
  });

  it('handles INIT_VOTES', () => {
    const initialState2 = Map({
      'activeQuestion': '111',
      'questions': Map({
        '111': Map({
          'id': '111',
        }),
        '112': Map({
          'id': '112',
        }),
      }),
    });
    const votes = {
      '111': 'xxx',
      '112': 'xxy',
    };
    const nextState = voting(initialState2, initVotes(votes));
    expect(nextState).to.equal(

      Map({
        'activeQuestion': '111',
        'questions': Map({
          '111': Map({
            'id': '111',
            'votedAnswer': 'xxx',
          }),
          '112': Map({
            'id': '112',
            'votedAnswer': 'xxy',
          }),
        }),
      })

    );
  });
});
