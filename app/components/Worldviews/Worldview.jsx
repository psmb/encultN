import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
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
    const worldview = this.props.worldviews ? (
      <div>
        <h1 className='mdl-typography--display-1-color-contrast Worldview-title'>{worldviewData.get('title')}</h1>
        <p className='mdl-typography--caption-color-contrast'><span className='color-primary'>{worldviewData.get('voteCount')} <i className='icon-check'></i></span></p>
        <p className='mdl-typography--body-1-color-contrast' dangerouslySetInnerHTML={{__html: worldviewData.get('description')}} />
      </div>
    ) : __('Минуточку...');
    return (
      <div>
        <div className='row'>
          <div className='Worldviews medium-10 medium-offset-1 large-8 large-offset-2 columns fixed-width '>
            {worldview}
          </div>
        </div>
      </div>
    );
  }
}
