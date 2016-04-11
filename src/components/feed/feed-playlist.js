import React, {Component, PropTypes} from 'react';
import {colors, shadow} from '../../utils/styles';
import {LazyList, ListItem, ListLabel, Icon, IconButton, Avatar} from '../ui';
import {curried, formatDuration} from '../../utils/common';

export default class FeedPlaylist extends Component {

  static propTypes = {
    compact: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onToggleShuffle: PropTypes.func.isRequired,
    tracks: PropTypes.array.isRequired,
    currentTrackId: PropTypes.string,
  };

  static defaultProps = {
    compact: false,
    currentTrackId: null,
    isShuffle: false,
  };

  render() {
    const {tracks} = this.props;
    const styles = this.getStyles();

    if (tracks.length === 0) {
      return <div style={styles.container}>
        <div style={styles.emptyMessage}>
          <Icon size={64} style={styles.emptyIcon}>headset</Icon>
          <h2>Playlist is empty</h2>
          <span>Choose any channel to begin</span>
        </div>
      </div>;
    }

    return <div style={styles.container} ref="container">
      <ListLabel
        text={`${tracks.length} tracks`}
        rightElement={this._renderShuffleButton(styles)} />
      <LazyList
        container={this.refs.container}
        items={tracks}
        renderItem={curried(::this._renderTrack, styles)}
        itemHeight={56}
        updateDelay={10}
        itemsBuffer={10}
        style={styles.tracks} />
    </div>;
  }

  _renderTrack(styles, track) {
    const {onSelect, currentTrackId} = this.props;
    const hasError = track.hasOwnProperty('error');
    const isCurrent = currentTrackId === track.id;

    return <ListItem
      key={track.id}
      leftElement={
        hasError
        ? <Icon style={styles.errorIcon} size={24}>error</Icon>
        : (
          isCurrent
          ? <Icon style={styles.currentIcon} size={24}>play_arrow</Icon>
          : null
        )
      }
      rightElement={
        track.channelImage
        ? <Avatar url={track.channelImage} style={styles.channelAvatar} size={24} />
        : null
      }
      rightElementHeight={24}
      style={
        hasError
        ? styles.errorTrack
        : (
          isCurrent
          ? styles.currentTrack
          : styles.track
        )
      }
      leftElementHeight={24}
      primaryText={this._renderTrackName(track, hasError, styles)}
      onClick={curried(onSelect, track.id) } />;
  }

  _renderTrackName(track, hasError, styles) {
    return <span>
      {track.title}
      <span style={hasError ? null : styles.artist}>
        {track.artist ? ` by ${track.artist}` : null}
      </span>
      <span style={styles.duration}>{formatDuration(track.duration)}</span>
    </span>;
  }

  _renderShuffleButton(styles) {
    return <IconButton
      style={styles.shuffle}
      size={24}
      onClick={this.props.onToggleShuffle}>
      shuffle
    </IconButton>;
  }

  getStyles() {
    const {isShuffle} = this.props;

    return {

      container: {
        flexGrow: 2,
        paddingBottom: 32,
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
        padding: '0 16px 48px 16px',
      },

      tracks: {
        boxShadow: shadow(20),
        backgroundColor: '#fff',
      },

      track: {
        transition: 'background-color .1s ease-out',
      },

      currentTrack: {
        backgroundColor: 'rgba(0, 0, 0, .08)',
      },

      errorTrack: {
        color: colors.error,
      },

      artist: {
        color: colors.secondaryText,
      },

      duration: {
        color: colors.secondaryText,
        fontSize: 14,
        display: 'inline-block',
        position: 'absolute',
        right: 56,
      },

      currentIcon: {
        color: colors.secondaryText,
      },

      errorIcon: {
        color: colors.error,
      },

      shuffle: {
        color: isShuffle ? colors.primaryText : colors.secondaryText,
      },

      channelAvatar: {
        opacity: .5,
      },

      emptyMessage: {
        textAlign: 'center',
        paddingTop: 64,
        color: colors.secondaryText,
      },

      emptyIcon: {
        color: colors.secondaryText,
      },

    };
  }
}
