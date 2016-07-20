import React from 'react';
import {Feed, mapToProps} from '../../../src/components/feed/feed-container';
import ChannelList from '../../../src/components/channel-list/channel-list';
import Playlist from '../../../src/components/feed/feed-playlist';
import * as actions from '../../../src/actions/feed';
import {findWithType} from 'react-shallow-testutils';
import {shallowRender} from '../../utils';

describe('Feed component', () => {

  it('maps playlist from the state', () => {
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

  it('passes props to the playlist', () => {
    const playlist = getPlaylist(shallowRenderFeed({currentTrack: {id: '10'}}));
    expect(playlist.props.tracks).toEqual(defaultProps.playlist);
    expect(playlist.props.isShuffle).toBe(defaultProps.isShuffle);
    expect(playlist.props.currentTrackId).toBe('10');
  });

  it('selects track', () => {
    const dispatch = expect.createSpy();
    const playlist = getPlaylist(shallowRenderFeed({dispatch}));
    playlist.props.onSelect('20');
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setCurrentTrack('20'));
  });

  it('disables shuffle', () => {
    const dispatch = expect.createSpy();
    const playlist = getPlaylist(shallowRenderFeed({dispatch}));
    playlist.props.onToggleShuffle();
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setTracksSort('_seed', 'desc'));
  });

  it('enables shuffle', () => {
    const dispatch = expect.createSpy();
    const playlist = getPlaylist(shallowRenderFeed({dispatch, isShuffle: true}));
    playlist.props.onToggleShuffle();
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setTracksSort('date', 'desc'));
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

  function shallowRenderFeed(props) {
    const tree = shallowRender(<Feed {...{
      ...defaultProps,
      ...props,
    }} />);

    return tree;
  }

  function getChannels(tree) {
    return findWithType(tree, ChannelList);
  }

  function getPlaylist(tree) {
    return findWithType(tree, Playlist);
  }
});

