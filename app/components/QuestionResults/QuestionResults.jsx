import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setPreferText} from 'redux/modules/preferences';
import {answersSelector} from 'redux/selectors';
import {selectAnswer} from 'redux/modules/voting';
import QuestionsList from 'components/Questions/QuestionsList';
import AnswerSmall from './AnswerSmall';
import AnswerFull from './AnswerFull';
import VotedAnswer from './VotedAnswer';
import puttext from 'i18n/index';

@connect(state => ({
  questions: state.voting.get('questions'),
  question: state.voting.get('questions').find(item => item.get('id') === state.voting.get('activeQuestion')),
  answers: answersSelector(state),
  preferText: state.preferences.get('preferText'),
}), {
  setPreferText,
  selectAnswer,
})
export default class QuestionResults extends Component {
  static propTypes = {
    questions: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    answers: PropTypes.object.isRequired,
    preferText: React.PropTypes.bool,
    setPreferText: PropTypes.func.isRequired,
    selectAnswer: PropTypes.func.isRequired,
  }

  render() {
    const __ = puttext();
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
        <VotedAnswer answer={votedAnswerObject} question={this.props.question} />
        <div className='row'>
          <div className='large-10 large-offset-1 columns'>
            <AnswerFull answer={activeAnswerObject} preferText={this.props.preferText} setPreferText={this.props.setPreferText} />
          </div>
        </div>
        <div className=''>
          <div className=''>
            <p className='mdl-typography--caption Hint color-primary textAlign-center marginVertical-triple'>{__('Посмотрите ответы представителей других мировоззрений')}:</p>
            <ul className='medium-block-grid-2 large-block-grid-3'>
              {answers}
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='large-10 large-offset-1 columns'>
            <p className='mdl-typography--caption Hint color-primary textAlign-center marginVertical-triple'>{__('Выберите еще один вопрос')}:</p>
            <QuestionsList questions={this.props.questions} activeQuestion={this.props.question} />
          </div>
        </div>
      </div>
    );
  }
}
