import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import WorldviewSmall from './WorldviewSmall';
import puttext from 'i18n/index';

@connect(state => ({
  worldviews: state.voting.get('worldviews'),
}))
export default class Worldviews extends Component {
  static propTypes = {
    worldviews: PropTypes.object,
  }

  render() {
    const __ = puttext();
    const worldviews = this.props.worldviews ? this.props.worldviews.map((worldview) => {
      return (
        <WorldviewSmall key={worldview.get('id')} worldview={worldview} />
      );
    }).toArray() : (<div className='Loader'>{__('Минуточку...')} <i className='icon-spinner animate-spin' /></div>);

    return (
      <div>
        <div className='row'>
          <div className='Worldviews medium-10 medium-offset-1 large-8 large-offset-2 columns fixed-width '>
            {worldviews}
          </div>
        </div>
      </div>
    );
  }
}
