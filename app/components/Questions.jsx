import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

@connect(state => ({state: state.questions}))
export default class Questions extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
  }

  render() {
    const questions = this.props.state.map(function renderQuestion(question) {
      return <li key={question.get('id')}><Link to={`/q/${question.get('id')}`}>{question.get('title')}</Link></li>;
    });

    return (
      <div>
        {questions}
      </div>
    );
  }
}
