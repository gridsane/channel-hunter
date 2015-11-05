import React, {Component, PropTypes} from 'react';
import {AppBar, Navigation, Icon} from './common';
import Account from './Account';
import Controls from './Controls';
import Channels from './Channels';
import Playlist from './Playlist';
import {shadow} from '../utils/styles';

export default class Application extends Component {
  state = {
    isMobileMode: false,
    isNavOpen: true,
    isNavDocked: true,
  };

  componentWillMount() {
    this._updateNavigationMode();
    window.addEventListener('resize', ::this._updateNavigationMode);
  }

  _updateNavigationMode() {
    const isMobileMode = window.innerWidth < 960;

    if (this.state.isMobileMode !== isMobileMode) {
      this.setState({
        isMobileMode: isMobileMode,
        isNavDocked: !isMobileMode,
        isNavOpen: !isMobileMode,
      });
    }
  }

  render() {
    const {isNavOpen, isNavDocked} = this.state;
    const styles = this.getStyles();

    return <div style={styles.container}>
      <Navigation
        style={styles.nav}
        open={isNavOpen}
        docked={isNavDocked}>
        <Channels />
      </Navigation>

      <AppBar style={styles.appBar}>
        <Controls style={styles.controls} />
      </AppBar>

      <div style={styles.content}>
        <Playlist style={styles.playlist} />
      </div>
    </div>
  }

  getStyles() {
    const {isNavOpen, isNavDocked} = this.state;
    const navPadding = {
      paddingLeft: isNavOpen && isNavDocked ? '336px' : '16px',
      transition: 'padding-left .3s ease-out',
    };

    return {
      container: {
        fontFamily: 'Roboto',
        paddingTop: '60px',
        paddingRight: '16px',
        ...navPadding,
      },

      nav: {
        paddingTop: isNavDocked ? '60px' : 0,
      },

      appBar: {
        ...navPadding,
      },

      content: {
        margin: '-16px 0 64px 0',
      },

      controls: {
        width: '100%',
      },

      playlist: {
        paddingTop: '16px',
        width: '100%',
        boxShadow: shadow(20),
      },

    }
  }
}
