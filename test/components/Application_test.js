import React from 'react';
import {Application, mapToProps} from '../../src/components/Application';
import Channels from '../../src/components/Channels';
import Controls from '../../src/components/Controls';
import CoverAppBar from '../../src/components/CoverAppBar';
import Playlist from '../../src/components/Playlist';
import {findWithType, getMountedInstance} from 'react-shallow-testutils';
import {shallowRender, getShallowRenderer} from '../utils';
import * as actions from '../../src/actions/feed';

describe('Application component', () => {

  it('maps playlist and channels from the state', () => {
    const state = {
      feed: {
        channels: [
          {id: 1, isEnabled: true, image: 'image1'},
          {id: 2, isEnabled: false, image: 'image2'},
        ],
        tracks: [
          {id: 1, date: 1, channelId: 1},
          {id: 2, date: 2, channelId: 1},
          {id: 3, date: 3, channelId: 2},
        ],
        tracksSort: {prop: 'date', dir: 'desc'},
      },
    };

    const props = mapToProps(state);

    expect(props.playlist.length).toBe(2);
    expect(props.playlist[0].id).toBe(2);
    expect(props.playlist[0].channelImage).toBe('image1');
    expect(props.playlist[1].id).toBe(1);
    expect(props.playlist[1].channelImage).toBe('image1');

    expect(props.channels).toEqual(state.feed.channels);
  });

  it('maps current track from the state', () => {
    const props = mapToProps({
      feed: {
        currentTrackId: 2,
        channels: [
          {id: 1, isEnabled: true},
        ],
        tracks: [
          {id: 1, date: 1, channelId: 1},
          {id: 2, date: 2, channelId: 1},
        ],
        tracksSort: {prop: 'date', dir: 'desc'},
      },
    });

    expect(props.currentTrack).toEqual({id: 2, date: 2, channelId: 1});
  });

  it('maps is playlist shuffled from the state', () => {
    expect(mapToProps({feed: {
      channels: [],
      tracks: [],
      tracksSort: {prop: '_seed', dir: 'asc'},
    }}).isShuffle).toBe(true);

    expect(mapToProps({feed: {
      channels: [],
      tracks: [],
      tracksSort: {prop: 'date', dir: 'asc'},
    }}).isShuffle).toBe(false);
  });

  it('toggles channels', () => {
    const dispatch = expect.createSpy();
    const channels = getChannels(shallowRenderApp({dispatch}));
    expect.spyOn(actions, 'setChannelEnabled').andCall((...args) => args);

    channels.props.onToggle({id: '11', isEnabled: true});

    expect(channels.props.list).toEqual(defaultProps.channels);
    expect(dispatch.calls[0].arguments[0]).toEqual(
      actions.setChannelEnabled({id: '11', isEnabled: true}, false)
    );
  });

  it('selects next track', () => {
    const dispatch = expect.createSpy();
    const controls = getControls(shallowRenderApp({dispatch}));
    controls.props.onNext();
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.selectNextTrack());
  });

  it('passes props to the playlist', () => {
    const playlist = getPlaylist(shallowRenderApp({currentTrack: {id: '10'}}));
    expect(playlist.props.tracks).toEqual(defaultProps.playlist);
    expect(playlist.props.isShuffle).toBe(defaultProps.isShuffle);
    expect(playlist.props.currentTrackId).toBe('10');
  });

  it('selects track', () => {
    const dispatch = expect.createSpy();
    const playlist = getPlaylist(shallowRenderApp({dispatch}));
    playlist.props.onSelect('20');
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setCurrentTrack('20'));
  });

  it('disables shuffle', () => {
    const dispatch = expect.createSpy();
    const playlist = getPlaylist(shallowRenderApp({dispatch}));
    playlist.props.onToggleShuffle();
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setTracksSort('_seed', 'desc'));
  });

  it('enables shuffle', () => {
    const dispatch = expect.createSpy();
    const playlist = getPlaylist(shallowRenderApp({dispatch, isShuffle: true}));
    playlist.props.onToggleShuffle();
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setTracksSort('date', 'desc'));
  });

  it('toggles playling', () => {
    const renderer = getShallowRenderer(<Application {...defaultProps} />);
    let controls = getControls(renderer.getRenderOutput());
    expect(controls.props.isPlaying).toBe(false);

    controls.props.onTogglePlay();

    controls = getControls(renderer.getRenderOutput());
    expect(controls.props.isPlaying).toBe(true);

    controls.props.onTogglePlay();

    expect(getControls(renderer.getRenderOutput()).props.isPlaying).toBe(false);
  });

  it('sets error to current track', () => {
    const dispatch = expect.createSpy();
    const currentTrack = defaultProps.playlist[0];
    const controls = getControls(shallowRenderApp({dispatch, currentTrack}));
    controls.props.onError('error text');
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.refetchTrackOrError(currentTrack, 'error text'));
  });

  it('does not hide controls if playlist is not empty', () => {
    const controls = getControls(shallowRenderApp());
    expect(controls.props.style.display).toNotBe('none');
  });

  it('hides controls if playlist is empty', () => {
    const controls = getControls(shallowRenderApp({playlist: []}));
    expect(controls.props.style.display).toBe('none');
  });

  it('starts playing when current track selected in a first time', () => {
    const renderer = getShallowRenderer(<Application {...defaultProps} />);
    getMountedInstance(renderer).componentWillReceiveProps({...defaultProps, ...{
      currentTrack: {id: '20', channelId: '11'},
    }});

    const controls = getControls(renderer.getRenderOutput());
    expect(controls.props.isPlaying).toBe(true);
  });

  it('does not start playing when current track changed', () => {
    const renderer = getShallowRenderer(<Application {...{...defaultProps, ...{
      currentTrack: {id: '10', channelId: '11'},
    }}} />);
    getMountedInstance(renderer).componentWillReceiveProps({...defaultProps, ...{
      currentTrack: {id: '20', channelId: '11'},
    }});

    const controls = getControls(renderer.getRenderOutput());
    expect(controls.props.isPlaying).toBe(false);
  });

  it('sets cover from current track', () => {
    const appBarWithoutCover = getAppBar(shallowRenderApp());
    expect(appBarWithoutCover.props.coverUrl).toBe(null);

    const appBarWithCover = getAppBar(shallowRenderApp({currentTrack: {id: '10', cover: 'coverImage'}}));
    expect(appBarWithCover.props.coverUrl).toBe('coverImage');
  });

  const defaultProps = {
    dispatch: () => null,
    currentTrack: null,
    playlist: [
      {id: '10', channelId: '11'},
      {id: '20', channelId: '11'},
      {id: '30', channelId: '22'},
    ],
    channels: [
      {id: '11', name: 'foo', isEnabled: true},
      {id: '22', name: 'bar', isEnabled: true},
      {id: '33', name: 'baz', isEnabled: false},
    ],
    isShuffle: false,
  };

  function shallowRenderApp(props) {
    const tree = shallowRender(<Application {...{
      ...defaultProps,
      ...props,
    }} />);

    return tree;
  }

  function getChannels(tree) {
    return findWithType(tree, Channels);
  }

  function getControls(tree) {
    return findWithType(tree, Controls);
  }

  function getPlaylist(tree) {
    return findWithType(tree, Playlist);
  }

  function getAppBar(tree) {
    return findWithType(tree, CoverAppBar);
  }

});
