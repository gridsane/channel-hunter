import React, {Component} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {colors} from '../../utils/styles';
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

@Radium
export class Feed extends Component {
  render() {
    const {channels, currentTrack, playlist, isShuffle} = this.props;

    return <section style={styles.container}>
      <aside style={styles.sidebar}>
        <FeedChannels
          style={styles.channels}
          list={channels}
          onToggle={::this._toggleChannel} />
        <div style={styles.sidebarNav}>
          <IconButton
            glyph="playlist_add"
            style={styles.navButton}
            size={24}
            boxSize={48}
            onClick={()=>null} />
          <IconButton
            glyph="bookmark_border"
            style={styles.navButton}
            size={24}
            boxSize={48}
            onClick={()=>null} />
          <IconButton
            glyph="code"
            style={styles.navButton}
            size={24}
            boxSize={48}
            onClick={()=>null} />
        </div>
      </aside>

      <FeedPlaylist
        currentTrackId={currentTrack ? currentTrack.id : null}
        tracks={playlist}
        isShuffle={isShuffle}
        onSelect={::this._selectTrack}
        onToggleShuffle={::this._toggleShuffle} />
    </section>;
  }

  _toggleChannel(channel) {
    this.props.dispatch(setChannelEnabled(channel, !channel.isEnabled));
  }

  _toggleShuffle() {
    this.props.dispatch(setTracksSort(this.props.isShuffle ? 'date' : '_seed', 'desc'));
  }

  _selectTrack(trackId) {
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

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 'calc(100vh - 60px)',
  },
  sidebar: {
    position: 'relative',
    minWidth: 280,
    maxWidth: 280,
    height: '100%',
    boxSizing: 'border-box',
    overflowY: 'hidden',
  },
  channels: {
    height: 'calc(100% - 54px)',
    overflowY: 'auto',
  },
  sidebarNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 54,
    borderTop: `1px solid rgba(0, 0, 0, .1)`,
    display: 'flex',
    alignItems: 'stretch',
  },
  navButton: {
    flexGrow: 1,
    color: colors.primaryText,
    position: 'relative',
    borderRadius: 0,
  },
};
