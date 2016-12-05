import React, {Component} from 'react';
import {connect} from 'react-redux';
import FeedPlaylist from './feed-playlist';
import {
  setTracksSort,
  setCurrentTrack,
  loadMoreTracks,
} from '../../actions/feed';
import {
  getTrackById,
  getSortedPlaylist,
} from '../../reducers/feed';

export class Feed extends Component {
  render() {
    const {currentTrack, playlist, isShuffle} = this.props;

    return <FeedPlaylist
      currentTrackId={currentTrack ? currentTrack.id : null}
      tracks={playlist}
      isShuffle={isShuffle}
      onSelect={this._selectTrack}
      onToggleShuffle={this._toggleShuffle}
      onLoadMore={this._loadMore} />;
  }

  _toggleShuffle = () => {
    this.props.dispatch(setTracksSort(this.props.isShuffle ? 'date' : '_seed', 'desc'));
  }

  _selectTrack = (trackId) => {
    this.props.dispatch(setCurrentTrack(trackId));
  }

  _loadMore = () => {
    this.props.dispatch(loadMoreTracks());
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
    isShuffle: feed.tracksSort.prop === '_seed',
    playlist: getSortedPlaylist(feed).map((t) => {
      return {...t, channelImage: channelsById[t.channelId].image};
    }),
  };
}

export default connect(mapToProps)(Feed);
