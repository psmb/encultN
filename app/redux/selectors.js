import { createSelector } from 'reselect';

export const answersSelector = createSelector(
  [state => state],
  (state) => {
    return state.voting.getIn(['questions', state.voting.get('activeQuestion'), 'answers']) ? state.voting.getIn(['questions', state.voting.get('activeQuestion'), 'answers']).map(answer => {
      const worldviewObj = state.voting.get('worldviews').find(item => item.get('id') === answer.get('worldviewId'));
      return answer.set('worldview', worldviewObj);
    }) : null;
  }
);
