import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Intro from './Intro';
import QuestionsList from './QuestionsList';
import Stats from './Stats';
import puttext from 'i18n/index';
if (process.env.BROWSER) {
  require('./Questions.scss');
}

@connect(state => ({
  questions: state.voting.get('questions'),
  worldviews: state.voting.get('worldviews'),
  preferences: state.preferences,
}))
export default class Questions extends Component {
  static propTypes = {
    questions: PropTypes.object,
    worldviews: PropTypes.object,
    preferences: PropTypes.object,
  }

  render() {
    const __ = puttext();

    return (
      <div className='fixed-width'>
        <Intro isDismissed={this.props.preferences.get('introDismissed')} />
        <Stats worldviews={this.props.worldviews} />
        <div className='row'>
          <div className='medium-10 medium-offset-1 columns'>
            <div className='Hint Hint--main color-primary textAlign-center'>
              {__('Выберите важный для вас вопрос:')}
            </div>
            <QuestionsList questions={this.props.questions}/>
          </div>
        </div>
        <div className='paddingTop-triple marginTop-triple'>
          <p className='mdl-typography--caption color-primary Hint textAlign-center'>
            {__('Здесь вы можете сделать пожертвование на этот и другие пообные проекты, способствующие изучению и развитию межкультурных отношений.')}
          </p>
        </div>
      </div>
    );
  }
}
