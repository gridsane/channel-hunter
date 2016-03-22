import React, {Component} from 'react';
import {colors, shadow} from '../../utils/styles';

export default class AppBar extends Component {
  render() {
    return <div style={this.getStyle()}>
      {this.props.children}
    </div>;
  }

  getStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      boxShadow: shadow(4),
      color: colors.text,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 16,
      paddingRight: 16,
      zIndex: 4,
      backgroundColor: colors.primary,
      ...this.props.style,
    };
  }
}
