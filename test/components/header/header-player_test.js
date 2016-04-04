import React from 'react';
import Controls from '../../../src/components/header/header-player';
import ReactPlayer from 'react-player';
import TestUtils from 'react-addons-test-utils';
import {findAllWithType} from 'react-shallow-testutils';
import {renderDOM, render, shallowRender} from '../../utils';

describe('Controls component', () => {

  function mergeWithDefaults(props) {
    return Object.assign({
      track: {id: 1, title: 'track_title', artist: 'track_artist', duration: 100},
      isPlaying: false,
      onTogglePlay: () => null,
      onNext: () => null,
      onError: () => null,
    }, props);
  }

  it('shows "No track", when no track presented', () => {
    const props = mergeWithDefaults({track: null});
    const dom = renderDOM(
      <Controls {...props} />
    );

    expect(dom.textContent).toContain('No track');
  });

  it('shows track duration', () => {
    const props = mergeWithDefaults();
    const dom = renderDOM(
      <Controls {...props} />
    );

    expect(dom.textContent).toContain('track_title by track_artist');
  });

  it('calls onTogglePlay func on play icon click', () => {
    const toggleHandler = expect.createSpy();
    const props = mergeWithDefaults({onTogglePlay: toggleHandler});
    const dom = render(
      <Controls {...props} />
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
      <Controls {...props} />
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
      <Controls {...props} />
    );

    const nextIcon = TestUtils.findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'skip_next';
    });

    TestUtils.Simulate.click(nextIcon[0]);

    expect(nextHandler.calls.length).toBe(1);
  });

  it('calls onError when ReactPlayer triggers error', () =>{
    const errorHandler = expect.createSpy();
    const props = mergeWithDefaults({onError: errorHandler});
    const result = shallowRender(<Controls {...props} />);
    const player = findAllWithType(result, ReactPlayer);
    player[0].props.onError('error!');

    expect(errorHandler.calls.length).toBe(1);
    expect(errorHandler.calls[0].arguments).toEqual(['error!']);
  });

});
