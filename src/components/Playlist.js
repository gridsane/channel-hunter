import React, {Component} from 'react';
import {connect} from 'react-redux';
import {colors} from '../utils/styles';
import {List, ListItem} from './common';

@connect((state) => {
  return {
    tracks: state.tracks.items,
  }
})
export default class Playlist extends Component {
  render() {
    let styles = this.getStyles();
    styles.container = Object.assign({}, styles.container, this.props.style);

    return <List style={styles.container}>
      {this.renderTracks(styles)}
    </List>
  }

  renderTracks(styles) {
    return this.props.tracks.map((track) => {
      return <ListItem
        key={track.id}
        primaryText={this.renderTrackName(track, styles)}
        rightIcon="more_vert" />
    });
  }

  renderTrackName(track, styles) {
    return <span>
      {track.title}
      <span style={styles.artist}>
        {` by ${track.artist}`}
      </span>
    </span>
  }

  getStyles() {
    return {

      container: {
      },

      artist: {
        color: colors.secondaryText,
      },

    }
  }
}
