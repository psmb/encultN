import React, {Component, PropTypes} from 'react';
import puttext from 'i18n/index';

export default class VotedAnswer extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
  }

  render() {
    const __ = puttext();
    return (
      <div className='VotedAnswerFull'>
        <div className='mdl-typography--body-1'>{__('Ваш выбор')}</div>
        <div className='mdl-typography--display-1'>{this.props.answer.getIn(['worldview', 'title'])}</div>
      </div>
    );
  }
}
