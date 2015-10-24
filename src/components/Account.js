import React, {Component} from 'react';
import {colors} from '../utils/styles';
import {FlatButton} from './common';

export default class Account extends Component {
  render() {
    let styles = this.getStyles();

    return <div style={styles.container}>
      <FlatButton style={styles.signinButton} label="sign in" />
    </div>
  }

  getStyles() {
    return {

      container: {
        // outline: '1px solid render',
        display: 'inline-block',
        boxSizing: 'border-box',
        height: '60px',
        padding: '10px 0',
        flexGrow: 1,
        flexShrink: 1,
      },

      signinButton: {
        color: colors.text,
      },

    }
  }
}
