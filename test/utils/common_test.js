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

  });

  it('curries functions', () => {

    expect(utils.curried((x, y) => x + y, 1)(2)).toBe(3);
    expect(utils.curried((x, y) => x * y, 2, 3)()).toBe(6);

  });

  it('filters and maps array', () => {

    expect(utils.filterMap([10, 20, 30], (x) => x > 15, (x) => x * 3)).toEqual([60, 90]);

  });

});
