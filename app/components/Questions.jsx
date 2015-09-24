import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

@connect(state => ({state: state.questions}))
export default class Questions extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
  }

  render() {
    const questions = this.props.state.map(function renderQuestion(question) {
      return (
        <Link key={question.get('id')} className='mdl-cell mdl-shadow--2dp QuestionSmall' to={`/q/${question.get('id')}`}>
          <h2 className='mdl-typography--headline-color-contrast'>{question.get('title')}</h2>
          <h3 className='mdl-typography--body-1-color-contrast'>{question.get('subTitle')}</h3>
        </Link>
      );
    });

    return (
      <div className='mdl-grid'>
        {questions}
      </div>
    );
  }
}
