import React from 'react';
import {Application} from '../../src/components/Application';
import Controls from '../../src/components/Controls';
import Channels from '../../src/components/Channels';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender} from '../utils';
import {selectItem, togglePlaying} from '../../src/actions/tracks';
import {toggleChannel} from '../../src/actions/channels';

describe('Application component', () => {

  it('selects next item', () => {

    let dispatch = expect.createSpy();

    const controls = getControls(shallowRenderApp(dispatch, '10'));
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(selectItem('20'));

  });

  it('selects first item as next if there are no selected', () => {

    let dispatch = expect.createSpy();

    const controls = getControls(shallowRenderApp(dispatch, null));
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(selectItem('10'));

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

  it('toggles Channels', () => {

    let dispatch = expect.createSpy();
    let channels = getChannels(shallowRenderApp(dispatch));

    expect(channels.props.list).toEqual([{id: 1, name: 'foo'}]);

    channels.props.onToggle({id: 1});

    expect(dispatch.calls[0].arguments[0]).toEqual(toggleChannel(1));

  });

  function shallowRenderApp(dispatch, selected = null) {
    const props = {
      selectedTrack: null,
      channels: {items: [
        {id: 1, name: 'foo'},
      ]},
      tracks: {
        selected,
        isPlaying: false,
        isLoading: false,
        items: {
          '10': {id: '10', channelId: 1},
          '20': {id: '20', channelId: 1},
          '30': {id: '30', channelId: 1},
        },
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

});
