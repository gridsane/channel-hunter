import React, {Component} from 'react';
import {colors, shadow} from '../../utils/styles';

export default class AppBar extends Component {
  render() {
    let styles = this.getStyles();

    return <div style={styles.container}>
      {this.props.children}
    </div>
  }

  getStyles() {
    return {
        container: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignContent: 'stretch',
          alignItems: 'stretch',
          backgroundColor: colors.primary,
          boxShadow: shadow(4),
          color: colors.text,
          padding: '0 16px',
          zIndex: 4,
        }
    }
  }
}
