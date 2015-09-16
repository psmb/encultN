import React, {Component, PropTypes} from 'react';

export default class Answer extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
      	{this.props.text}
      </div>
    );
  }
}
