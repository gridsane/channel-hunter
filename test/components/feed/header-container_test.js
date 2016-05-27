import React from 'react';
import {Header, mapToProps} from '../../../src/components/header/header-container';
import Cover from '../../../src/components/header/header-cover';
import Player from '../../../src/components/header/header-player';
import * as actions from '../../../src/actions/feed';
import {findWithType} from 'react-shallow-testutils';
import {shallowRender, getShallowRenderer} from '../../utils';

describe('Header component @now', () => {

  it('maps current track to props', () => {
    const state = {
      feed: {
        currentTrackId: 1,
        tracks: [
          {id: 1, channelId: 1},
        ],
      },
    };

    expect(mapToProps(state).currentTrack).toEqual({id: 1, channelId: 1});
  });

  it('selects next track', () => {
    const dispatch = expect.createSpy();
    const player = getPlayer(shallowRenderHeader({dispatch}));
    player.props.onNext();
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.selectNextTrack());
  });

  it('toggles playling', () => {
    const renderer = getShallowRenderer(<Header {...defaultProps} />);
    let controls = getPlayer(renderer.getRenderOutput());
    expect(controls.props.isPlaying).toBe(false);

    controls.props.onTogglePlay();

    controls = getPlayer(renderer.getRenderOutput());
    expect(controls.props.isPlaying).toBe(true);

    controls.props.onTogglePlay();

    expect(getPlayer(renderer.getRenderOutput()).props.isPlaying).toBe(false);
  });

  it('sets error to current track', () => {
    const dispatch = expect.createSpy();
    const currentTrack = {id: 1};
    const player = getPlayer(shallowRenderHeader({dispatch, currentTrack}));

    player.props.onError('error text');

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.refetchTrackOrError(currentTrack, 'error text'));
  });

  it('starts playing when current track selected in first time', () => {
    const renderer = getShallowRenderer(<Header {...defaultProps} currentTrack={null} />);
    const currentTrack = {id: '20', channelId: '11'};
    renderer.getMountedInstance().componentWillReceiveProps({
      ...defaultProps,
      currentTrack,
    });

    expect(renderer.getMountedInstance().state.isPlaying).toBe(true);
  });

  it('does not start playing when current track changed', () => {
    const renderer = getShallowRenderer(<Header {...{...defaultProps, ...{
      currentTrack: {id: '10', channelId: '11'},
    }}} />);
    renderer.getMountedInstance().componentWillReceiveProps({...defaultProps, ...{
      currentTrack: {id: '20', channelId: '11'},
    }});

    const player = getPlayer(renderer.getRenderOutput());
    expect(player.props.isPlaying).toBe(false);
  });

  it('sets cover from current track', () => {
    const appBarWithoutCover = getCover(shallowRenderHeader());
    expect(appBarWithoutCover.props.url).toBe(null);

    const appBarWithCover = getCover(shallowRenderHeader({currentTrack: {id: '10', cover: 'coverImage'}}));
    expect(appBarWithCover.props.url).toBe('coverImage');
  });

  const defaultProps = {
    dispatch: () => null,
    currentTrack: {id: 1},
  };

  function shallowRenderHeader(props) {
    const tree = shallowRender(<Header {...{
      ...defaultProps,
      ...props,
    }} />);

    return tree;
  }

  function getPlayer(tree) {
    return findWithType(tree, Player);
  }

  function getCover(tree) {
    return findWithType(tree, Cover);
  }

});

