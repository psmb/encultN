import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setPreferText} from 'redux/modules/preferences';
import {answersSelector} from 'redux/selectors';
import {selectAnswer} from 'redux/modules/voting';

@connect(state => ({
  question: state.voting.get('questions').find(item => item.get('id') === state.voting.get('activeQuestion')),
  answers: answersSelector(state),
  worldviews: state.worldviews,
  preferText: state.preferences.get('preferText'),
}), {
  setPreferText,
  selectAnswer,
})
export default class QuestionResults extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    answers: PropTypes.object.isRequired,
    worldviews: PropTypes.object.isRequired,
    preferText: React.PropTypes.bool,
    setPreferText: PropTypes.func.isRequired,
    selectAnswer: PropTypes.func.isRequired,
  }

  render() {
    const votedAnswerData = this.props.answers.find(item => item.get('id') === this.props.question.get('votedAnswer'));
    const votedAnswerObject = votedAnswerData.set('worldview', this.props.worldviews.find(item => item.get('id') === votedAnswerData.get('worldviewId')));
    const activeAnswerData = this.props.answers.get(this.props.question.get('activeAnswer'));
    const activeAnswerObject = activeAnswerData.set('worldview', this.props.worldviews.find(item => item.get('id') === activeAnswerData.get('worldviewId')));

    const video = (
        <iframe src='https://player.vimeo.com/video/141311911?color=ff5252&title=0&byline=0&portrait=0' width='100%' height='auto' frameBorder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    );
    const videoText = (
      <div className='mdl-typography--body-1-color-contrast AnswerFull-videoText'>{activeAnswerObject.get('quizText')}</div>
    );

    const votedAnswer = (
      <div className='VotedAnswerFull'>
        <div className='mdl-typography--body-1'>Вы выбрали</div>
        <div className='mdl-typography--display-1'>{votedAnswerObject.get('worldview').get('title')}</div>
      </div>
    );

    const activeAnswer = (
      <div className='mdl-shadow--4dp AnswerFull'>
        {this.props.preferText ? videoText : video}
        <div className='AnswerFull-header'>
          <div className='mdl-typography--headline-color-contrast color-accent'>{activeAnswerObject.get('worldview').get('title')}</div>
          <div className='mdl-typography--body-1-color-contrast'>Отвечает {activeAnswerObject.get('authorName')}</div>
          <div className='mdl-typography--caption-color-contrast'>{activeAnswerObject.get('authorTitle')}</div>
        </div>

        <div className='mdl-grid'>
          <button className={(this.props.preferText ? '' : 'button--selected') + ' mdl-button mdl-cell mdl-cell--2-col'} onClick={() => this.props.setPreferText(false)}>Смотреть</button>
          <button className={(this.props.preferText ? 'button--selected' : '') + ' mdl-button mdl-cell mdl-cell--2-col'} onClick={() => this.props.setPreferText(true)}>Читать</button>
        </div>

      </div>
    );

    const selectAnswerCallback = this.props.selectAnswer;
    const activeAnswerId = activeAnswerData.get('id');
    let i = 0;
    const answers = this.props.answers.map(function renderAnswer(answer) {
      i++;
      const j = i;
      if (activeAnswerId !== answer.get('id')) {
        return (
          <div key={answer.get('id')} className='AnswerSmall' onClick={() => selectAnswerCallback(j - 1)}>
            <div className='mdl-grid'>
            <div className='mdl-cell mdl-cell--2-col'>
              <div className='mdl-typography--body-1-color-contrast'>{answer.get('worldview').get('title')}</div>
              <div className='mdl-typography--caption-color-contrast'>Отвечает {answer.get('authorName')}, {answer.get('authorTitle')}</div>
            </div>
            <div className='mdl-cell mdl-cell--2-col'>
              <img src='https://i.vimeocdn.com/video/538273426_240.jpg' />
            </div>
            </div>
          </div>
        );
      }
    });
    return (
      <div>
        {votedAnswer}
        {activeAnswer}
        {answers}
      </div>
    );
  }
}
