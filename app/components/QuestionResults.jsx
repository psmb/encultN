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
    const activeAnswerData = this.props.answers.get(this.props.question.get('activeAnswer'));
    const activeAnswerObject = activeAnswerData.set('worldview', this.props.worldviews.find(item => item.get('id') === activeAnswerData.get('worldviewId')));

    const video = (
        <iframe width='100%' height='auto' src='https://www.youtube.com/embed/dtQ2TS1CiDY?rel=0&amp;showinfo=0' frameBorder='0' allowFullScreen>{activeAnswerObject.get('fullVideo')}</iframe>
    );
    const videoText = (
      <div className='mdl-typography--body-1-color-contrast AnswerFull-videoText'>{activeAnswerObject.get('quizText')}</div>
    );

    const activeAnswer = (
      <div className='mdl-shadow--4dp AnswerFull'>
        <div className='AnswerFull-header'>
          <div className='mdl-typography--body-2-color-contrast'>Отвечает {activeAnswerObject.get('authorName')}</div>
          <div className='mdl-typography--body-1-color-contrast'>{activeAnswerObject.get('authorTitle')}</div>
          <div className='mdl-typography--display-1-color-contrast'>{activeAnswerObject.get('worldview').get('title')}</div>
        </div>

        {this.props.preferText ? videoText : video}

        <div className='mdl-grid'>
          <button className={(this.props.preferText ? '' : 'button--selected') + ' mdl-button mdl-button--colored mdl-cell mdl-cell--2-col'} onClick={() => this.props.setPreferText(false)}>Смотреть</button>
          <button className={(this.props.preferText ? 'button--selected' : '') + ' mdl-button mdl-button--colored mdl-cell mdl-cell--2-col'} onClick={() => this.props.setPreferText(true)}>Читать</button>
        </div>

      </div>
    );

    const selectAnswerCallback = this.props.selectAnswer;
    const activeAnswerId = this.props.question.get('activeAnswer');
    let i = 0;
    const answers = this.props.answers.map(function renderAnswer(answer) {
      i++;
      const j = i;
      if (activeAnswerId !== answer.get('id')) {
        return (
          <button key={answer.get('id')} className='mdl-shadow--2dp QuestionSmall mdl-shadow--2dp mdl-cell mdl-cell--2-col' onClick={() => selectAnswerCallback(j - 1)}>
            {answer.get('worldview').get('title')}
          </button>
        );
      }
    });
    return (
      <div>
        {activeAnswer}
        <div className='mdl-grid'>
          {answers}
        </div>
      </div>
    );
  }
}
