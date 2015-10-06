import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setPreferText} from 'redux/modules/preferences';
import {answersSelector} from 'redux/selectors';
import {selectAnswer} from 'redux/modules/voting';

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
    const activeAnswerObject = this.props.answers.get(this.props.question.get('activeAnswer'));

    const video = (
        <div className='flex-video' style={{marginBottom: '0'}}>
          <iframe className='vimeo' src={'https://player.vimeo.com/video/' + activeAnswerObject.get('fullVideo') + '?color=ff5252&title=0&byline=0&portrait=0'} width='100%' height='auto' frameBorder='0' webkitallowfullscreen mozallowfullscreen allowFullscreen></iframe>
        </div>
    );
    const videoText = (
      <div className='mdl-typography--body-1-color-contrast AnswerFull-videoText'>{activeAnswerObject.get('quizText')}</div>
    );

    const votedAnswer = (
      <div className='VotedAnswerFull'>
        <div className='mdl-typography--body-1'>Вы выбрали</div>
        <div className='mdl-typography--display-1'>{votedAnswerObject.getIn(['worldview', 'title'])}</div>
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

        <div className=''>
          <button style={{width: '50%'}} className={(this.props.preferText ? '' : 'button--selected') + ' mdl-button'} onClick={() => this.props.setPreferText(false)}>Смотреть</button>
          <button style={{width: '50%'}} className={(this.props.preferText ? 'button--selected' : '') + ' mdl-button'} onClick={() => this.props.setPreferText(true)}>Читать</button>
        </div>

      </div>
    );

    const selectAnswerCallback = this.props.selectAnswer;
    const activeAnswerId = activeAnswerObject.get('id');
    let i = 0;
    const answers = this.props.answers.map(function renderAnswer(answer) {
      i++;
      const j = i;
      if (activeAnswerId !== answer.get('id')) {
        return (
          <li key={answer.get('id')} className='AnswerSmall' onClick={() => selectAnswerCallback(j - 1)}>
              <div className='AnswerSmall-body'>
                <div className='mdl-typography--body-1-color-contrast'>{answer.getIn(['worldview', 'title'])}</div>
                <div className='mdl-typography--caption-color-contrast'>Отвечает {answer.get('authorName')}, {answer.get('authorTitle')}</div>
              </div>
              <div className='AnswerSmall-image'>
                <img src={answer.get('fullVideoThumb')} />
              </div>
          </li>
        );
      }
    });
    return (
      <div>
        {votedAnswer}
        <div className='fixed-width row'>
          <div className='medium-10 medium-offset-1 large-8 large-offset-2 columns'>
            {activeAnswer}
          </div>
          </div>
        <div className='fixed-width row'>
          <div className='large-10 large-offset-1 columns'>
            <ul className='large-block-grid-2'>
              {answers}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
