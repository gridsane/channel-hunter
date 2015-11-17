import React from 'react';
import Controls from '../../src/components/Controls';
import TestUtils from 'react-addons-test-utils';
import {renderDOM, render} from '../utils';

describe('Controls component', () => {

  function mergeWithDefaults(props) {
    return Object.assign({
      track: {id: 1, title: 'track_title', artist: 'track_artist', duration: 100},
      isPlaying: false,
      onToggle: () => null,
      onNext: () => null,
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

  it('calls onToggle func on play icon click', (done) => {

    const props = mergeWithDefaults({onToggle: toggle});
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

    function toggle(isPlaying) {
      expect(isPlaying).toBe(true);
      done();
    }

  });

  it('shows pause icon and toggle playing on click', (done) => {

    const props = mergeWithDefaults({isPlaying: true, onToggle: toggle});
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

    function toggle(isPlaying) {
      expect(isPlaying).toBe(false);
      done();
    }

  });

  it('calls onNext func on next icon click', (done) => {

    const props = mergeWithDefaults({onNext: next});
    const dom = render(
      <Controls {...props} />
    );

    const nextIcon = TestUtils.findAllInRenderedTree(dom, (el) => {
      return el.textContent === 'skip_next';
    });

    TestUtils.Simulate.click(nextIcon[0]);

    function next() {
      done();
    }

  });

});
