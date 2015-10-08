import React, {Component, PropTypes} from 'react';

export default class VotedAnswer extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className='VotedAnswerFull'>
        <div className='mdl-typography--body-1'>Вы выбрали</div>
        <div className='mdl-typography--display-1'>{this.props.answer.getIn(['worldview', 'title'])}</div>
      </div>
    );
  }
}
