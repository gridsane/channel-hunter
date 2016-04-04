import React, {Component, PropTypes} from 'react';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return <ul style={this.getStyle()}>{this.props.children}</ul>;
  }

  getStyle() {
    return {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      ...this.props.style,
    };
  }
}
