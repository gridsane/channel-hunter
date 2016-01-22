import React from 'react';
import {Application, mapToProps} from '../../src/components/Application';
import Controls from '../../src/components/Controls';
import Channels from '../../src/components/Channels';
import Playlist from '../../src/components/Playlist';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender} from '../utils';
import {selectTrack, togglePlaying, setTrackError} from '../../src/actions/tracks';
import * as channelsActions from '../../src/actions/channels';

describe('Application component', () => {

  it('selects next item', () => {

    let dispatch = expect.createSpy();

    const controls = getControls(shallowRenderApp(dispatch, '20'));
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(selectTrack('30'));

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
        {id: 1, name: 'foo', isEnabled: true, image: "//image/1"},
        {id: 2, name: 'bar', isEnabled: false, image: "//image/2"},
      ]},
      tracks: {
        sort: {attr: 'date', dir: 'desc'},
        items: [
          {id: 10, channelId: 1},
          {id: 20, channelId: 2},
        ],
      },
    });

    expect(props.playlist).toEqual([
      {id: 10, channelImage: '//image/1', channelId: 1},
    ]);

  });

  it('maps selected track', () => {

    const props = mapToProps({
      channels: {items: []},
      tracks: {
        selected: 20,
        sort: {attr: 'date', dir: 'desc'},
        items: [
          {id: 10, channelId: 1},
          {id: 20, channelId: 2},
        ],
      },
    });

    expect(props.selectedTrack).toEqual({id: 20, channelId: 2});

  });

  it('sorts playlist', () => {

    [
      {attr: 'date', dir: 'asc', expected: [50, 20, 10, 30, 40]},
      {attr: 'date', dir: 'desc', expected: [40, 30, 10, 20, 50]},
    ].forEach((testCase, index) => {
      const props = mapToProps({
        channels: {items: [
          {id: 1, name: 'foo', isEnabled: true},
        ]},
        tracks: {
          sort: {attr: testCase.attr, dir: testCase.dir},
          items: [
            {id: 10, channelId: 1, date: 2},
            {id: 20, channelId: 1, date: 1},
            {id: 30, channelId: 1, date: 3},
            {id: 40, channelId: 1, date: 8},
            {id: 50, channelId: 1, date: 0},
          ],
        },
      });

      expect(props.playlist.map((i) => i.id)).toEqual(testCase.expected, `TestCase #${index}`);

    });
  });

  it('toggles track error and selects next track', () => {

    const dispatch = expect.createSpy();
    const controls = getControls(shallowRenderApp(dispatch, '10'));

    controls.props.onError('error text');

    expect(dispatch.calls.length).toBe(2);
    expect(dispatch.calls[0].arguments[0]).toEqual(setTrackError('10', 'error text'));
    expect(dispatch.calls[1].arguments[0]).toEqual(selectTrack('20'));

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
        sort: {attr: 'date', dir: 'desc'},
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
