import React, {Component, PropTypes} from 'react';

export default class AnswerSmall extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
    preferText: PropTypes.bool.isRequired,
    setPreferText: PropTypes.func.isRequired,
  }

  render() {
    const video = (
      <div className='flex-video' style={{marginBottom: '0'}}>
        <iframe className='vimeo' src={'https://player.vimeo.com/video/' + this.props.answer.get('fullVideo') + '?color=ff5252&title=0&byline=0&portrait=0'} width='100%' height='auto' frameBorder='0' webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
      </div>
    );
    const videoText = (
      <div className='mdl-typography--body-1-color-contrast AnswerFull-videoText'>{this.props.answer.get('quizText')}</div>
    );

    return (
      <div className='mdl-shadow--4dp AnswerFull'>
        {this.props.preferText ? videoText : video}
        <div className='AnswerFull-header'>
          <div className='mdl-typography--headline-color-contrast color-accent'>{this.props.answer.get('worldview').get('title')}</div>
          <div className='mdl-typography--body-1-color-contrast'>Отвечает {this.props.answer.get('authorName')}</div>
          <div className='mdl-typography--caption-color-contrast'>{this.props.answer.get('authorTitle')}</div>
        </div>

        <div className=''>
          <button style={{width: '50%'}} className={(this.props.preferText ? '' : 'button--selected') + ' mdl-button'} onClick={() => this.props.setPreferText(false)}>Смотреть</button>
          <button style={{width: '50%'}} className={(this.props.preferText ? 'button--selected' : '') + ' mdl-button'} onClick={() => this.props.setPreferText(true)}>Читать</button>
        </div>

      </div>
    );
  }
}
