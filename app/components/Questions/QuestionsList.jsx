import React, {Component, PropTypes} from 'react';
import QuestionSmall from './QuestionSmall';
import puttext from 'i18n/index';
if (process.env.BROWSER) {
  require('./Questions.scss');
}

export default class Questions extends Component {
  static propTypes = {
    questions: PropTypes.object,
    activeQuestion: PropTypes.object,
  }

  render() {
    const __ = puttext();
    const questions = this.props.questions ? this.props.questions.map((question) => {
      if (!this.props.activeQuestion || question.get('id') !== this.props.activeQuestion.get('id')) {
        return (
          <QuestionSmall key={question.get('id')} question={question} />
        );
      }
    }).toArray() : null;

    return (
      <div className='Questions'>
        {typeof(this.props.questions) === 'undefined' ? (<div className='Loader'>{__('Минуточку...')} <i className='icon-spinner animate-spin' /></div>) : questions}
      </div>
    );
  }
}
