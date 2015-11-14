import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from 'redux/modules/voting';
import puttext from 'i18n/index';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    resetAnswer: PropTypes.func.isRequired,
    voteForAnswer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      voteInProgress: false,
    };
  }

  render() {
    const __ = puttext();
    const likedAnswers = this.props.question.get('answers').filter(item => item.get('liked') === true);
    const allLiked = this.props.question.get('answers').every(item => {return (item.get('liked') === true) || (item.get('liked') === false); });
    const noneLiked = this.props.question.get('answers').every(item => {return item.get('liked') === false; });
    const activeAnswer = this.props.question.get('activeAnswer');
    const activeAnswerObject = this.props.question.get('answers').find(item => item.get('id') === activeAnswer);
    const activeAnswerIndex = this.props.question.get('answers').findIndex(item => item.get('id') === activeAnswer);
    const activeAnswerIndexInLiked = likedAnswers.findIndex(item => item.get('id') === activeAnswer);
    const nextAnswer = likedAnswers.getIn([Number(activeAnswerIndexInLiked) + 1, 'id']);
    const previousAnswer = activeAnswerIndexInLiked !== 0 ? likedAnswers.getIn([Number(activeAnswerIndexInLiked) - 1, 'id']) : null;

    const likingNav = (
      <p className='LikingNav mdl-typography--body-1-color-contrast'>
        {activeAnswerIndex + 1} {__('из')} {this.props.question.get('answers').count()}
      </p>
    );
    const votingNav = this.props.question.get('answers').map(function renderAnswer(answer, i) {
      if (answer.get('liked') === true) {
        const currentClass = activeAnswer === answer.get('id') ? ' InlineButton--positive' : '';
        return <button key={answer.get('id')} className={'InlineButton VotingNav-button' + currentClass} onClick={() => this.props.selectAnswer(answer.get('id'))}>{i + 1}</button>;
      }
    }, this).toArray();

    const likingHint = (
      <div>
        <div className='Circle'>
          <div className='Circle-number'>1</div>
          <div className='Circle-step'>шаг</div>
        </div>
        <p className='mdl-typography--caption Hint color-primary'>{__('Выберите ответы, с которыми вы согласны')}:</p>
      </div>
    );
    const votingHint = (
      <div>
        <div className='Circle'>
          <div className='Circle-number'>2</div>
          <div className='Circle-step'>шаг</div>
        </div>
        <p className='mdl-typography--caption Hint color-primary'>{__('Проголосуйте за наиболее близкий вам ответ')}:</p>
      </div>
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
        <div className='VotingNav'>
          <button className={'InlineButton VotingNav-button'} onClick={() => previousAnswer ? this.props.selectAnswer(previousAnswer) : false}><i className='icon-left-open'></i></button>
          {votingNav}
          <button className={'InlineButton VotingNav-button'} onClick={() => nextAnswer ? this.props.selectAnswer(nextAnswer) : false}><i className='icon-right-open'></i></button>
        </div>
      </div>
    );

    const likingControls = (
      <div className='row'>
        <div className='medium-8 medium-offset-2 large-6 large-offset-3 columns'>
          <button style={{width: 'calc(50% - 8px)', marginTop: '24px', marginRight: '8px'}} className='Button Button--positive' onClick={() => this.props.likeAnswer()}>{__('Отобрать')} <i className='icon-thumbs-up'></i></button>
          <button style={{width: 'calc(50% - 8px)', marginTop: '24px', marginLeft: '8px'}} className='Button' onClick={() => this.props.dislikeAnswer()}>{__('Отсеять')} <i className='icon-thumbs-down'></i></button>
        </div>
      </div>
    );
    const votingControls = (
      <div className='row'>
        <div className='medium-8 medium-offset-2 large-6 large-offset-3 columns'>
          <button style={{width: '100%', marginTop: '24px'}} className='Button Button--positive' onClick={() => {this.props.voteForAnswer(activeAnswer); this.setState({voteInProgress: true});}}>{__('Окончательный выбор!')} <i className={this.state.voteInProgress ? 'icon-spinner animate-spin' : 'icon-check'}></i></button>
        </div>
      </div>
    );
    const votingScreen = (
      <div>
        <div className='AnswersNav'>{allLiked ? votingHead : likingHead}</div>
        <div className='slide-wrap'>
          <ReactCSSTransitionGroup transitionName='slide' transitionEnterTimeout={400} transitionLeaveTimeout={400}>
            <div key={activeAnswerObject.get('id')} className='slide mdl-typography--body-1-color-contrast mdl-shadow--8dp Answer' dangerouslySetInnerHTML={{__html: activeAnswerObject.get('quizText')}} />
          </ReactCSSTransitionGroup>
        </div>
        {allLiked ? votingControls : likingControls}
      </div>
    );

    const noneLikedText = (
      <div>
        <p className='mdl-typography--caption Hint color-primary'>{__('Почему вам ничего не понравилось? =(')}</p>
        <button style={{marginTop: '24px', padding: '8px 16px'}} className='Button Button--positive' onClick={() => this.props.resetAnswer()}>{__('Начать с начала?')}</button>
      </div>
    );

    return (
      <div className='fixed-width row'>
        <div className='medium-10 medium-offset-1 columns'>
          {noneLiked ? noneLikedText : votingScreen}
        </div>
      </div>
    );
  }
}
