import React, {Component, PropTypes} from 'react';
import {formatDuration} from '../utils/common';
import {IconButton} from './common';
import Progress from './Progress';
import Player from './Player';

export default class Controls extends Component {

  static propTypes = {
    track: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  state = {
    position: 0,
    seekedPosition: 0,
  };

  render() {
    const {position, seekedPosition} = this.state;
    const {track, isPlaying, onNext} = this.props;
    const duration = track ? track.duration : 0;
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
      <IconButton style={styles.star} size={24} boxSize={40}>star_border</IconButton>
      <Progress
        current={position}
        max={duration}
        onSeek={::this._seek} />

      {track ? <Player
        src={track.url}
        position={seekedPosition}
        paused={!isPlaying}
        onTimeUpdate={(nextPosition) => {
          this._updatePosition(nextPosition);
        }}
        onEnd={onNext} /> : null}
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
      this._seek(0);
    }
  }

  _seek(position) {
    this.setState({
      position: position,
      seekedPosition: position,
    });
  }

  _updatePosition(position) {
    this.setState({position});
  }

  _togglePlaying() {
    this.props.onToggle(!this.props.isPlaying);
  }

  getStyles() {
    return {

      container: {
        boxSizing: 'border-box',
        width: '100%',
        height: '60px',
        padding: '10px 0',
        paddingLeft: '96px',
        paddingRight: '106px',
        position: 'relative',
        whiteSpace: 'nowrap',
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
        right: '48px',
        width: '56px',
        textAlign: 'right',
        fontSize: '16px',
        verticalAlign: 'middle',
        lineHeight: '40px',
      },

      star: {
        position: 'absolute',
        right: 0,
      },

      playback: {
        position: 'absolute',
        left: 0,
      },

      next: {
        position: 'absolute',
        left: '48px',
      },

    };
  }
}
