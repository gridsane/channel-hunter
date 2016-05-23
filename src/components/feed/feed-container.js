import React, {Component} from 'react';
import {connect} from 'react-redux';
import {IconButton} from '../ui';
import FeedChannels from './feed-channels';
import FeedPlaylist from './feed-playlist';
import {
  setChannelEnabled,
  setTracksSort,
  setCurrentTrack,
} from '../../actions/feed';
import {
  getTrackById,
  getSortedPlaylist,
} from '../../reducers/feed';
import styles from './feed.scss';

export class Feed extends Component {
  render() {
    const {channels, currentTrack, playlist, isShuffle} = this.props;

    return <section className={styles.feed}>
      <aside className={styles.feedSidebar}>
        <FeedChannels
          className={styles.feedChannels}
          list={channels}
          onToggle={this._toggleChannel} />
        <div className={styles.feedNav}>
          <IconButton
            glyph="playlist_add"
            className={styles.feedNavButton}
            size={24}
            boxSize={48}
            onClick={()=>null} />
          <IconButton
            glyph="bookmark_border"
            className={styles.feedNavButton}
            size={24}
            boxSize={48}
            onClick={()=>null} />
          <IconButton
            glyph="code"
            className={styles.feedNavButton}
            size={24}
            boxSize={48}
            onClick={()=>null} />
        </div>
      </aside>

      <FeedPlaylist
        currentTrackId={currentTrack ? currentTrack.id : null}
        tracks={playlist}
        isShuffle={isShuffle}
        onSelect={this._selectTrack}
        onToggleShuffle={this._toggleShuffle} />
    </section>;
  }

  _toggleChannel = (channel) => {
    this.props.dispatch(setChannelEnabled(channel, !channel.isEnabled));
  }

  _toggleShuffle = () => {
    this.props.dispatch(setTracksSort(this.props.isShuffle ? 'date' : '_seed', 'desc'));
  }

  _selectTrack = (trackId) => {
    this.props.dispatch(setCurrentTrack(trackId));
  }

}

export function mapToProps(state) {
  const {feed} = state;
  const channelsById = feed.channels.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

  return {
    currentTrack: getTrackById(feed, feed.currentTrackId),
    channels: feed.channels,
    isShuffle: feed.tracksSort.prop === '_seed',
    playlist: getSortedPlaylist(feed).map((t) => {
      return {...t, channelImage: channelsById[t.channelId].image};
    }),
  };
}

export default connect(mapToProps)(Feed);
