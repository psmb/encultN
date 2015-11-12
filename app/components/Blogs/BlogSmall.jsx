import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';
import moment from 'moment';
import {getLang} from 'i18n/index';

export default class BlogSmall extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
  }

  render() {
    moment.locale(getLang());
    return (
      <Link key={this.props.blog.get('id')} className='Media' to={`/analytics/${this.props.blog.get('id')}`}>
        <div className='Media-wrap'>
          <h2 className='marginVertical-double mdl-typography--headline-color-contrast Media-title'>{this.props.blog.get('title')}</h2>
          <p className='Media-author marginVertical-double mdl-typography--title-color-contrast'>
            {this.props.blog.get('authorName')},<br/>
            {this.props.blog.get('authorTitle')}
          </p>
          <h3 className='marginVertical-double mdl-typography--body-1-color-contrast Media-subTitle'>{this.props.blog.get('teaser')}</h3>
          <p className='mdl-typography--caption-color-contrast Media-lead'>
            {moment(this.props.blog.get('date')).format('LL')} •
          </p>
        </div>
        <div className='hide-for-small-only'>
          <i className='icon-right-circle Media-icon'></i>
        </div>
      </Link>
    );
  }
}
