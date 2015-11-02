import {
  formatDuration,
  nodeOffset,
  curried
} from '../../src/utils/common';

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

    expect(nodeOffset(node)).to.be.eql({
      top: 150,
      left: 60,
    });

  });

  it('formats duration', () => {

    expect(formatDuration(1)).to.be('00:01');
    expect(formatDuration(59)).to.be('00:59');
    expect(formatDuration(119)).to.be('01:59');
    expect(formatDuration(900)).to.be('15:00');

  });

  it('curries functions', () => {

    expect(curried((x, y) => x + y, 1)(2)).to.be(3);
    expect(curried((x, y) => x * y, 2, 3)()).to.be(6);

  });

})
