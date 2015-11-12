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
          <div className='mdl-typography--display-1'>{this.props.answer.getIn(['worldview', 'title'])}</div>
        </Link>
        <FacebookButton url={url}>Share</FacebookButton>
        <VKontakteButton url={url}>Share</VKontakteButton>
        <TwitterButton url={url}>Share</TwitterButton>
      </div>
    );
  }
}
