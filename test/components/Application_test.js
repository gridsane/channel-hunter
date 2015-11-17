import React from 'react';
import {Application} from '../../src/components/Application';
import Controls from '../../src/components/Controls';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender} from '../utils';
import {selectItem, togglePlaying} from '../../src/actions/tracks';

describe('Application component', () => {

  it('selects next item', () => {

    let dispatch = expect.createSpy();

    const controls = shallowRenderGetControls(dispatch, '10');
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(selectItem('20'));

  });

  it('selects first item as next if there are no selected', () => {

    let dispatch = expect.createSpy();

    const controls = shallowRenderGetControls(dispatch, null);
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(selectItem('10'));

  });

  it('stops playing if next track is out of bounds', () => {

    let dispatch = expect.createSpy();

    const controls = shallowRenderGetControls(dispatch, '30');
    controls.props.onNext();

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(togglePlaying(false));

  });

  function shallowRenderGetControls(dispatch, selected) {
    const props = {
      selectedTrack: null,
      channels: {picked: [], items: []},
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

    return ShallowTestUtils.findWithType(tree, Controls);
  }


});
