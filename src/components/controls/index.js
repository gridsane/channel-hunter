import React, {PropTypes} from 'react';
import ReactPlayer from 'react-player';
import IconButton from 'components/ui/icon-button';
import Progress from './progress';
import styles from './controls.scss';

export default class Controls extends React.PureComponent {
  static propTypes = {
    // trackId: PropTypes.string,
    // trackTitle: PropTypes.string,
    // trackArtist: PropTypes.string,
    // trackUrl: PropTypes.string,
    // trackDuration: PropTypes.number,
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

  render() {
    const {track, isPlaying, onError, onNext} = this.props;
    const {progress, isLoading, duration} = this.state;

    return <div className={styles.root}>
      <div className={styles.cover}>
        <div
          className={styles.coverImage}
          style={{backgroundImage: track && track.cover ? `url(${track.cover})` : null}}/>
      </div>

      <div className={styles.track}>
        <IconButton
          onClick={this._togglePlaying}
          glyph={isPlaying ? 'pause' : 'play_arrow'}
          size="large"
          className={styles.play} />
        <IconButton
          onClick={onNext}
          glyph="skip_next"
          size="large"
          className={styles.next} />
        {track && <span className={styles.trackName}>
          {track.title}{track.artist ? ' ' + track.artist : null}
        </span>}
      </div>

      <Progress
        current={progress || 0}
        max={duration || 1}
        onSeek={this._seek}
        isLoading={isLoading}
        canSeek={isPlaying && !isLoading} />

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
    </div>;
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
        duration: this._getDuration(nextProps.track ? nextProps.track.duration : null),
      }, () => this.refs.player.seekTo(0));
    }
  }

  _seek = progress => {
    this.refs.player.seekTo(progress / this.state.duration);
    this.setState({
      progress,
      isLoading: true,
      lastSeekedProgress: progress,
    });
  }

  _updateDuration = (duration) => {
    this.setState({duration: this._getDuration(duration) || this.state.duration});
  }

  _updateProgress = progress => {
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


  _getDuration(duration) {
    const nextDuration = parseInt(duration);
    if (!isNaN(nextDuration) && nextDuration > 0) {
      return nextDuration;
    }

    return null;
  }
}

function shouldTrackUpdate(prevTrack, nextTrack) {
  if (!prevTrack || !nextTrack) {
    return true;
  }

  return nextTrack && nextTrack.id !== prevTrack.id;
}
