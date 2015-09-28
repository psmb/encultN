import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import QuestionVoting from 'components/QuestionVoting';
import QuestionResults from 'components/QuestionResults';
import * as actionCreators from 'redux/modules/voting';

@connect(state => ({
  question: state.voting.get('questions').find(item => item.get('id') === +state.router.params.id),
}), actionCreators)
export default class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    selectQuestion: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.selectQuestion(this.props.question.get('id'));
  }

  render() {
    return (
      <div className='QuestionHeader'>
        <h2 className='mdl-typography--headline-color-contrast'>{this.props.question.get('title')}</h2>
        <h3 className='mdl-typography--body-1-color-contrast'>{this.props.question.get('subTitle')}</h3>
        {Number.isInteger(this.props.question.get('votedAnswer')) ? <QuestionResults /> : <QuestionVoting />}
      </div>
    );
  }
}
