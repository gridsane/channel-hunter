import React, {Component} from 'react';
import {formatDuration} from '../utils/common';
import {Icon} from './common'
import Progress from './Progress'
import {connect} from 'react-redux';
import {togglePlaying} from '../actions/player';

@connect((state) => {
  return {
    track: state.player.track,
    isPlaying: state.player.isPlaying,
    progress: formatDuration(state.player.progress),
  }
})
export default class Controls extends Component {

  togglePlaying() {
    this.props.dispatch(togglePlaying(!this.props.isPlaying));
  }

  render() {
    let styles = this.getStyles();
    styles.container = Object.assign({}, styles.container, this.props.style);

    return <div style={styles.container}>
      <Icon
        onClick={::this.togglePlaying}
        style={styles.playback} size={32} boxSize={40}>{this.props.isPlaying ? 'pause' : 'play_arrow'}</Icon>
      <Icon style={styles.next} size={32} boxSize={40}>skip_next</Icon>
      {this.renderTitle(styles)}
      <span style={styles.time}>{this.props.progress}</span>
      <Icon style={styles.star} size={24} boxSize={40}>star_border</Icon>
      <Progress />
    </div>
  }

  renderTitle(styles) {
    if (this.props.track) {
      return <span style={styles.title}>
        {this.props.track.title}
        <span style={styles.artist}>
          {' by '}
          {this.props.track.artist}
        </span>
      </span>
    }

    return <span style={styles.title}>No track</span>;
  }

  getStyles() {
    let clickable = {
      cursor: 'pointer',
    }

    return {

      container: {
        boxSizing: 'border-box',
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
        ...clickable,
      },

      playback: {
        position: 'absolute',
        left: 0,
        ...clickable,
      },

      next: {
        position: 'absolute',
        left: '48px',
        ...clickable,
      },
    }
  }
}
