import React, {Component, PropTypes} from 'react';
import {formatDuration} from '../../utils/common';
import {Loader, IconButton} from '../ui';
import Progress from './header-player-progress';
import ReactPlayer from 'react-player';

export default class HeaderPlayer extends Component {

  static propTypes = {
    track: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    onTogglePlay: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  };

  static defaultProps = {
    track: null,
  };

  state = {
    position: 0,
    isLoading: false,
    duration: 0,
  };

  render() {
    const {position, isLoading, duration} = this.state;
    const {track, isPlaying, onNext, onError} = this.props;
    const styles = this.getStyles();

    return <div style={styles.container}>
      <IconButton
        onClick={::this._togglePlaying}
        style={styles.playback} size={32} boxSize={40}>{isPlaying ? 'pause' : 'play_arrow'}</IconButton>
      <IconButton
        onClick={onNext}
        style={styles.next} size={32} boxSize={40}>skip_next</IconButton>
      {this.renderTitle(styles)}
      <span style={styles.time}>{formatDuration(position)}</span>

      <Progress
        isLoading={isLoading}
        current={position}
        max={duration}
        onSeek={::this._seek} />

      <ReactPlayer
        ref="player"
        width={0}
        height={0}
        url={track ? track.url : null}
        playing={isPlaying}
        onError={onError}
        onProgress={::this._updateProgress}
        onDuration={::this._updateDuration}
        onEnded={onNext} />

      {isLoading ? <Loader size={24} style={styles.loader} /> : null}
    </div>;
  }

  renderTitle(styles) {
    if (this.props.track) {
      return <span style={styles.title}>
        {this.props.track.title}
        <span style={styles.artist}>
          {' by '}
          {this.props.track.artist}
        </span>
      </span>;
    }

    return <span style={styles.title}>No track</span>;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.track !== this.props.track) {
      this._updateProgress(0);
      this._updateDuration(nextProps.track ? nextProps.track.duration : 0);
    }
  }

  _seek(position) {
    this.refs.player.seekTo(position / this.state.duration);
  }

  _updateDuration(duration) {
    this.setState({duration});
  }

  _updateProgress(progress) {
    this.setState({position: progress.played * this.state.duration});
  }

  _togglePlaying() {
    this.props.onTogglePlay(!this.props.isPlaying);
  }

  _toggleLoading(isLoading) {
    this.setState({isLoading});
  }

  getStyles() {
    const {isLoading} = this.state;
    const {track} = this.props;

    return {

      container: {
        boxSizing: 'border-box',
        marginLeft: 280,
        marginRight: 16,
        height: '60px',
        padding: '10px 0',
        paddingLeft: '96px',
        paddingRight: isLoading ? 102 : 64,
        position: 'relative',
        whiteSpace: 'nowrap',
        display: track ? null : 'none',
      },

      title: {
        display: 'inline-block',
        height: '40px',
        lineHeight: '40px',
        fontSize: '24px',
        verticalAlign: 'middle',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100%',
      },

      artist: {
        fontSize: '16px',
      },

      time: {
        position: 'absolute',
        right: '4px',
        width: '56px',
        textAlign: 'center',
        fontSize: '16px',
        verticalAlign: 'middle',
        lineHeight: '40px',
      },

      playback: {
        position: 'absolute',
        left: 0,
      },

      next: {
        position: 'absolute',
        left: '48px',
      },

      loader: {
        position: 'absolute',
        top: '18px',
        right: '64px',
      },
    };
  }
}