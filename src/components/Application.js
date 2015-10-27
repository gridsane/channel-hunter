import React, {Component} from 'react';
import {AppBar} from './common';
import Account from './Account';
import Controls from './Controls';
import Channels from './Channels';
import Playlist from './Playlist';
import {shadow} from '../utils/styles';

export default class Application extends Component {
  render() {
    let styles = this.getStyles();

    return <div style={styles.container}>
      <AppBar>
        <Account style={styles.navCol} />
        <Controls style={styles.bodyCol} />
      </AppBar>
      <div style={styles.body}>
        <div style={styles.channelsContainer}>
          <Channels style={styles.channels} />
        </div>
        <div style={styles.playlistContainer}>
          <Playlist style={styles.playlist} />
        </div>
      </div>
    </div>
  }

  getStyles() {

    const navCol = {
      boxSizing: 'border-box',
      minWidth: '40%',
    }

    const bodyCol = {
      boxSizing: 'border-box',
      minWidth: '60%',
    }

    const paper = {
      height: '100%',
      boxShadow: shadow(2),
    }

    return {

      container: {
        fontFamily: 'Roboto',
        paddingTop: '60px',
      },

      body: {
        display: 'flex',
      },

      navCol: navCol,
      bodyCol: bodyCol,

      channelsContainer: {
        padding: '0 8px 0 16px',
        ...navCol,
      },

      playlistContainer: {
        padding: '0 16px 0 8px',
        ...bodyCol,
      },

      channels: {
        ...paper,
      },

      playlist: {
        ...paper,
      },

    }
  }
}
