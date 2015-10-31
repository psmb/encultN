import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';

export default class BlogSmall extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Link key={this.props.blog.get('id')} className='mdl-cell BlogSmall' to={`/analytics/${this.props.blog.get('id')}`}>
        <h2 className='mdl-typography--headline-color-contrast BlogSmall-title'>{this.props.blog.get('title')}</h2>
        <p className='mdl-typography--body-1-color-contrast BlogSmall-authorName'>{this.props.blog.get('authorName')}</p>
      </Link>
    );
  }
}
