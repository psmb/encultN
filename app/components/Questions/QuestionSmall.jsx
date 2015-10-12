import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class QuestionSmall extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Link key={this.props.question.get('id')} className='mdl-cell QuestionSmall' to={`/q/${this.props.question.get('id')}`}>
        <h2 className='mdl-typography--headline-color-contrast QuestionSmall-title'>{this.props.question.get('title')}</h2>
        <h3 className='mdl-typography--body-1-color-contrast QuestionSmall-subTitle'>{this.props.question.get('subTitle')}</h3>
        <p className='mdl-typography--caption-color-contrast QuestionSmall-lead'><span className='color-accent'>{this.props.question.get('voteCount')} <i className='icon-check'></i></span> • Лидирует <span className='color-accent'>{this.props.question.get('worldviewWithMaxVotes')}: {this.props.question.get('answerWithMaxVotesCount')} <i className='icon-check'></i></span></p>
      </Link>
    );
  }
}
