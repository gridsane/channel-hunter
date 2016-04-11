import React from 'react';
import Radium from 'radium';
import Player from '../../../src/components/header/header-player';
import Progress from '../../../src/components/header/header-player-progress';
import ReactPlayer from 'react-player';
import TestUtils from 'react-addons-test-utils';
import {findWithType, getMountedInstance} from 'react-shallow-testutils';
import {renderDOM, render, shallowRender, getShallowRenderer} from '../../utils';

describe('Controls component', () => {

  function mergeWithDefaults(props = {}) {
    return Object.assign({
      track: {id: 1, title: 'track_title', artist: 'track_artist', duration: 100},
      isPlaying: false,
      onTogglePlay: () => null,
      onNext: () => null,
      onError: () => null,
    }, props);
  }

  before(() => {
    Radium.TestMode.enable();
  });

  after(() => {
    Radium.TestMode.disable();
  });

  it('hides when has no track', () => {
    const props = mergeWithDefaults({track: null});
    const dom = renderDOM(
      <Player {...props} />
    );

    expect(dom.style.getPropertyValue('display')).toBe('none');
  });

  it('shows when has a track', () => {
    const props = mergeWithDefaults();
    const dom = renderDOM(
      <Player {...props} />
    );

    expect(dom.style.getPropertyValue('display')).toBe('');
  });

  it('shows track duration', () => {
    const props = mergeWithDefaults();
    const dom = renderDOM(
      <Player {...props} />
    );

    expect(dom.textContent).toContain('track_title by track_artist');
  });

  it('calls onTogglePlay func on play icon click', () => {
    const toggleHandler = expect.createSpy();
    const props = mergeWithDefaults({onTogglePlay: toggleHandler});
    const dom = render(
      <Player {...props} />
    );

    const playIcon = TestUtils.findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'play_arrow';
    });

    const pauseIcon = TestUtils.findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'pause';
    });

    expect(pauseIcon.length).toBe(0);

    TestUtils.Simulate.click(playIcon[0]);

    expect(toggleHandler.calls.length).toBe(1);
    expect(toggleHandler.calls[0].arguments).toEqual([true]);
  });

  it('shows pause icon and toggle playing on click', () => {
    const toggleHandler = expect.createSpy();
    const props = mergeWithDefaults({isPlaying: true, onTogglePlay: toggleHandler});
    const dom = render(
      <Player {...props} />
    );

    const pauseIcon = TestUtils.findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'pause';
    });

    const playIcon = TestUtils.findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'play_arrow';
    });

    expect(playIcon.length).toBe(0);

    TestUtils.Simulate.click(pauseIcon[0]);

    expect(toggleHandler.calls.length).toBe(1);
    expect(toggleHandler.calls[0].arguments).toEqual([false]);
  });

  it('calls onNext func on next icon click', () => {
    const nextHandler = expect.createSpy();
    const props = mergeWithDefaults({onNext: nextHandler});
    const dom = render(
      <Player {...props} />
    );

    const nextIcon = TestUtils.findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'skip_next';
    });

    TestUtils.Simulate.click(nextIcon[0]);

    expect(nextHandler.calls.length).toBe(1);
  });

  it('calls onError when ReactPlayer triggers error', () => {
    const errorHandler = expect.createSpy();
    const props = mergeWithDefaults({onError: errorHandler});
    const result = shallowRender(<Player {...props} />);
    const reactPlayer = findWithType(result, ReactPlayer);
    reactPlayer.props.onError('error!');

    expect(errorHandler.calls.length).toBe(1);
    expect(errorHandler.calls[0].arguments).toEqual(['error!']);
  });

  it('doesn\'t update duration to NaN', () => {
    const props = mergeWithDefaults();
    const renderer = getShallowRenderer(<Player {...props} />);
    const reactPlayer = findWithType(renderer.getRenderOutput(), ReactPlayer);

    reactPlayer.props.onDuration(undefined);

    expect(getMountedInstance(renderer).state.duration).toBe(100);
  });

  it('doesn\'t update progress to NaN', () => {
    const props = mergeWithDefaults();
    const renderer = getShallowRenderer(<Player {...props} />);
    const reactPlayer = findWithType(renderer.getRenderOutput(), ReactPlayer);

    reactPlayer.props.onProgress({played: .5});
    reactPlayer.props.onProgress(undefined);
    reactPlayer.props.onProgress({played: undefined});

    const progressElement = findWithType(renderer.getRenderOutput(), Progress);
    expect(progressElement.props.current).toBe(50);
  });

  it('doesn\'t show current time if duration is unknown', () => {
    const props = mergeWithDefaults({track: {
      id: 1,
      title: 'title',
      artist: 'artist',
      duration: null,
    }});

    const dom = renderDOM(<Player {...props} />);
    expect(dom.textContent).toNotContain('00:00');
  });

  it('doesn\'t show progress bar if duration is unkwnon', () => {
    const props = mergeWithDefaults({track: {
      id: 1,
      title: 'title',
      artist: 'artist',
      duration: null,
    }});

    const result = render(<Player {...props} />);

    expect(TestUtils.scryRenderedComponentsWithType(result, Progress).length).toBe(0);
  });

  it('optimistically sets progress on seek', () => {
    const props = mergeWithDefaults();
    const dom = render(<Player {...props} />);

    let progressElement = TestUtils.findRenderedComponentWithType(dom, Progress);
    progressElement.props.onSeek(25);
    expect(progressElement.props.current).toBe(25);
    expect(progressElement.props.isLoading).toBe(true);

    TestUtils.findRenderedComponentWithType(dom, ReactPlayer).props.onProgress({played: 0.26});
    expect(progressElement.props.isLoading).toBe(false);
  });

});
