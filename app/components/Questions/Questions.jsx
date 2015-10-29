import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Intro from './Intro';
import QuestionSmall from './QuestionSmall';
import Stats from './Stats';
import {dismissIntro} from 'redux/modules/preferences';
import puttext from 'i18n/index';

@connect(state => ({
  questions: state.voting.get('questions'),
  worldviews: state.voting.get('worldviews'),
  preferences: state.preferences,
}), {dismissIntro})
export default class Questions extends Component {
  static propTypes = {
    questions: PropTypes.object,
    worldviews: PropTypes.object,
    preferences: PropTypes.object,
    dismissIntro: PropTypes.func,
  }

  render() {
    const __ = puttext();
    const questions = this.props.questions.map((question) => {
      return (
        <QuestionSmall key={question.get('id')} question={question} />
      );
    }).toArray();

    return (
      <div>
        <div className='fixed-width'>
          <Intro isDismissed={this.props.preferences.get('introDismissed')} dismissIntro={this.props.dismissIntro} />
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
