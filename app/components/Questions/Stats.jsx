import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Stats extends Component {
  static propTypes = {
    worldviews: PropTypes.object.isRequired,
  }

  render() {
    const worldviews = this.props.worldviews ? this.props.worldviews.sort((a, b) => a.get('voteCount') < b.get('voteCount')).slice(0, 3).map(worldview => {
      return (
        <p className='mdl-typography--subhead'>{worldview.get('title')}: <span className='mdl-typography--subhead'>{worldview.get('voteCount')}</span></p>
      );
    }) : '';
    return (
      <div className='Stats mdl-shadow--4dp' >
        <div className='fixed-width'>
          <p className='mdl-typography--caption'>Лидеры голосования</p>
          {worldviews}
          <Link className='hide button mdl-button mdl-button--raised' to={`/stats/`}>Статистика</Link>
        </div>
      </div>
    );
  }
}
