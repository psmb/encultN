import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Intro from './Intro';
import QuestionSmall from './QuestionSmall';
import Stats from './Stats';
import puttext from 'i18n/index';
if (process.env.BROWSER) {
  require('./Questions.scss');
}

@connect(state => ({
  questions: state.voting.get('questions'),
  worldviews: state.voting.get('worldviews'),
  preferences: state.preferences,
}))
export default class Questions extends Component {
  static propTypes = {
    questions: PropTypes.object,
    worldviews: PropTypes.object,
    preferences: PropTypes.object,
  }

  render() {
    const __ = puttext();
    const questions = this.props.questions ? this.props.questions.map((question) => {
      return (
        <QuestionSmall key={question.get('id')} question={question} />
      );
    }).toArray() : null;

    return (
      <div className='fixed-width'>
        <Intro isDismissed={this.props.preferences.get('introDismissed')} />
        <Stats worldviews={this.props.worldviews} />
        <div className='Questions row'>
          <div className='medium-10 medium-offset-1 columns'>
            <div className='Hint color-primary textAlign-center'>
              {__('Выберите важный для вас вопрос:')}
            </div>
            {typeof(this.props.questions) === 'undefined' ? __('Минуточку...') : questions}
          </div>
        </div>
      </div>
    );
  }
}
