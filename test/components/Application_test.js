import React from 'react';
import {Application, mapToProps} from '../../src/components/Application';
import Controls from '../../src/components/Controls';
import Channels from '../../src/components/Channels';
import Playlist from '../../src/components/Playlist';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender} from '../utils';
import {selectTrack, togglePlaying} from '../../src/actions/tracks';
import * as channelsActions from '../../src/actions/channels';

describe('Application component', () => {

  it('selects next item', () => {

    let dispatch = expect.createSpy();

    const controls = getControls(shallowRenderApp(dispatch, '10'));
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(selectTrack('20'));

  });

  it('selects first item as next if there are no selected', () => {

    let dispatch = expect.createSpy();

    const controls = getControls(shallowRenderApp(dispatch, null));
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(selectTrack('10'));

  });

  it('stops playing if next track is out of bounds', () => {

    let dispatch = expect.createSpy();

    const controls = getControls(shallowRenderApp(dispatch, '30'));
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(togglePlaying(false));

  });

  it('dispatches togglePlaying action', () => {

    let dispatch, controls;

    dispatch = expect.createSpy();
    controls = getControls(shallowRenderApp(dispatch));
    controls.props.onToggle(true);

    expect(dispatch.calls[0].arguments[0]).toEqual(togglePlaying(true));

    dispatch = expect.createSpy();
    controls = getControls(shallowRenderApp(dispatch));
    controls.props.onToggle(false);

    expect(dispatch.calls[0].arguments[0]).toEqual(togglePlaying(false));

  });

  it('enables channel', () => {

    let dispatch = expect.createSpy();
    let channels = getChannels(shallowRenderApp(dispatch));

    expect.spyOn(channelsActions, 'setChannelEnabled').andCall(function (...args) {
      return args;
    });

    expect(channels.props.list).toEqual([
      {id: 1, name: 'foo', isEnabled: true},
      {id: 2, name: 'bar', isEnabled: false},
    ]);

    channels.props.onToggle({id: 1, isEnabled: true});

    expect(dispatch.calls[0].arguments[0]).toEqual(
      channelsActions.setChannelEnabled({id: 1, isEnabled: true}, false)
    );

  });

  it('passes playlist for enabled channels', () => {

    let playlist = getPlaylist(shallowRenderApp());

    expect(playlist.props.list).toEqual([
      {id: '10', channelId: 1},
      {id: '20', channelId: 1},
      {id: '30', channelId: 1},
    ]);

  });

  it('maps tracks from enabled channels only', () => {

    const props = mapToProps({
      channels: {items: [
        {id: 1, name: 'foo', isEnabled: true},
        {id: 2, name: 'bar', isEnabled: false},
      ]},
      tracks: {
        items: [
          {id: 10, channelId: 1},
          {id: 20, channelId: 2},
        ],
      },
    });

    expect(props.playlist).toEqual([
      {id: 10, channelId: 1},
    ]);

  });

  it('maps selected track', () => {

    const props = mapToProps({
      channels: {items: []},
      tracks: {
        selected: 20,
        items: [
          {id: 10, channelId: 1},
          {id: 20, channelId: 2},
        ],
      },
    });

    expect(props.selectedTrack).toEqual({id: 20, channelId: 2});

  });

  function shallowRenderApp(dispatch = () => null, selected = null) {
    const props = {
      selectedTrack: null,
      channels: {items: [
        {id: 1, name: 'foo', isEnabled: true},
        {id: 2, name: 'bar', isEnabled: false},
      ]},
      tracks: {
        selected,
        isPlaying: false,
        isLoading: false,
        items: [
          {id: '10', channelId: 1},
          {id: '20', channelId: 1},
          {id: '30', channelId: 1},
          {id: '40', channelId: 2},
        ],
      },
      playlist: [
        {id: '10', channelId: 1},
        {id: '20', channelId: 1},
        {id: '30', channelId: 1},
      ],
      coverUrl: null,
      dispatch,
    };

    const tree = shallowRender(<Application {...props} />);

    return tree;
  }

  function getControls(tree) {
    return ShallowTestUtils.findWithType(tree, Controls);
  }

  function getChannels(tree) {
    return ShallowTestUtils.findWithType(tree, Channels);
  }

  function getPlaylist(tree) {
    return ShallowTestUtils.findWithType(tree, Playlist);
  }

});
