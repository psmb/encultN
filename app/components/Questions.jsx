import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Intro from 'components/Intro';
import Stats from 'components/Stats';
import {fetchQuestions} from 'redux/modules/voting';

@connect(
  state => ({questions: state.voting.get('questions')}),
  {fetchQuestions}
)
export default class Questions extends Component {
  static propTypes = {
    questions: PropTypes.object,
    fetchQuestions: PropTypes.func.isRequired,
  }

  render() {
    const questions = this.props.questions.map(function renderQuestion(question) {
      return (
        <Link key={question.get('id')} className='mdl-cell QuestionSmall' to={`/q/${question.get('id')}`}>
          <h2 className='mdl-typography--headline-color-contrast QuestionSmall-title'>{question.get('title')}</h2>
          <h3 className='mdl-typography--body-1-color-contrast QuestionSmall-subTitle'>{question.get('subTitle')}</h3>
          <p className='mdl-typography--caption-color-contrast QuestionSmall-lead'>Лидирует <span className='color-accent'><strong>Католичество</strong></span></p>
        </Link>
      );
    });

    return (
      <div>
        <Intro isDismissed='0' />
        <Stats />
        <div className='mdl-grid'>
          {typeof(this.props.questions) === 'undefined' ? 'Fetching...' : questions}
        </div>
      </div>
    );
  }
}
