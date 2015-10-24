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
    console.log("asdasd");
    this.props.dispatch(togglePlaying(!this.props.isPlaying));
  }

  render() {
    let styles = this.getStyles();

    return <div style={styles.container}>
      <Icon
        onClick={::this.togglePlaying}
        style={styles.playback} size={40}>{this.props.isPlaying ? 'pause' : 'play_arrow'}</Icon>
      <Icon style={styles.next} size={40}>skip_next</Icon>
      {this.renderTitle(styles)}
      <span style={styles.time}>{this.props.progress}</span>
      <Icon style={styles.star} size={24}>star_border</Icon>
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
        // outline: '1px solid red',
        boxSizing: 'border-box',
        height: '60px',
        padding: '10px 0',
        paddingLeft: '96px',
        paddingRight: '106px',
        position: 'relative',
        whiteSpace: 'nowrap',
        flexBasis: 1,
        flexShrink: 1,
        flexGrow: 2,
      },

      title: {
        // outline: '1px solid green',
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
        // outline: '1px solid red',
        position: 'absolute',
        right: '48px',
        width: '56px',
        textAlign: 'right',
        fontSize: '16px',
        verticalAlign: 'middle',
        lineHeight: '40px',
      },

      star: {
        // outline: '1px solid red',
        position: 'absolute',
        right: 0,
        height: '40px',
        width: '40px',
        textAlign: 'center',
        lineHeight: '40px',
        ...clickable,
      },

      playback: {
        // outline: '1px solid red',
        position: 'absolute',
        left: 0,
        ...clickable,
      },

      next: {
        // outline: '1px solid red',
        position: 'absolute',
        left: '48px',
        ...clickable,
      },
    }
  }
}
