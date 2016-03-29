import React from 'react';
import Player from '../../src/components/Player';
import {renderDOM} from '../utils';

describe('Player component', () => {
  let setIntervalMock, clearIntervalMock;

  beforeEach(() => {
    setIntervalMock = expect.spyOn(window, 'setInterval');
    clearIntervalMock = expect.spyOn(window, 'clearInterval');
  });

  afterEach(() => {
    setIntervalMock.restore();
    clearIntervalMock.restore();
  });

  it('calls onTimeUpdate callback each second if playing', (done) => {
    const dom = renderDOM(
      <Player
        src="foo"
        isPlaying={true}
        onTimeUpdate={onTimeUpdate} />
    );

    dom.dispatchEvent(new Event('loadstart'));
    dom.currentTime = 100;

    expect(setIntervalMock.calls[0].arguments[1]).toBe(1000);
    setIntervalMock.calls[0].arguments[0]();

    function onTimeUpdate(time) {
      expect(time).toBe(100);
      done();
    }
  });

  it('sets src prop for the audio', () => {
    const dom = renderDOM(<Player src="foo" />);
    expect(dom.attributes.getNamedItem('src').value).toBe('foo');
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
      <Player src="foo" isPlaying={true} />
    );

    dom.play = function play() {
      done();
    };

    dom.dispatchEvent(new Event('loadstart'));
  });

  it('pause audio when loadstart fired and paused', (done) => {
    const dom = renderDOM(
      <Player src="foo" isPlaying={false} />
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
