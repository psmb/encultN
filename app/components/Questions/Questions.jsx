import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Intro from './Intro';
import QuestionSmall from './QuestionSmall';
import Stats from './Stats';
import puttext from 'i18n/index';
import './Questions.scss';

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
      <div>
        <div className='fixed-width'>
          <Intro isDismissed={this.props.preferences.get('introDismissed')} />
          <Stats worldviews={this.props.worldviews} />
        </div>
        <div className='row'>
          <div className='Questions medium-10 medium-offset-1 large-8 large-offset-2 columns fixed-width '>
            {typeof(this.props.questions) === 'undefined' ? __('Минуточку...') : questions}
          </div>
        </div>
      </div>
    );
  }
}
