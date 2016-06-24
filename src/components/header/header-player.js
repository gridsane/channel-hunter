import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {formatDuration} from '../../utils';
import {Loader, IconButton} from '../ui';
import Progress from './header-player-progress';
import ReactPlayer from 'react-player';
import styles from './header.scss';

export default class HeaderPlayer extends Component {
  static propTypes = {
    track: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    onTogglePlay: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    track: null,
  }

  state = {
    progress: 0,
    lastSeekedProgress: 0,
    isLoading: false,
    duration: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {progress, isLoading, duration} = this.state;
    const {track, isPlaying, onNext, onError} = this.props;

    return <div className={styles.player}>
      <IconButton
        glyph={isPlaying ? 'pause' : 'play_arrow'}
        onClick={this._togglePlaying}
        size={32}
        boxSize={40}
        className={styles.playerToggle}/>

      <IconButton
        glyph="skip_next"
        onClick={onNext}
        size={32}
        boxSize={40}
        className={styles.playerNext} />

      {this._renderTitle()}

      {duration
        ? <span className={styles.playerTime}>{formatDuration(progress)}</span>
        : null}

      {duration && (progress || isPlaying)
        ? <Progress
            isLoading={isLoading}
            current={progress}
            max={duration}
            canSeek={isPlaying && !isLoading}
            onSeek={this._seek} />
        : null}

      <ReactPlayer
        ref="player"
        width={0}
        height={0}
        url={track ? track.url : null}
        playing={isPlaying}
        onError={onError}
        onProgress={this._updateProgress}
        onDuration={this._updateDuration}
        onEnded={onNext} />

      {isLoading && isPlaying
        ? <Loader size={24} className={styles.playerLoader} />
        : null}
    </div>;
  }

  _renderTitle() {
    if (!this.props.track) {
      return null;
    }

    const {artist, title} = this.props.track;

    return <span className={styles.playerTitle}>{title}
      {artist
        ? <span className={styles.playerArtist}> by {artist}</span>
        : null}
    </span>;
  }

  componentWillMount() {
    if (this.props.track) {
      this._updateDuration(this.props.track.duration);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (shouldTrackUpdate(this.props.track, nextProps.track)) {
      this.setState({
        progress: 0,
        lastSeekedProgress: 0,
        isLoading: nextProps.isPlaying,
      });
      this._updateDuration(nextProps.track ? nextProps.track.duration : null, true);
    }
  }

  _seek = (progress) => {
    this.refs.player.seekTo(progress / this.state.duration);
    this.setState({
      isLoading: true,
      lastSeekedProgress: progress,
      progress: progress,
    });
  }

  _updateDuration = (duration, forced = false) => {
    if (forced || !isNaN(parseInt(duration))) {
      this.setState({duration});
    }
  }

  _updateProgress = (progress) => {
    if (!progress || !progress.played) {
      return;
    }

    const nextProgress = progress.played * this.state.duration;
    this.setState({
      isLoading: nextProgress <= this.state.lastSeekedProgress,
      progress: nextProgress,
    });
  }

  _togglePlaying = () => {
    this.props.onTogglePlay(!this.props.isPlaying);
  }
}

function shouldTrackUpdate(prevTrack, nextTrack) {
  if (!prevTrack && nextTrack) {
    return true;
  }

  return nextTrack && nextTrack.id !== prevTrack.id;
}
