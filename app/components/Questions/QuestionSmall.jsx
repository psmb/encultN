import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';
import puttext from 'i18n/index';
if (process.env.BROWSER) {
  require('./QuestionSmall.scss');
}

export default class QuestionSmall extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  render() {
    const __ = puttext();
    return (
      <Link key={this.props.question.get('id')} className={this.props.question.get('votedAnswer') ? 'QuestionSmall QuestionSmall--voted' : 'QuestionSmall'} to={`/q/${this.props.question.get('id')}`}>
        <div className='QuestionSmall-questionMark hide-for-small-only mdl-shadow--4dp'>?</div>
        <div className='QuestionSmall-wrap'>
          <div className='QuestionSmall-content'>
            <h2 className='mdl-typography--headline-color-contrast QuestionSmall-title'>{this.props.question.get('title')}</h2>
            <h3 className='mdl-typography--body-1-color-contrast QuestionSmall-subTitle'>{this.props.question.get('subTitle')}</h3>
          </div>
          <div className='QuestionSmall-votes'>
            <p className='mdl-typography--caption-color-contrast QuestionSmall-lead'>
            <span className='color-primary'>{this.props.question.get('voteCount')}<i className='icon-check'></i></span>
              • {__('Лидирует')} <span className='color-primary'>{this.props.question.get('worldviewWithMaxVotes')}: {this.props.question.get('answerWithMaxVotesCount')}<i className='icon-check'></i></span>
            </p>
          </div>
        </div>
      </Link>
    );
  }
}
