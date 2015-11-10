import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import puttext from 'i18n/index';
import Link from 'i18n/Link';
if (process.env.BROWSER) {
  require('./Stats.scss');
}

@connect(state => ({
  worldviews: state.voting.get('worldviews'),
}))
export default class Stats extends Component {
  static propTypes = {
    worldviews: PropTypes.object.isRequired,
  }

  render() {
    const __ = puttext();
    const worldviews = this.props.worldviews ? this.props.worldviews.sort((a, b) => a.get('voteCount') < b.get('voteCount')).map(worldview => {
      return (
        <tr>
          <td>
            <Link to={`/worldviews/${worldview.get('id')}`}>
              {worldview.get('title')}
            </Link>
          </td>
          <td>{worldview.get('voteCount')}</td>
        </tr>
      );
    }).toArray() : '';

    return (
      <div className='FullStats marginTop-double'>
        <div className='row'>
          <div className='medium-10 medium-offset-1 large-8 large-offset-2 columns fixed-width'>
          <h1 className='marginVertical-double mdl-typography--display-1-color-contrast'>{__('Статистика')}</h1>
          <table className='Table'>
            <tr>
              <th>{__('Мировоззрение')}</th>
              <th><i className='icon-check'></i></th>
            </tr>
            {worldviews}
          </table>
          </div>
        </div>
      </div>
    );
  }
}
