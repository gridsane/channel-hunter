import React, {Component} from 'react';
import {connect} from 'react-redux';
import {colors} from '../utils/styles';
import {setProgress} from '../actions/player';
import {nodeOffset} from '../utils/common';
import {FlatButton} from './common';

@connect((state) => {
  let track = state.player.track;

  return {
    current: state.player.progress,
    max: track ? track.duration : 0,
  }
})
export default class Progress extends Component {

  static propTypes = {
    current: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    current: 0,
    max: 100,
  };

  getPercentage() {
    return (this.props.max / 100) * this.props.current
  }

  seek(e) {
    let node = this.refs.progress;
    let width = node.offsetWidth;
    let pos = e.clientX - nodeOffset(node).left - this.refs.pointer.offsetWidth / 2;
    let value = (this.props.max / width) * pos;
    this.props.dispatch(setProgress(Math.round(value)))
  }

  render() {
    let styles = this.getStyles();

    return <div ref="progress" style={styles.container} onClick={::this.seek}>
      <div style={styles.progress} />
      <div style={styles.pointer} ref="pointer">
        <div style={styles.pointerGlow} />
      </div>
    </div>
  }

  getStyles() {
    return {

      container: {
        boxSizing: 'border-box',
        height: '4px',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, .24)',
        bottom: 0,
        left: 0,
        right: 0,
        cursor: 'pointer',
      },

      progress: {
        position: 'absolute',
        backgroundColor: colors.accent,
        height: '4px',
        left: 0,
        top: 0,
        width: `${this.getPercentage()}%`,
      },

      pointer: {
        zIndex: 10,
        position: 'absolute',
        top: '-4px',
        left: `${this.getPercentage()}%`,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: colors.accent,
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

    }
  }
}
