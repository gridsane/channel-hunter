const actions = require('../../src/actions/player');
const types = require('../../src/actions/actionsTypes');

describe('Player actions', () => {

  it('setProgress', () => {

    expect(actions.setProgress(50)).to.eql({
      type: types.PLAYER_PROGRESS,
      progress: 50,
    });

    expect(actions.setProgress(100)).to.eql({
      type: types.PLAYER_PROGRESS,
      progress: 100,
    });

  });

});
