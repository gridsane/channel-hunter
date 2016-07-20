import React from 'react';
import {Sidebar, mapToProps} from '../../../src/components/sidebar/sidebar-container';
import ChannelList from '../../../src/components/channel-list/channel-list';
import * as actions from '../../../src/actions/feed';
import {findWithType} from 'react-shallow-testutils';
import {shallowRender} from '../../utils';

describe('Sidebar component', () => {

  it('maps channels from the state', () => {
    const state = {
      feed: {
        channels: [
          {id: 1, isEnabled: true, image: 'image1'},
          {id: 2, isEnabled: false, image: 'image2'},
        ],
      },
    };

    const props = mapToProps(state);
    expect(props.channels).toEqual(state.feed.channels);
  });

  it('toggles channels', () => {
    const dispatch = expect.createSpy();
    const channels = getChannels(shallowRenderSidebar({dispatch}));
    expect.spyOn(actions, 'setChannelEnabled').andCall((...args) => args);

    channels.props.onToggle({id: '11', isEnabled: true});

    expect(channels.props.list).toEqual(defaultProps.channels);
    expect(dispatch.calls[0].arguments[0]).toEqual(
      actions.setChannelEnabled({id: '11', isEnabled: true}, false)
    );
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

  function shallowRenderSidebar(props) {
    const tree = shallowRender(<Sidebar {...{
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

