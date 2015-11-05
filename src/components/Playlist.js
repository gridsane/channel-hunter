import React, {Component} from 'react';
import {connect} from 'react-redux';
import {colors} from '../utils/styles';
import {List, ListItem, ListLabel, Icon} from './common';
import {curried} from '../utils/common';
import {setTrack} from '../actions/player';

@connect((state) => {
  const tracks = state.tracks.items.filter((track) => {
    return state.channels.picked.indexOf(track.channelId) !== -1;
  });

  return {
    currentTrack: state.player.track,
    tracks: tracks,
    tracksCount: tracks.length,
    channelsCount: state.channels.picked.length,
  }
})
export default class Playlist extends Component {
  render() {
    let styles = this.getStyles();
    styles.container = Object.assign({}, styles.container, this.props.style);

    return <List style={styles.container}>
      <ListLabel
        text={`${this.props.tracksCount} tracks from ${this.props.channelsCount} channels`}
        icon="shuffle" />
      {this.renderTracks(styles)}
    </List>
  }

  renderTracks(styles) {
    return this.props.tracks.map((track) => {
      return <ListItem
        key={track.id}
        leftElement={
          this.props.currentTrack && this.props.currentTrack.id == track.id
          ? <Icon style={styles.currentIcon} size={24}>play_arrow</Icon>
          : null
        }
        leftElementHeight={24}
        primaryText={this.renderTrackName(track, styles)}
        rightIcon="more_vert"
        onClick={curried(::this._selectTrack, track) } />
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

  _selectTrack(track) {
    this.props.dispatch(setTrack(track));
  }

  getStyles() {
    return {

      container: {
      },

      artist: {
        color: colors.secondaryText,
      },

      currentIcon: {
        color: colors.secondaryText,
      },

    }
  }
}
