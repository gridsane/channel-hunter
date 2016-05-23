import React from 'react';
import Player from '../../../src/components/header/header-player';
import Progress from '../../../src/components/header/header-player-progress';
import ReactPlayer from 'react-player';
import {
  Simulate,
  findAllInRenderedTree,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import {findWithType, getMountedInstance} from 'react-shallow-testutils';
import {renderDOM, render, shallowRender, getShallowRenderer} from '../../utils';

describe('Player component', () => {
  const defaultProps = {
    track: {id: 1, title: 'track_title', artist: 'track_artist', duration: 100},
    isPlaying: false,
    onTogglePlay: () => null,
    onNext: () => null,
    onError: () => null,
  };

  it('toggles play', () => {
    const spy = expect.createSpy();
    const dom = render(<Player {...defaultProps} onTogglePlay={spy} />);

    const playIcon = findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'play_arrow';
    });

    const pauseIcon = findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'pause';
    });

    expect(pauseIcon.length).toBe(0);

    Simulate.click(playIcon[0]);

    expect(spy.calls.length).toBe(1);
    expect(spy.calls[0].arguments).toEqual([true]);
  });

  it('shows pause icon and toggle playing on click', () => {
    const spy = expect.createSpy();
    const dom = render(<Player {...defaultProps} isPlaying onTogglePlay={spy} />);

    const pauseIcon = findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'pause';
    });

    const playIcon = findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'play_arrow';
    });

    expect(playIcon.length).toBe(0);

    Simulate.click(pauseIcon[0]);

    expect(spy.calls.length).toBe(1);
    expect(spy.calls[0].arguments).toEqual([false]);
  });

  it('toggles onNext callback', () => {
    const spy = expect.createSpy();
    const dom = render(<Player {...defaultProps} onNext={spy} /> );

    const nextIcon = findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'skip_next';
    });

    Simulate.click(nextIcon[0]);

    expect(spy.calls.length).toBe(1);
  });

  it('calls onError when ReactPlayer triggers error', () => {
    const spy = expect.createSpy();
    const result = shallowRender(<Player {...defaultProps} onError={spy} />);
    const reactPlayer = findWithType(result, ReactPlayer);
    reactPlayer.props.onError('error!');

    expect(spy.calls.length).toBe(1);
    expect(spy.calls[0].arguments).toEqual(['error!']);
  });

  it('doesn\'t update duration to NaN', () => {
    const renderer = getShallowRenderer(<Player {...defaultProps} />);
    const reactPlayer = findWithType(renderer.getRenderOutput(), ReactPlayer);

    reactPlayer.props.onDuration(undefined);

    expect(getMountedInstance(renderer).state.duration).toBe(100);
  });

  it('doesn\'t update progress to NaN', () => {
    const renderer = getShallowRenderer(<Player {...defaultProps} />);
    const reactPlayer = findWithType(renderer.getRenderOutput(), ReactPlayer);

    reactPlayer.props.onProgress({played: .5});
    reactPlayer.props.onProgress(undefined);
    reactPlayer.props.onProgress({played: undefined});

    const progressElement = findWithType(renderer.getRenderOutput(), Progress);
    expect(progressElement.props.current).toBe(50);
  });

  it('doesn\'t show current time if duration is unknown', () => {
    const props = {
      ...defaultProps,
      track: {
        id: 1,
        title: 'title',
        artist: 'artist',
        duration: null,
      },
    };

    const dom = renderDOM(<Player {...props} />);

    expect(dom.textContent).toNotContain('00:00');
  });

  it('doesn\'t show progress bar if duration is unknown', () => {
    const props = {
      ...defaultProps,
      track: {
        id: 1,
        title: 'title',
        artist: 'artist',
        duration: null,
      },
    };
    const result = render(<Player {...props} />);

    expect(scryRenderedComponentsWithType(result, Progress).length).toBe(0);
  });

  it('optimistically sets progress on seek', () => {
    const dom = render(<Player {...defaultProps} isPlaying />);

    let progressElement = findRenderedComponentWithType(dom, Progress);
    progressElement.props.onSeek(25);
    expect(progressElement.props.current).toBe(25);
    expect(progressElement.props.isLoading).toBe(true);

    findRenderedComponentWithType(dom, ReactPlayer).props.onProgress({played: 0.26});
    expect(progressElement.props.isLoading).toBe(false);
  });
});
