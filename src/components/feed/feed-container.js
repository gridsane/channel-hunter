import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {IconButton} from '../ui';
import FeedChannels from './feed-channels';
import FeedPlaylist from './feed-playlist';
import {
  setChannelEnabled,
  setTracksSort,
  setCurrentTrack,
  refreshFeedChannels,
} from '../../actions/feed';
import {
  getTrackById,
  getSortedPlaylist,
} from '../../reducers/feed';
import styles from './feed.scss';

export class Feed extends Component {
  render() {
    const {channels, currentTrack, playlist, isShuffle, isChannelsLoading} = this.props;

    return <section className={styles.feed}>
      <aside className={styles.feedSidebar}>
        <FeedChannels
          className={styles.feedChannels}
          list={channels}
          isRefreshing={isChannelsLoading}
          onToggle={this._toggleChannel}
          onRefresh={this._refreshChannels}
          onGotoDiscover={this._gotoDiscover} />

        <div className={styles.feedNav}>
          <IconButton
            glyph="search"
            className={styles.feedNavButton}
            size={24}
            boxSize={48}
            onClick={this._gotoDiscover} />
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

  _gotoDiscover = () => {
    this.props.dispatch(push('/app/discover'));
  }

  _refreshChannels = () => {
    this.props.dispatch(refreshFeedChannels(this.props.channels));
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
    isChannelsLoading: feed.isChannelsLoading,
    isShuffle: feed.tracksSort.prop === '_seed',
    playlist: getSortedPlaylist(feed).map((t) => {
      return {...t, channelImage: channelsById[t.channelId].image};
    }),
  };
}

export default connect(mapToProps)(Feed);
