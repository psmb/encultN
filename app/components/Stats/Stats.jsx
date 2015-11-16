import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import puttext from 'i18n/index';
import ChartistGraph from 'react-chartist';
import * as actionCreators from 'redux/modules/voting';
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
    }).sort((a, b) => a.getIn(['worldview', 'title']) > b.getIn(['worldview', 'title']));
  }

  render() {
    const __ = puttext();
    const options = {
      distributeSeries: true,
      reverseData: true,
      horizontalBars: true,
      height: 300,
      axisY: {
        offset: 70,
        scaleMinSpace: 30,
      },
    };

    const worldviewsPlotData = this.props.worldviews ? this.props.worldviews.sort((a, b) => a.get('title') > b.get('title')).reduce(
      (prev, current) => {
        prev.labels.push(current.get('title'));
        prev.series.push(current.get('voteCount'));
        return prev;
      },
      {
        labels: [],
        series: [],
      }
    ) : {
      labels: [],
      series: [],
    };

    const questions = this.props.questions ? this.props.questions.map(question => {
      if (question.get('id') && !question.getIn(['answers', 0])) {
        this.props.fetchAnswers(question.get('id'));
      }

      const answersPlotData = question.get('answers') ? this.answersSelector(question.get('answers')).reduce(
        (prev, current) => {
          prev.labels.push(current.getIn(['worldview', 'title']));
          prev.series.push(current.get('voteCount'));
          return prev;
        },
        {
          labels: [],
          series: [],
        }
      ) : {
        labels: [],
        series: [],
      };

      return (
        <div key={question.get('id')} className='StatsQuestion'>
          <div className='StatsQuestion-wrap marginBottom-double'>
            <h2 className='mdl-typography--headline-color-contrast StatsQuestion-title'>{question.get('title')}</h2>
            <h3 className='mdl-typography--body-1-color-contrast StatsQuestion-subTitle'>{question.get('subTitle')}</h3>
          </div>
          <ChartistGraph data={answersPlotData} options={options} type='Bar' />
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
            <ChartistGraph data={worldviewsPlotData} options={options} type='Bar' />

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
