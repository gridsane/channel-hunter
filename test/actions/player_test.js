const actions = require('../../src/actions/player');
const types = require('../../src/actions/actionsTypes');

describe('Player actions', () => {

  it('seekPosition', () => {

    expect(actions.seekPosition(50)).to.eql({
      type: types.PLAYER_POSITION,
      position: 50,
    });

    expect(actions.seekPosition(100)).to.eql({
      type: types.PLAYER_POSITION,
      position: 100,
    });

  });

});
