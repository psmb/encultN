import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from 'redux/modules/voting';

@connect(
  state => ({
    question: state.voting.get('questions').find(item => item.get('id') === state.voting.get('activeQuestion')),
  }),
  actionCreators,
)
export default class QuestionVoting extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    likeAnswer: PropTypes.func.isRequired,
    dislikeAnswer: PropTypes.func.isRequired,
    voteForAnswer: PropTypes.func.isRequired,
  }

  render() {
    const allLiked = this.props.question.get('answers').every(item => {return (item.get('liked') === true) || (item.get('liked') === false); });
    const noneLiked = this.props.question.get('answers').every(item => {return item.get('liked') === false; });
    const activeAnswer = this.props.question.get('activeAnswer');
    const activeAnswerObject = this.props.question.get('answers').find(item => item.get('id') === activeAnswer);
    const activeAnswerIndex = this.props.question.get('answers').findIndex(item => item.get('id') === activeAnswer);

    const likingNav = (
      <p className='mdl-typography--body-1-color-contrast'>
        {activeAnswerIndex + 1} из {this.props.question.get('answers').count()}
      </p>
    );
    const votingNav = this.props.question.get('answers').map(function renderAnswer(answer, i) {
      if (answer.get('liked') === true) {
        const currentClass = activeAnswer === answer.get('id') ? ' mdl-button--colored color-accent' : '';
        return <button key={answer.get('id')} className={'mdl-button' + currentClass} onClick={() => this.props.selectAnswer(answer.get('id'))}>{i + 1}</button>;
      }
    }, this);

    const likingHint = (
      <p className='mdl-typography--caption Hint color-accent'>Выберите с какими ответами вы согласны?</p>
    );
    const votingHint = (
      <p className='mdl-typography--caption Hint color-accent'>Проголосуйте за наиболее близкий вам ответ</p>
    );

    const likingHead = (
      <div>
        {likingHint}
        {likingNav}
      </div>
    );
    const votingHead = (
      <div>
        {votingHint}
        {votingNav}
      </div>
    );

    const likingControls = (
      <div className='row'>
        <button style={{width: 'calc(50% - 8px)', marginTop: '16px', marginRight: '8px'}} className='mdl-button mdl-button--raised mdl-button--accent' onClick={() => this.props.likeAnswer()}>За</button>
        <button style={{width: 'calc(50% - 8px)', marginTop: '16px', marginLeft: '8px'}} className='mdl-button mdl-button--raised' onClick={() => this.props.dislikeAnswer()}>Против</button>
      </div>
    );
    const votingControls = (
      <div className=''>
        <button style={{width: '100%', marginTop: '16px'}} className='button mdl-button mdl-button--raised mdl-button--accent' onClick={() => this.props.voteForAnswer(activeAnswer)}>Голосовать!</button>
      </div>
    );
    const answer = (
      <div className='mdl-typography--body-1-color-contrast mdl-shadow--8dp Answer'>
        {activeAnswerObject.get('quizText')}
      </div>
    );
    const votingScreen = (
      <div>
        <div className='AnswersNav'>{allLiked ? votingHead : likingHead}</div>
        {answer}
        {allLiked ? votingControls : likingControls}
      </div>
    );

    return (
      <div className='fixed-width row'>
        <div className='medium-10 medium-offset-1 large-8 large-offset-2 columns'>
          {noneLiked ? 'Почему вам ничего не нравится?' : votingScreen}
        </div>
      </div>
    );
  }
}
