import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectItem, togglePlaying} from '../actions/tracks';
import {toggleChannel} from '../actions/channels';
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
    const {playlist, channels, tracks, selectedTrack, coverUrl} = this.props;

    return <div>
      <AppNavigation open={isNavOpen} docked={isNavDocked}>
        <Channels
          list={channels.items}
          onToggle={::this._toggleChannel} />
      </AppNavigation>

      <CoverAppBar compact={isSmallScreen} coverUrl={coverUrl}>
        <Controls
          track={selectedTrack}
          isPlaying={tracks.isPlaying}
          onToggle={::this._togglePlaying}
          onNext={::this._nextTrack} />
      </CoverAppBar>

      <Playlist
        compact={isSmallScreen}
        selectedId={tracks.selected}
        list={playlist}
        onSelect={::this._selectTrack} />
    </div>;
  }

  componentWillMount() {
    this._updateNavigationMode();
    window.addEventListener('resize', ::this._updateNavigationMode);
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
    this.props.dispatch(toggleChannel(channel.id));
  }

  _togglePlaying(isPlaying) {
    this.props.dispatch(togglePlaying(isPlaying));
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
      this.props.dispatch(selectItem(playlist[nextIndex].id));
    }

  }

  _selectTrack(trackId) {
    this.props.dispatch(selectItem(trackId));
  }

}

export function mapToProps(state) {
  const {channels, tracks} = state;
  const selectedTrack = tracks.selected ? tracks.items[tracks.selected] : null;
  const channelsIds = channels.items
    .filter((item) => item.isEnabled)
    .map((item) => item.id);

  const playlist = tracks.items
    .filter((item) => -1 !== channelsIds.indexOf(item.channelId));

  return {
    selectedTrack,
    channels,
    tracks,
    playlist,
    coverUrl: selectedTrack ? selectedTrack.cover : null,
  };
}

export default connect(mapToProps)(Application);
