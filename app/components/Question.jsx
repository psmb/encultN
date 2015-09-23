import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({question: state.questions.find(item => item.get('id') === +state.router.params.id)}))
export default class Question extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <h2 className='mdl-typography--headline-color-contrast'>{this.props.question.get('title')}</h2>
        <h3 className='mdl-typography--body-1-color-contrast'>{this.props.question.get('subTitle')}</h3>
        {this.props.children}
      </div>
    );
  }
}
