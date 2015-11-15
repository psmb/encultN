import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import puttext from 'i18n/index';
import * as actionCreators from 'redux/modules/voting';
import Link from 'i18n/Link';
if (process.env.BROWSER) {
  require('./Stats.scss');
}

@connect(
  state => ({
    state: state,
    worldviews: state.voting.get('worldviews'),
    questions: state.voting.get('questions'),
  }),
  actionCreators,
)
export default class Stats extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    worldviews: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    fetchAnswers: PropTypes.func.isRequired,
  }

  answersSelector(answers) {
    return answers.map(answer => {
      const worldviewObj = this.props.worldviews.find(item => item.get('id') === answer.get('worldviewId'));
      return answer.set('worldview', worldviewObj);
    }).sort((a, b) => a.get('voteCount') < b.get('voteCount'));
  }

  render() {
    const __ = puttext();
    const worldviews = this.props.worldviews ? this.props.worldviews.sort((a, b) => a.get('voteCount') < b.get('voteCount')).map(worldview => {
      return (
        <tr key={worldview.get('id')}>
          <td>
            <Link to={`/worldviews/${worldview.get('id')}`}>
              {worldview.get('title')}
            </Link>
          </td>
          <td className='color-primary'>{worldview.get('voteCount')} <i className='icon-check'></i></td>
        </tr>
      );
    }).toArray() : '';

    const questions = this.props.questions ? this.props.questions.map(question => {
      const answers = question.get('answers') ? this.answersSelector(question.get('answers')).map(answer => {
        return (
          <tr key={answer.get('id')}>
            <td><Link to={`/worldviews/${answer.getIn(['worldview', 'id'])}`}>{answer.getIn(['worldview', 'title'])}</Link></td>
            <td className='color-primary'>{answer.get('voteCount')} <i className='icon-check'></i></td>
          </tr>
        );
      }).toArray() : (<tr><td><i className='icon-spinner animate-spin' /></td></tr>);
      if (question.get('id')) {
        this.props.fetchAnswers(question.get('id'));
      }
      return (
        <div key={question.get('id')} className='StatsQuestion'>
          <div className='StatsQuestion-wrap marginBottom-double'>
            <h2 className='mdl-typography--headline-color-contrast StatsQuestion-title'>{question.get('title')}</h2>
            <h3 className='mdl-typography--body-1-color-contrast StatsQuestion-subTitle'>{question.get('subTitle')}</h3>
          </div>
          <table className='Table'>
            <tfoot>
              <tr>
                <td>{__('Всего')}</td>
                <td className='color-primary'>{question.get('voteCount')} <i className='icon-check'></i></td>
              </tr>
            </tfoot>
            <tbody>
              {answers}
            </tbody>
          </table>
        </div>
      );
    }).toArray() : '';

    return (
      <div className='FullStats marginTop-double fixed-width'>
        <div className='row'>
          <div className='medium-8 columns'>
            <h1 className='marginVertical-double mdl-typography--display-1-color-contrast'>{__('Статистика')}</h1>
            <p className='mdl-typography--body-1-color-contrast'>
              {__('Мне кажется тут должен быть абзац с текстом, кратко объясняющим метод голосвания. Мне кажется тут должен быть абзац с текстом, кратко объясняющим метод голосвания.')}
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='medium-10 medium-offset-1 columns'>
            <div className='Hint Hint--main color-primary'>
              {__('Общие результаты')}:
            </div>
            <table className='Table'>
              <tbody>
                {worldviews}
              </tbody>
            </table>
            <div className='Hint Hint--main color-primary'>
              {__('Результаты по вопросам')}:
            </div>
            {questions}
          </div>
        </div>
      </div>
    );
  }
}
