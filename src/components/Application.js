import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectItem, togglePlaying} from '../actions/playlist';
import {toggleChannel} from '../actions/channels';
import AppNavigation from './AppNavigation';
import CoverAppBar from './CoverAppBar';
import Controls from './Controls';
import Channels from './Channels';
import Playlist from './Playlist';

@connect((state) => {
  const {channels, playlist} = state;

  return {
    selectedTrackId: playlist.selected ? playlist.selected.id : null,
    coverUrl: playlist.selected ? playlist.selected.cover : null,
    channels,
    playlist,
    tracks: playlist.items.filter((track) => {
      return channels.picked.indexOf(track.channelId) !== -1;
    }),
  };
})
export default class Application extends Component {
  state = {
    isSmallScreen: false,
    isNavOpen: true,
    isNavDocked: true,
  };

  render() {
    const {isSmallScreen, isNavOpen, isNavDocked} = this.state;
    const {playlist, channels, tracks, selectedTrackId, coverUrl} = this.props;

    return <div>
      <AppNavigation open={isNavOpen} docked={isNavDocked}>
        <Channels
          list={channels.items}
          picked={channels.picked}
          onToggle={::this._toggleChannel} />
      </AppNavigation>

      <CoverAppBar compact={isSmallScreen} coverUrl={coverUrl}>
        <Controls
          track={playlist.selected}
          isPlaying={playlist.isPlaying}
          onToggle={::this._togglePlaying}
          onNext={::this._nextTrack} />
      </CoverAppBar>

      <Playlist
        compact={isSmallScreen}
        selectedId={selectedTrackId}
        list={tracks}
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
    console.warn('nextTrack is not implemented yet');
  }

  _selectTrack(trackId) {
    const selectedTrack = this.props.tracks.find((track) => {
      return trackId === track.id;
    });

    this.props.dispatch(selectItem(selectedTrack));
  }

}
