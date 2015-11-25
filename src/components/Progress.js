import React, {Component, PropTypes} from 'react';
import {colors} from '../utils/styles';
import {nodeOffset, curried} from '../utils/common';

export default class Progress extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onSeek: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  state = {
    mouseEnter: false,
  };

  render() {
    const styles = this.getStyles();

    return <div ref="progress"
      style={styles.container}
      onMouseEnter={curried(::this._mouseEnter, true)}
      onMouseLeave={curried(::this._mouseEnter, false)}
      onClick={::this._seek}>
      <div style={styles.background} />
      <div style={styles.progress} />
      <div style={styles.pointer} ref="pointer">
        <div style={styles.pointerGlow} />
      </div>
    </div>;
  }

  _mouseEnter(state) {
    this.setState({mouseEnter: state});
  }

  _seek(e) {
    const node = this.refs.progress;
    const width = node.offsetWidth;
    const pos = (this.props.max / width) * (e.clientX - nodeOffset(node).left);
    this.props.onSeek(Math.round(pos));
  }

  getStyles() {
    const {isLoading} = this.props;
    const {mouseEnter} = this.state;
    const progressPercent = ((100 / this.props.max) * this.props.current) + '%';

    const bufferBackground = {
      backgroundImage: 'radial-gradient(rgb(169, 192, 233) 0%, rgb(169, 192, 233) 24%, transparent 50%)',
      backgroundSize: '10px 10px',
      backgroundPosition: '0px center',
      backgroundRepeat: 'repeat-x',
      animation: 'Progress-buffer 3s infinite linear',
    };

    const playingBackground = {
      background: 'rgba(255, 255, 255, .24)',
    };

    return {

      container: {
        boxSizing: 'border-box',
        height: '16px',
        position: 'absolute',
        bottom: '-6px',
        left: 0,
        right: 0,
        cursor: 'pointer',
      },

      background: {
        position: 'absolute',
        bottom: '6px',
        left: 0,
        right: 0,
        height: '4px',
        zIndex: -1,
        ...(isLoading ? bufferBackground : playingBackground),
      },

      progress: {
        position: 'absolute',
        backgroundColor: colors.accent,
        height: '4px',
        left: 0,
        bottom: '6px',
        width: progressPercent,
      },

      pointer: {
        zIndex: 10,
        position: 'absolute',
        top: '2px',
        left: progressPercent,
        marginLeft: '-8px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: colors.accent,
        opacity: mouseEnter ? 1 : 0,
        transform: 'scale(' + (mouseEnter ? '1' : '.3') +')',
        transition: 'opacity .1s ease-out, transform .2s ease-out',
      },

      pointerGlow: {
        position: 'absolute',
        top: '-6px',
        left: '-6px',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: colors.accent,
        opacity: .24,
      },

    };
  }

}
