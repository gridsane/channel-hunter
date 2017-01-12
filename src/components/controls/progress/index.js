import React, {PropTypes} from 'react';
import cn from 'classnames';
import {nodeOffset} from 'utils';
import styles from './progress.scss';

export default class Progress extends React.PureComponent {
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
      className={cn(styles.root, {
        [styles.seekable]: canSeek,
      })}
      onClick={this._seek}>

      <div className={cn(styles.background, {
        [styles.backgroundLoading]: isLoading,
      })} />

      <div className={styles.bar} style={{width: progressPercent}}/>

      {canSeek
        ? <div className={styles.pointer} style={{left: progressPercent}}>
            <div className={styles.pointerGlow} />
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
