import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class FlatButton extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
  };

  render() {
    return <button style={this.getStyles()}>{this.props.label}</button>;
  }

  getStyles() {
    return {
      height: 36,
      padding: '0 24px',
      lineHeight: '16px',
      fontSize: '16px',
      textTransform: 'uppercase',
      border: 'none',
      background: 'none',
      cursor: 'pointer',

      ':hover': {
        background: 'rgba(0,0,0,.1)',
      },

      ...this.props.style,
    };
  }
}
