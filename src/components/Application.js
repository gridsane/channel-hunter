import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  setChannelEnabled,
  selectNextTrack,
  setTracksSort,
  refetchTrackOrError,
  setCurrentTrack,
} from '../actions/feed';
import {
  getTrackById,
  getSortedPlaylist,
} from '../reducers/feed';
import AppNavigation from './AppNavigation';
import CoverAppBar from './CoverAppBar';
import Controls from './Controls';
import Channels from './Channels';
import Playlist from './Playlist';

export class Application extends Component {
  state = {
    isSmallScreen: false,
    isNavOpen: true,
    isNavDocked: true,
    isPlaying: false,
  };

  render() {
    const {isPlaying, isSmallScreen, isNavOpen, isNavDocked} = this.state;
    const {channels, currentTrack, playlist, isShuffle} = this.props;

    return <div>
      <AppNavigation open={isNavOpen} docked={isNavDocked}>
        <Channels
          list={channels}
          onToggle={::this._toggleChannel} />
      </AppNavigation>

      <CoverAppBar compact={isSmallScreen} coverUrl={currentTrack ? currentTrack.cover : null}>
        <Controls
          isPlaying={isPlaying}
          track={currentTrack}
          onTogglePlay={::this._togglePlaying}
          onError={::this._trackError}
          onNext={::this._nextTrack}
          style={{display: playlist.length || currentTrack ? null : 'none'}} />
      </CoverAppBar>

      <Playlist
        compact={isSmallScreen}
        currentTrackId={currentTrack ? currentTrack.id : null}
        tracks={playlist}
        isShuffle={isShuffle}
        onSelect={::this._selectTrack}
        onToggleShuffle={::this._toggleShuffle} />
    </div>;
  }

  componentWillMount() {
    this._updateNavigationMode();
    window.addEventListener('resize', ::this._updateNavigationMode);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentTrack === null && nextProps.currentTrack !== null) {
      this.setState({isPlaying: true});
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this._updateNavigationMode);
  }

  _updateNavigationMode() {
    const isSmallScreen = window.innerWidth < 960;

    if (this.state.isSmallScreen !== isSmallScreen) {
      this.setState({
        isSmallScreen: isSmallScreen,
        isNavDocked: !isSmallScreen,
        isNavOpen: !isSmallScreen,
      });
    }
  }

  _nextTrack() {
    this.props.dispatch(selectNextTrack());
  }

  _toggleChannel(channel) {
    this.props.dispatch(setChannelEnabled(channel, !channel.isEnabled));
  }

  _togglePlaying() {
    this.setState({isPlaying: !this.state.isPlaying});
  }

  _toggleShuffle() {
    this.props.dispatch(setTracksSort(this.props.isShuffle ? 'date' : '_seed', 'desc'));
  }

  _selectTrack(trackId) {
    this.props.dispatch(setCurrentTrack(trackId));
  }

  _trackError(error) {
    const {currentTrack, dispatch} = this.props;
    dispatch(refetchTrackOrError(currentTrack, error));
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

export default connect(mapToProps)(Application);
