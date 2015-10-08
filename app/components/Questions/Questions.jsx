import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Intro from './Intro';
import QuestionSmall from './QuestionSmall';
import Stats from './Stats';

@connect(state => ({questions: state.voting.get('questions')}))
export default class Questions extends Component {
  static propTypes = {
    questions: PropTypes.object,
  }

  render() {
    const questions = this.props.questions.map(function renderQuestion(question) {
      return (
        <QuestionSmall question={question} />
      );
    });

    return (
      <div>
        <div className='fixed-width row'>
          <Intro isDismissed='0' />
        </div>
        <div className='fixed-width row'>
          <div className='Questions medium-10 medium-offset-1 large-8 large-offset-2 columns'>
            {typeof(this.props.questions) === 'undefined' ? 'Минуточку...' : questions}
          </div>
        </div>
      </div>
    );
  }
}
