import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({state: state.voting}))
export default class QuestionResults extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
  }

  render() {
    const state = this.props.state;

    const activeAnswerObject = state.getIn(['answers', state.get('activeAnswer')]);
    const activeAnswer = (
      <div className='mdl-grid mdl-typography--body-1-color-contrast mdl-shadow--8dp Answer'>
        {activeAnswerObject.get('authorName')}
        {activeAnswerObject.get('authorTitle')}
        {activeAnswerObject.get('fullVideo')}
        {activeAnswerObject.get('fullText')}
      </div>
    );
    const answers = state.get('answers').map(function renderAnswer(answer) {
      return (
        <li key={answer.get('id')}>
          {answer.get('authorName')}
        </li>
      );
    });
    return (
      <div>
        {activeAnswer}
        {answers}
      </div>
    );
  }
}
