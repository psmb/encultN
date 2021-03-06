import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';
import puttext from 'i18n/index';

export default class Stats extends Component {
  static propTypes = {
    worldviews: PropTypes.object.isRequired,
  }

  render() {
    const __ = puttext();
    const worldviews = this.props.worldviews ? this.props.worldviews.sort((a, b) => a.get('voteCount') < b.get('voteCount')).slice(0, 3).map(worldview => {
      return (
        <p key={worldview.get('id')} className='mdl-typography--subhead'>{worldview.get('title')}: <span className='mdl-typography--subhead'>{worldview.get('voteCount')} <i className='icon-check'></i></span></p>
      );
    }).toArray() : '';

    const winner = this.props.worldviews ? this.props.worldviews.sort((a, b) => a.get('voteCount') < b.get('voteCount')).slice(0, 1).map(worldview => {
      return (
        <p key={worldview.get('id')} className='mdl-typography--display-1 textAlign-center'>
          <Link to={`/worldviews/${worldview.get('id')}`}>
            {worldview.get('title')}:
          </Link>
          &nbsp;{worldview.get('voteCount')} <i className='icon-check'></i>
        </p>
      );
    }).toArray() : '';
    const others = this.props.worldviews ? this.props.worldviews.sort((a, b) => a.get('voteCount') < b.get('voteCount')).slice(1, 4).map(worldview => {
      return (
        <p key={worldview.get('id')} className='Stats-others mdl-typography--title'>
          <Link to={`/worldviews/${worldview.get('id')}`}>
            {worldview.get('title')}:
          </Link>
          &nbsp;{worldview.get('voteCount')} <i className='icon-check'></i>
        </p>
      );
    }).toArray() : '';
    const statsSmall = (
      <div className='Stats Stats--small show-for-small-only' >
        <p className='Stats-title mdl-typography--caption'>{__('Результаты голосования')}</p>
        {worldviews}
        <Link className='Stats-link mdl-typography--caption' to={`/stats/`}>{__('Вся статистика')} <i className='icon-right-circle'></i></Link>
      </div>
    );
    const statsLarge = (
      <div className='Stats Stats--large hide-for-small' >
        <p className='Stats-title mdl-typography--caption textAlign-center'>{__('Результаты голосования')}</p>
        {winner}
        <div className='textAlign-center'>
          {others}
        </div>
        <Link className='Stats-link mdl-typography--caption' to={`/stats/`}>{__('Вся статистика')} <i className='icon-right-circle'></i></Link>
      </div>
    );
    return (
      <div>
        {statsSmall}
        {statsLarge}
      </div>
    );
  }
}
