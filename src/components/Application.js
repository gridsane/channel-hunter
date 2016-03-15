import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  selectTrack,
  togglePlaying,
  loadChannelItems,
  setTracksSort,
  setTrackError,
} from '../actions/tracks';
import {setChannelEnabled} from '../actions/channels';
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
  };

  render() {
    const {isSmallScreen, isNavOpen, isNavDocked} = this.state;
    const {playlist, isShuffle, channels, tracks, selectedTrack, coverUrl} = this.props;

    return <div>
      <AppNavigation open={isNavOpen} docked={isNavDocked}>
        <Channels
          list={channels.items}
          onToggle={::this._toggleChannel} />
      </AppNavigation>

      <CoverAppBar compact={isSmallScreen} coverUrl={coverUrl}>
        <Controls
          hidden={playlist.length === 0}
          track={selectedTrack}
          isPlaying={tracks.isPlaying}
          onToggle={::this._togglePlaying}
          onError={::this._trackError}
          onNext={::this._nextTrack} />
      </CoverAppBar>

      <Playlist
        compact={isSmallScreen}
        selectedId={tracks.selected}
        list={playlist}
        isShuffle={isShuffle}
        onSelect={::this._selectTrack}
        onToggleShuffle={::this._toggleShuffle} />
    </div>;
  }

  componentWillMount() {
    this._updateNavigationMode();
    window.addEventListener('resize', ::this._updateNavigationMode);
  }

  componentDidMount() {
    this.props.channels.items.forEach((channel) => {
      if (channel.isEnabled) {
        this.props.dispatch(loadChannelItems(channel.source, channel.id));
      }
    });
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

  _toggleChannel(channel) {
    this.props.dispatch(setChannelEnabled(channel, !channel.isEnabled));
  }

  _togglePlaying(isPlaying) {
    if (!this.props.tracks.selected) {
      this._nextTrack();
    }

    this.props.dispatch(togglePlaying(isPlaying));
  }

  _toggleShuffle() {
    this.props.dispatch(setTracksSort(this.props.isShuffle ? 'date' : '_seed', 'desc'));
  }

  _nextTrack() {
    const {tracks, playlist} = this.props;

    let index = -1;
    playlist.find((track, i) => {
      if (track.id === tracks.selected) {
        index = i;
        return true;
      }
    });

    const nextIndex = index + 1;
    if (nextIndex > playlist.length - 1) {
      this.props.dispatch(togglePlaying(false));
    } else {
      this.props.dispatch(selectTrack(playlist[nextIndex].id));
    }

  }

  _selectTrack(trackId) {
    this.props.dispatch(selectTrack(trackId));
  }

  _trackError(error) {
    const {tracks, dispatch} = this.props;

    if (tracks.selected !== null) {
      dispatch(setTrackError(tracks.selected, error));
      this._nextTrack();
    }
  }

}

export function mapToProps(state) {
  const {channels, tracks} = state;
  const selectedTrack = tracks.selected !== null
    ? tracks.items.find((item) => item.id === tracks.selected)
    : null;

  const enabledChannels = channels.items
    .filter((item) => item.isEnabled);
  const channelsIds = enabledChannels.map((item) => item.id);
  let channelsData = [];
  enabledChannels.forEach((channel) => {
    channelsData[channel.id] = channel;
  });

  const playlist = tracks.items
    .filter((item) => -1 !== channelsIds.indexOf(item.channelId))
    .map((item) => Object.assign(item, {
      channelImage: channelsData[item.channelId].image,
    }));

  if (tracks.sort && tracks.sort.attr) {
    const {attr, dir} = tracks.sort;
    playlist.sort((a, b) => {
      return dir === 'asc' ? a[attr] - b[attr] : b[attr] - a[attr];
    });
  }

  return {
    selectedTrack,
    channels,
    tracks,
    playlist,
    isShuffle: tracks.sort.attr === '_seed',
    coverUrl: selectedTrack ? selectedTrack.cover : null,
  };
}

export default connect(mapToProps)(Application);
