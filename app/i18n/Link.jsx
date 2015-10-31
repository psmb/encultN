import React, {Component, PropTypes} from 'react';
import {Link as LinkR} from 'react-router';
import {getLang} from 'i18n/index';

export default class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: React.PropTypes.node,
  }

  render() {
    return (
      <LinkR {...this.props} to={`/${getLang()}${this.props.to}`} >{this.props.children}</LinkR>
    );
  }
}
