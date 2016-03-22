import React, {Component, PropTypes} from 'react';

export default class FlatButton extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
  };

  render() {
    return <button style={this.getStyle()}>{this.props.label}</button>;
  }

  getStyles() {
    return {
      height: 36,
      padding: '0 24px',
      lineHeight: 16,
      fontSize: 16,
      textTransform: 'uppercase',
      border: 'none',
      background: 'none',
      ...this.props.style,
    };
  }
}
