import React, {Component, PropTypes} from 'react';
import {LazyList, ListLabel, Icon, IconButton} from '../ui';
import cn from 'classnames';
import Track from './feed-playlist-track';
import styles from './feed.scss';

export default class FeedPlaylist extends Component {

  static propTypes = {
    tracks: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onToggleShuffle: PropTypes.func.isRequired,
    currentTrackId: PropTypes.string,
    isShuffle: PropTypes.bool,
  }

  static defaultProps = {
    currentTrackId: null,
    isShuffle: false,
  }

  render() {
    const {tracks} = this.props;

    if (tracks.length === 0) {
      return <div className={styles.playlist}>
        <div className={styles.playlistEmpty}>
          <Icon size={64} glyph="headset" />
          <h2>Playlist is empty</h2>
          <span>Choose any channel to begin</span>
        </div>
      </div>;
    }

    return <div className={styles.playlist} ref="container">
      <ListLabel
        text={`${tracks.length} tracks`}
        rightElement={this._renderShuffleButton()} />
      <LazyList
        container={this.refs.container}
        items={tracks}
        renderItem={this._renderTrack}
        itemHeight={56}
        updateDelay={10}
        itemsBuffer={10}
        className={styles.playlistTracks} />
    </div>;
  }

  _renderTrack = (track) => {
    return <Track
      {...track}
      key={track.id}
      onClick={this.props.onSelect}
      isCurrent={this.props.currentTrackId === track.id} />;
  }

  _renderShuffleButton() {
    return <IconButton
      glyph="shuffle"
      onClick={this.props.onToggleShuffle}
      size={24}
      className={cn(styles.playlistShuffle, {
        [styles.playlistShuffleActive]: this.props.isShuffle,
      })}/>;
  }
}
