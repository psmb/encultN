import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from 'redux/modules/voting';

@connect(
  state => ({state: state.voting, question: state.questions.find(item => item.get('id') === +state.router.params.id)}),
  actionCreators,
)
export default class QuestionVoting extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    likeAnswer: PropTypes.func.isRequired,
    dislikeAnswer: PropTypes.func.isRequired,
    voteForAnswer: PropTypes.func.isRequired,
  }

  render() {
    const state = this.props.state;
    const allLiked = state.get('answers').every(item => {return item.get('liked') === true; });
    const noneLiked = state.get('answers').count() === 0;

    let i = 0;
    const selectAnswer = this.props.selectAnswer;
    const answersNav = state.get('answers').map(function renderAnswer(answer) {
      i++;
      const j = i;
      const currentClass = state.get('activeAnswer') === (j - 1) ? ' mdl-button--colored' : '';
      return <button key={answer.get('id')} className={'mdl-button' + currentClass} onClick={() => selectAnswer(j - 1)}>{i}</button>;
    });

    const likingControls = (
      <div className='mdl-grid'>
        <button className='mdl-cell mdl-cell--2-col mdl-button mdl-button--raised mdl-button--colored' onClick={() => this.props.likeAnswer()}>За</button>
        <button className='mdl-cell mdl-cell--2-col mdl-button mdl-button--raised mdl-button--accent' onClick={() => this.props.dislikeAnswer()}>Против</button>
      </div>
    );
    const votingControls = (
      <div className='mdl-grid'>
        <button className='mdl-cell button mdl-button mdl-button--raised mdl-button--colored' onClick={() => this.props.voteForAnswer()}>Голосовать!</button>
      </div>
    );
    const answer = (
      <div className='mdl-grid mdl-typography--body-1-color-contrast mdl-shadow--8dp Answer'>
        {state.getIn(['answers', state.get('activeAnswer'), 'quizText'])}
      </div>
    );
    const votingScreen = (
      <div>
        <div className='AnswersNav'>{allLiked ? answersNav : ''}</div>
        {answer}
        {allLiked ? votingControls : likingControls}
      </div>
    );

    return (
      <div>
        {noneLiked ? 'Почему вам ничего не нравится?' : votingScreen}
      </div>
    );
  }
}
