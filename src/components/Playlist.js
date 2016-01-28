import React, {Component, PropTypes} from 'react';
import {colors, shadow} from '../utils/styles';
import {LazyList, ListItem, ListLabel, Icon, IconButton, Avatar} from './common';
import {curried} from '../utils/common';

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
    const styles = this.getStyles();

    return <div style={styles.container}>
      <ListLabel
        text={`${this.props.list.length} tracks`}
        rightElement={this._renderShuffleButton(styles)} />
      <LazyList
        items={this.props.list}
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
    const marginLeft = compact ? '16px' : '336px';

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

    };
  }
}
