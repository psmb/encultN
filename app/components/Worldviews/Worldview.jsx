import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Link from 'i18n/Link';
import puttext from 'i18n/index';
import * as actionCreators from 'redux/modules/voting';

@connect(state => ({
  worldviews: state.voting.get('worldviews'),
}), actionCreators)
export default class Worldview extends Component {
  static propTypes = {
    worldviews: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchWorldview: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (typeof(this.props.worldviews.getIn([this.props.params.id, 'description'])) === 'undefined') {
      this.props.fetchWorldview(this.props.params.id);
    }
  }

  render() {
    const __ = puttext();
    const worldviewData = this.props.worldviews ? this.props.worldviews.get(this.props.params.id) : null;
    const worldview = worldviewData.get('description') ? (
      <div>
        <div className='row'>
          <div className='medium-8 columns'>
            <h1 className='mdl-typography--display-1-color-contrast marginTop-triple Worldview-title'>{worldviewData.get('title')}</h1>
            <div className='color-primary marginVertical-single'>
              <span className='mdl-typography--body-1-color-contrast'>{worldviewData.get('voteCount')} <i className='icon-check'></i></span>
              <Link className='mdl-typography--caption' to={`/stats/`}>{__('Вся статистика')} <i className='icon-right-circle'></i></Link>
            </div>
            <p className='marginBottom-triple mdl-typography--body-1-color-contrast Worldview-teaser'>{worldviewData.get('teaser')}</p>
          </div>
        </div>
        <div className='row'>
          <div className='Worldviews medium-10 medium-offset-1 columns'>
            <p className='mdl-typography--body-1-color-contrast RteText' dangerouslySetInnerHTML={{__html: worldviewData.get('description')}} />
          </div>
        </div>
      </div>
    ) : (<div className='Loader'>{__('Минуточку...')} <i className='icon-spinner animate-spin' /></div>);
    return (
      <div className='fixed-width'>
          {worldview}
      </div>
    );
  }
}
