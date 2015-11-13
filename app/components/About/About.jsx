import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import puttext from 'i18n/index';

@connect(state => ({
  about: state.about,
}))
export default class About extends Component {
  static propTypes = {
    about: PropTypes.object,
  }

  render() {
    const __ = puttext();
    const about = this.props.about ? (
      <div className='About'>
        <div className='row'>
          <div className='medium-8 columns'>
            <h1 className='marginVertical-double mdl-typography--display-1-color-contrast'>{this.props.about.get('title')}</h1>
            <p className='marginBottom-triple mdl-typography--body-1-color-contrast' dangerouslySetInnerHTML={{__html: this.props.about.get('teaser')}} />
          </div>
        </div>
        <div className='row'>
          <div className='medium-10 medium-offset-1 columns RteText' dangerouslySetInnerHTML={{__html: this.props.about.get('bodytext')}} />
        </div>
      </div>
    ) : __('Минуточку...');

    return (
      <div className='fixed-width'>
        {about}
      </div>
    );
  }
}
