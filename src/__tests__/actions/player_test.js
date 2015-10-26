jest.dontMock('../../actions/player');
jest.dontMock('../../actions/actionsTypes');
const actions = require('../../actions/player');
const types = require('../../actions/actionsTypes');

describe('Player actions', () => {

  it('setProgress', () => {

    expect(actions.setProgress(50)).toEqual({
      type: types.PLAYER_PROGRESS,
      progress: 50,
    });

    expect(actions.setProgress(100)).toEqual({
      type: types.PLAYER_PROGRESS,
      progress: 100,
    });

  });

});
