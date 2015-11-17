import React from 'react';
import Player from '../../src/components/Player';
import {renderDOM} from '../utils';

describe('Player component', () => {

  it('sets src prop for the audio', () => {

    const dom = renderDOM(<Player src="foo" />);
    expect(dom.attributes.getNamedItem('src').value).toBe('foo');

  });

  it('calls onTimeUpdate callback', (done) => {

    const dom = renderDOM(
      <Player src="foo" onTimeUpdate={timeupdate} />
    );

    dom.currentTime = 10;
    dom.dispatchEvent(new Event('timeupdate'));

    function timeupdate(time) {
      expect(time).toEqual(10);
      done();
    }

  });

  it('calls onEnd callback', (done) => {

    const dom = renderDOM(
      <Player src="foo" onEnd={end} />
    );

    dom.dispatchEvent(new Event('ended'));

    function end() {
      done();
    }

  });

  it('calls onError callback', (done) => {

    const dom = renderDOM(
      <Player src="foo" onError={error} />
    );

    dom.dispatchEvent(new Event('error'));

    function error() {
      done();
    }

  });

  it('play audio when loadstart fired and not paused', (done) => {

    const dom = renderDOM(
      <Player src="foo" paused={false} />
    );

    dom.play = function play() {
      done();
    };

    dom.dispatchEvent(new Event('loadstart'));

  });

  it('pause audio when loadstart fired and paused', (done) => {

    const dom = renderDOM(
      <Player src="foo" paused={true} />
    );

    dom.pause = function pause() {
      done();
    };

    dom.dispatchEvent(new Event('loadstart'));

  });

  it('calls onLoadingChange callback when seeking', (done) => {

    onLoadingTestCase('seeking', true, done);

  });

  it('calls onLoadingChange callback when waiting', (done) => {

    onLoadingTestCase('waiting', true, done);

  });

  it('calls onLoadingChange callback when loadeddata', (done) => {

    onLoadingTestCase('loadeddata', false, done);

  });

  it('calls onLoadingChange callback when seeked', (done) => {

    onLoadingTestCase('seeked', false, done);

  });

  it('calls onLoadingChange callback when canplay', (done) => {

    onLoadingTestCase('canplay', false, done);

  });

  it('calls onLoadingChange callback when playing', (done) => {

    onLoadingTestCase('playing', false, done);

  });

});

function onLoadingTestCase(event, expectedArg, done) {
  const dom = renderDOM(
    <Player src="foo" onLoadingChange={callback} />
  );

  dom.dispatchEvent(new Event(event));

  function callback(arg) {
    expect(arg).toBe(expectedArg);
    done();
  }
}
