import React, {Component, PropTypes} from 'react';
import puttext from 'i18n/index';
import Link from 'i18n/Link';
if (process.env.BROWSER) {
  require('./AnswerFull.scss');
}

export default class AnswerFull extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
    preferText: PropTypes.bool,
    setPreferText: PropTypes.func.isRequired,
  }

  render() {
    const __ = puttext();
    const video = (
      <div className='flex-video' style={{marginBottom: '0'}}>
        <iframe className='vimeo' src={'https://player.vimeo.com/video/' + this.props.answer.get('fullVideo') + '?color=ff5252&title=0&byline=0&portrait=0'} width='100%' height='auto' frameBorder='0' webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
      </div>
    );
    const videoText = (
      <div className='mdl-typography--body-1-color-contrast AnswerFull-videoText' dangerouslySetInnerHTML={{__html: this.props.answer.get('quizText')}} />
    );

    return (
      <div className='mdl-shadow--4dp AnswerFull'>
        {this.props.preferText ? '' : video}
        <div className='AnswerFull-header'>
          <Link to={`/worldviews/${this.props.answer.getIn(['worldview', 'id'])}`}>
            <div className='mdl-typography--headline-color-contrast color-primary'>{this.props.answer.getIn(['worldview', 'title'])}</div>
          </Link>
          <div className='mdl-typography--body-1-color-contrast'>{this.props.answer.get('authorName')}</div>
          <div className='mdl-typography--caption-color-contrast'>{this.props.answer.get('authorTitle')}</div>
          <div className='mdl-typography--caption-color-contrast marginTop-half'><span className='color-primary'>{this.props.answer.get('voteCount')} <i className='icon-check'></i></span></div>
        </div>
        <div className='AnswerFull-videoText'>
          {this.props.preferText ? videoText : ''}
        </div>
        <div className=''>
          <button style={{width: '50%'}} className={(this.props.preferText ? '' : 'button--selected') + ' mdl-button'} onClick={() => this.props.setPreferText(false)}>{__('Смотреть')}</button>
          <button style={{width: '50%'}} className={(this.props.preferText ? 'button--selected' : '') + ' mdl-button'} onClick={() => this.props.setPreferText(true)}>{__('Читать')}</button>
        </div>

      </div>
    );
  }
}
