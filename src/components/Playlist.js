import React, {Component, PropTypes} from 'react';
import {colors, shadow} from '../utils/styles';
import {LazyList, ListItem, ListLabel, Icon, IconButton, Avatar} from './common';
import {curried, formatDuration} from '../utils/common';

export default class Playlist extends Component {

  static propTypes = {
    compact: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onToggleShuffle: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
  };

  static defaultProps = {
    compact: false,
    selectedId: null,
    isShuffle: false,
  };

  render() {
    const {list} = this.props;
    const styles = this.getStyles();

    if (list.length === 0) {
      return <div style={styles.container}>
        <div style={styles.emptyMessage}>
          <Icon size={64} style={styles.emptyIcon}>headset</Icon>
          <h2>Playlist is empty</h2>
          <span>Choose any channel to begin</span>
        </div>
      </div>;
    }

    return <div style={styles.container}>
      <ListLabel
        text={`${list.length} tracks`}
        rightElement={this._renderShuffleButton(styles)} />
      <LazyList
        items={list}
        renderItem={curried(::this._renderTrack, styles)}
        itemHeight={56}
        updateDelay={40}
        itemsBuffer={20}
        style={styles.list} />
    </div>;
  }

  _renderTrack(styles, track) {
    const {onSelect, selectedId} = this.props;
    const hasError = track.hasOwnProperty('error');
    const isCurrent = selectedId === track.id;

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
        {` by ${track.artist}`}
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
    const {compact, isShuffle} = this.props;
    const marginLeft = compact ? '16px' : '296px';

    return {

      container: {
        margin: `68px 16px 64px ${marginLeft}`,
      },

      list: {
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
