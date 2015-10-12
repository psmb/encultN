import React, {Component, PropTypes} from 'react';

export default class AnswerSmall extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
    selectAnswer: PropTypes.func.isRequired,
  }

  render() {
    return (
      <li key={this.props.answer.get('id')} className='AnswerSmall' onClick={() => this.props.selectAnswer(this.props.answer.get('id'))}>
        <div className='AnswerSmall-image'>
          <img src={this.props.answer.get('fullVideoThumb')} />
        </div>
        <div className='AnswerSmall-body'>
          <div className='mdl-typography--body-1-color-contrast'>{this.props.answer.getIn(['worldview', 'title'])}</div>
          <div className='mdl-typography--caption-color-contrast'>{this.props.answer.get('authorName')},</div>
          <div className='mdl-typography--caption-color-contrast'>{this.props.answer.get('authorTitle')}</div>
          <div className='mdl-typography--caption-color-contrast marginTop-half'><span className='color-accent'>{this.props.answer.get('voteCount')} <i className='icon-check'></i></span></div>
        </div>
      </li>
    );
  }
}
