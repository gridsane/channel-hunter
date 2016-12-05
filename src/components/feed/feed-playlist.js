import React, {Component, PropTypes} from 'react';
import {LazyList, ListLabel, IconButton, EmptyState, FlatButton} from '../ui';
import cn from 'classnames';
import Track from './feed-playlist-track';
import styles from './feed.scss';

export default class FeedPlaylist extends Component {

  static propTypes = {
    tracks: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onToggleShuffle: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
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
      return <EmptyState
          className={styles.playlist}
          glyph="headset"
          primaryText="Playlist is empty"
          secondaryText="Choose any channel to get started" />;
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

      <FlatButton
        primary
        label="Load more"
        onClick={this.props.onLoadMore}
        className={styles.loadMore}/>
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
