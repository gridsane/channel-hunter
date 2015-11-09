const actions = require('../../src/actions/player');
const types = require('../../src/actions/actionsTypes');

describe('Player actions', () => {

  it('sets a track', () => {

    expect(actions.setTrack({id: 10})).to.eql({
      type: types.PLAYER_TRACK,
      track: {id: 10},
    });

  });

  it('toggles playing', () => {

    expect(actions.togglePlaying(true)).to.eql({
      type: types.PLAYER_TOGGLE_PLAYING,
      isPlaying: true,
    });

    expect(actions.togglePlaying(false)).to.eql({
      type: types.PLAYER_TOGGLE_PLAYING,
      isPlaying: false,
    });

  });

  it('toggles loading', () => {

    expect(actions.toggleLoading(true)).to.eql({
      type: types.PLAYER_TOGGLE_LOADING,
      isLoading: true,
    });

    expect(actions.toggleLoading(false)).to.eql({
      type: types.PLAYER_TOGGLE_LOADING,
      isLoading: false,
    });

  });

});
