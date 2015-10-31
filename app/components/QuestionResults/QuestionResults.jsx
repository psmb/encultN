import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setPreferText} from 'redux/modules/preferences';
import {answersSelector} from 'redux/selectors';
import {selectAnswer} from 'redux/modules/voting';
import AnswerSmall from './AnswerSmall';
import AnswerFull from './AnswerFull';
import VotedAnswer from './VotedAnswer';

@connect(state => ({
  question: state.voting.get('questions').find(item => item.get('id') === state.voting.get('activeQuestion')),
  answers: answersSelector(state),
  preferText: state.preferences.get('preferText'),
}), {
  setPreferText,
  selectAnswer,
})
export default class QuestionResults extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    answers: PropTypes.object.isRequired,
    preferText: React.PropTypes.bool,
    setPreferText: PropTypes.func.isRequired,
    selectAnswer: PropTypes.func.isRequired,
  }

  render() {
    const votedAnswerObject = this.props.answers.find(item => item.get('id') === this.props.question.get('votedAnswer'));
    const activeAnswerObject = this.props.answers.find(item => item.get('id') === this.props.question.get('activeAnswer'));

    const answers = this.props.answers.map(answer => {
      if (this.props.question.get('activeAnswer') !== answer.get('id')) {
        return (
          <AnswerSmall key={answer.get('id')} answer={answer} selectAnswer={this.props.selectAnswer} />
        );
      }
    }).toArray();
    return (
      <div className='fixed-width'>
        <VotedAnswer answer={votedAnswerObject} />
        <div className='row'>
          <div className='large-10 large-offset-1 columns'>
            <AnswerFull answer={activeAnswerObject} preferText={this.props.preferText} setPreferText={this.props.setPreferText} />
            <ul className='medium-block-grid-3 large-block-grid-3'>
              {answers}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
