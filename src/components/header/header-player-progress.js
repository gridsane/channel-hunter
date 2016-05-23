import React, {Component, PropTypes} from 'react';
import {nodeOffset} from '../../utils/common';
import cn from 'classnames';
import styles from './header.scss';

export default class HeaderPlayerProgress extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onSeek: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    canSeek: PropTypes.bool,
  }

  static defaultProps = {
    canSeek: true,
  }

  render() {
    const {isLoading, canSeek} = this.props;
    const progressPercent = ((100 / this.props.max) * this.props.current) + '%';

    return <div ref="progress"
      className={cn(styles.progress, {
        [styles.progressSeekable]: canSeek,
      })}
      onClick={this._seek}>

      <div className={cn(styles.progressBackground, {
        [styles.progressBackgroundLoading]: isLoading,
      })} />

      <div className={styles.progressBar} style={{width: progressPercent}}/>

      {canSeek
        ? <div className={styles.progressPointer} style={{left: progressPercent}}>
            <div className={styles.progressPointerGlow} />
          </div>
        : null}
    </div>;
  }

  _seek = (e) => {
    if (!this.props.canSeek) {
      return;
    }

    const node = this.refs.progress;
    const width = node.offsetWidth;
    const pos = (this.props.max / width) * (e.clientX - nodeOffset(node).left);
    this.props.onSeek(Math.round(pos));
  }
}
