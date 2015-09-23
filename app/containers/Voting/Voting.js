import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from 'redux/modules/voting';

class Voting extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    likeAnswer: PropTypes.func.isRequired,
    dislikeAnswer: PropTypes.func.isRequired,
    voteForAnswer: PropTypes.func.isRequired,
  }

  render() {
    const state = this.props.state;
    const activeAnswer = state.get('activeAnswer');
    const votedAnswer = state.get('votedAnswer');
    const allLiked = state.get('answers').every(item => {return item.get('liked') === true; });
    const noneLiked = state.get('answers').count() === 0;

    let i = 0;
    const selectAnswer = this.props.selectAnswer;
    const answersNav = state.get('answers').map(function renderAnswer(answer) {
      i++;
      const j = i;
      return <li key={answer.get('id')}><button onClick={() => selectAnswer(j - 1)}>{i}</button></li>;
    });

    const likingControls = (
      <div className='mdl-grid'>
        <button className='mdl-cell mdl-cell--2-col mdl-button mdl-button--raised mdl-button--colored' onClick={() => this.props.likeAnswer()}>За</button>
        <button className='mdl-cell mdl-cell--2-col mdl-button mdl-button--raised mdl-button--accent' onClick={() => this.props.dislikeAnswer()}>Против</button>
      </div>
    );
    const votingControls = (
      <div>
        <button className='button mdl-button mdl-button--raised mdl-button--colored' onClick={() => this.props.voteForAnswer()}>Голосовать!</button>
      </div>
    );
    const answer = (
      <div className='mdl-grid mdl-typography--body-1-color-contrast mdl-shadow--8dp Answer'>
        {state.getIn(['answers', activeAnswer, 'text'])}
      </div>
    );
    const votingScreen = (
      <div>
        <ul>{allLiked ? answersNav : ''}</ul>
        {answer}
        {allLiked ? votingControls : likingControls}
      </div>
    );
    const resultsScreen = (
      <h1>Вы проголосовали за {activeAnswer + 1}!</h1>
    );
    return (
      <div>
        <h2 className='mdl-typography--headline-color-contrast'>{state.get('question').get('title')}</h2>
        <h3 className='mdl-typography--body-1-color-contrast'>{state.get('question').get('subTitle')}</h3>
        {votedAnswer ? resultsScreen : (noneLiked ? 'Почему вам ничего не нравится?' : votingScreen)}
      </div>
    );
  }
}

function select(state) {
  return {state: state.voting};
}

export const VotingContainer = connect(select, actionCreators)(Voting);
