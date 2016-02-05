import * as utils from '../../src/utils/common';

describe('Utils', () => {

  it('gets node offset', () => {

    const node = {
      offsetTop: 40,
      offsetLeft: 10,
      offsetParent: {
        offsetTop: 50,
        offsetLeft: 20,
        offsetParent: {
          offsetTop: 60,
          offsetLeft: 30,
        },
      },
    };

    expect(utils.nodeOffset(node)).toEqual({
      top: 150,
      left: 60,
    });

  });

  it('formats duration', () => {

    expect(utils.formatDuration(1)).toBe('00:01');
    expect(utils.formatDuration(59)).toBe('00:59');
    expect(utils.formatDuration(119)).toBe('01:59');
    expect(utils.formatDuration(900)).toBe('15:00');

    expect(utils.formatDuration(60 * 60)).toBe('~1h');
    expect(utils.formatDuration(2.6 * 60 * 60)).toBe('~3h');
    expect(utils.formatDuration(25.4 * 60 * 60)).toBe('~25h');

  });

  it('curries functions', () => {

    expect(utils.curried((x, y) => x + y, 1)(2)).toBe(3);
    expect(utils.curried((x, y) => x * y, 2, 3)()).toBe(6);

  });

  it('throttles function', (done) => {

    const spy = expect.createSpy();
    const throttled = utils.throttle(spy, 5);

    throttled(1);
    throttled(2);

    setTimeout(() => {
      throttled(3);
    }, 5);

    setTimeout(() => {
      expect(spy.calls.length).toBe(2);
      expect(spy.calls[0].arguments).toEqual([1]);
      expect(spy.calls[1].arguments).toEqual([3]);
      done();
    }, 15);

  });

});
