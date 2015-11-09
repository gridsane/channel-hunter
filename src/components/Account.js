import React, {Component} from 'react';
import {colors} from '../utils/styles';
import {FlatButton} from './common';

export default class Account extends Component {
  render() {
    let styles = this.getStyles();
    styles.container = Object.assign({}, styles.container, this.props.style);

    return <div style={styles.container}>
      <FlatButton style={styles.signinButton} label="sign in" />
    </div>;
  }

  getStyles() {
    return {

      container: {
        boxSizing: 'border-box',
        height: '60px',
        padding: '12px 0',
      },

      signinButton: {
        color: colors.text,
      },

    };
  }
}
