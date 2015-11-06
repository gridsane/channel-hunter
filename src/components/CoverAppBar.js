import React, {Component, PropTypes} from 'react';
import {colors} from '../utils/styles';
import {AppBar} from './common';

export default class CoverAppBar extends Component {
  static propTypes = {
    compact: PropTypes.bool.isRequired,
    coverUrl: PropTypes.string,
  };

  static defaultProps = {
    coverUrl: null,
  };

  state = {
    backgroundPosition: '0%',
  };

  render() {
    console.log(this.state);
    const styles = this.getStyles();

    return <AppBar style={styles.container}>
      {this.props.children}
      <div style={styles.backgroundContainer}>
        <div style={styles.background} />
      </div>
    </AppBar>
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.coverUrl !== this.props.coverUrl) {
      this.setState({
        backgroundPosition: this.state.backgroundPosition === '0%' ? '100%' : '0%',
      });
    }
  }

  getStyles() {
    return {

      container: {
        paddingLeft: this.props.compact ? '16px' : '336px',
        transition: 'padding-left .3s ease-out',
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
        backgroundPositionY: this.state.backgroundPosition,
        transition: 'background-position-y 30s linear',
        opacity: .5,
      },

    }
  }
}
