import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import QuestionVoting from 'components/QuestionVoting';
import QuestionResults from 'components/QuestionResults';

@connect(state => ({state: state.voting, question: state.questions.find(item => item.get('id') === +state.router.params.id)}))
export default class Question extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className='QuestionHeader'>
        <h2 className='mdl-typography--headline-color-contrast'>{this.props.question.get('title')}</h2>
        <h3 className='mdl-typography--body-1-color-contrast'>{this.props.question.get('subTitle')}</h3>
        {Number.isInteger(this.props.state.get('votedAnswer')) ? <QuestionResults /> : <QuestionVoting />}
      </div>
    );
  }
}
