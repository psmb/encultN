import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';

export default class WorldviewSmall extends Component {
  static propTypes = {
    worldview: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Link key={this.props.worldview.get('id')} className='mdl-cell WorldviewSmall' to={`/worldviews/${this.props.worldview.get('id')}`}>
        <h2 className='mdl-typography--headline-color-contrast WorldviewSmall-title'>{this.props.worldview.get('title')}</h2>
      </Link>
    );
  }
}
