import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {colors} from '../utils/styles';
import {AppBar} from './common';
const logoSvg = require('fs').readFileSync(`${__dirname}/../assets/logo.svg`);

@Radium
export default class CoverAppBar extends Component {
  static propTypes = {
    compact: PropTypes.bool.isRequired,
    coverUrl: PropTypes.string,
  };

  static defaultProps = {
    coverUrl: null,
  };

  render() {
    const styles = this.getStyles();

    return <AppBar style={styles.container}>
      <div
        style={styles.logo}
        dangerouslySetInnerHTML={{__html: logoSvg}}>
      </div>
      {this.props.children}
      <div style={styles.backgroundContainer}>
        <div style={styles.background} />
      </div>
    </AppBar>;
  }

  getStyles() {
    return {
      container: {
        paddingLeft: this.props.compact ? 16 : 296,
        transition: 'padding-left .3s ease-out',
      },

      logo: {
        position: 'absolute',
        left: 24,
        top: 13,
        fontSize: 24,
        fontFamily: 'Roboto Condensed, sans-serif',
        fontWeight: 400,
        display: this.props.compact ? 'none' : null,
        width: 32,
        height: 32,
      },

      backgroundContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: -1,
      },

      background: {
        position: 'absolute',
        top: '-12px',
        right: '-12px',
        bottom: '-12px',
        left: '-12px',
        backgroundColor: colors.primary,
        backgroundImage: this.props.coverUrl ? `url(${this.props.coverUrl})` : 'none',
        backgroundPositionX: 'center',
        backgroundRepeatY: 'repeat',
        backgroundSize: 'cover',
        WebkitFilter: 'blur(8px)',
        animation: 'x 60s linear infinite alternate',
        animationName: coverSliding,
        opacity: .5,
        transition: 'background 2s ease-out',
      },
    };
  }
}

const coverSliding = Radium.keyframes({
  'from': {
    backgroundPositionY: '0%',
  },
  'to': {
    backgroundPositionY: '100%',
  },
});
