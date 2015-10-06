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
    const question = this.props.question;
    const allLiked = question.get('answers').every(item => {return (item.get('liked') === true) || (item.get('liked') === false); });
    const noneLiked = question.get('answers').every(item => {return item.get('liked') === false; });

    let i = 0;
    const selectAnswer = this.props.selectAnswer;

    const likingNav = (
      <p className='mdl-typography--body-1-color-contrast'>
        {question.get('activeAnswer') + 1} из {question.get('answers').count()}
      </p>
    );
    const votingNav = question.get('answers').map(function renderAnswer(answer) {
      i++;
      const j = i;
      if (answer.get('liked') === true) {
        const currentClass = question.get('activeAnswer') === (j - 1) ? ' mdl-button--colored color-accent' : '';
        return <button key={answer.get('id')} className={'mdl-button' + currentClass} onClick={() => selectAnswer(j - 1, )}>{i}</button>;
      }
    });

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
        <button style={{width: '100%', marginTop: '16px'}} className='button mdl-button mdl-button--raised mdl-button--accent' onClick={() => this.props.voteForAnswer(question.getIn(['answers', question.get('activeAnswer'), 'id']))}>Голосовать!</button>
      </div>
    );
    const answer = (
      <div className='mdl-typography--body-1-color-contrast mdl-shadow--8dp Answer'>
        {question.getIn(['answers', question.get('activeAnswer'), 'quizText'])}
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
