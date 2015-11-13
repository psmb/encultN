import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';
import {FacebookButton, VKontakteButton, TwitterButton} from 'react-social';
import puttext from 'i18n/index';

export default class VotedAnswer extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
  }

  render() {
    const __ = puttext();
    const url = 'http://ya.ru';
    return (
      <div className='VotedAnswerFull'>
        <div className='mdl-typography--body-1'>{__('Ваш выбор')}</div>
        <Link to={`/worldviews/${this.props.answer.getIn(['worldview', 'id'])}`}>
          <div className='mdl-typography--display-1 Help-wrap'>
            {this.props.answer.getIn(['worldview', 'title'])}
            <i className='icon-help-circled Help-icon'></i>
          </div>
        </Link>
        <div className='Social marginTop-single'>
          <div style={{display: 'inline-block'}}>{__('Поделитесь этим с друзьями')}:</div>
          <div className='Social-buttons'>
            <FacebookButton className='Social-button' url={url}><i className='icon-facebook'></i></FacebookButton>
            <TwitterButton className='Social-button' url={url}><i className='icon-twitter'></i></TwitterButton>
            <VKontakteButton className='Social-button' url={url}><i className='icon-vkontakte'></i></VKontakteButton>
          </div>
        </div>
      </div>
    );
  }
}
