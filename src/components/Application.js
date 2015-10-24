import React, {Component} from 'react';
import {AppBar} from './common';
import Account from './Account';
import Controls from './Controls';

export default class Application extends Component {
  render() {
    let styles = this.getStyles();

    return <div style={styles.container}>
      <AppBar>
        <Account />
        <Controls />
      </AppBar>
    </div>
  }

  getStyles() {
    return {

      container: {
        fontFamily: 'Roboto',
      },

    }
  }
}
