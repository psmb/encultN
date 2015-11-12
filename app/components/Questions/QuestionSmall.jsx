import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';
import puttext from 'i18n/index';


export default class QuestionSmall extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  render() {
    const __ = puttext();
    return (
      <Link key={this.props.question.get('id')} className={this.props.question.get('votedAnswer') ? 'Media Media--voted' : 'Media'} to={`/q/${this.props.question.get('id')}`}>
        <div className='Media-wrap'>
          <h2 className='mdl-typography--headline-color-contrast Media-title'>{this.props.question.get('title')}</h2>
          <h3 className='mdl-typography--body-1-color-contrast Media-subTitle'>{this.props.question.get('subTitle')}</h3>
          <p className='mdl-typography--caption-color-contrast Media-lead'>
          {__('Всего')}: <span className='color-primary'>{this.props.question.get('voteCount')}<i className='icon-check'></i></span>
            • {this.props.question.get('worldviewWithMaxVotes')}: <span className='color-primary'>{this.props.question.get('answerWithMaxVotesCount')}<i className='icon-check'></i></span>
          </p>
        </div>
        <div className='hide-for-small-only'>
          <i className='icon-right-circle Media-icon'></i>
        </div>
      </Link>
    );
  }
}
