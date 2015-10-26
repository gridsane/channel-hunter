import React, {Component} from 'react';
import {AppBar} from './common';
import Account from './Account';
import Controls from './Controls';
import Channels from './Channels';
import Playlist from './Playlist';

export default class Application extends Component {
  render() {
    let styles = this.getStyles();

    return <div style={styles.container}>
      <AppBar>
        <Account style={styles.navCol} />
        <Controls style={styles.bodyCol} />
      </AppBar>
      <div style={styles.body}>
        <Channels style={styles.navCol} />
        <Playlist style={styles.bodyCol} />
      </div>
    </div>
  }

  getStyles() {
    return {

      container: {
        fontFamily: 'Roboto',
        paddingTop: '60px',
      },

      body: {
        display: 'flex',
        padding: '0 16px',
      },

      navCol: {
        minWidth: '30%',
      },

      bodyCol: {
        minWidth: '70%',
      },

    }
  }
}
