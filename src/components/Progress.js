import React, {Component, PropTypes} from 'react';
import {colors} from '../utils/styles';
import {nodeOffset} from '../utils/common';

export default class Progress extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onSeek: PropTypes.func.isRequired,
  };

  render() {
    const styles = this.getStyles();

    return <div ref="progress" style={styles.container} onClick={::this._seek}>
      <div style={styles.progress} />
      <div style={styles.pointer} ref="pointer">
        <div style={styles.pointerGlow} />
      </div>
    </div>
  }

  _seek(e) {
    const node = this.refs.progress;
    const width = node.offsetWidth;
    const pos = (this.props.max / width) * (e.clientX - nodeOffset(node).left);
    this.props.onSeek(Math.round(pos));
  }

  getStyles() {
    const progressPercent = ((100 / this.props.max) * this.props.current) + '%';

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
        width: progressPercent,
      },

      pointer: {
        zIndex: 10,
        position: 'absolute',
        top: '-4px',
        left: progressPercent,
        marginLeft: '-8px',
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
