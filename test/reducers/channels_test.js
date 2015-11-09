const reducer = require('../../src/reducers/channels');
const types = require('../../src/actions/actionsTypes');

describe('Channels reducer', () => {

  it('adds a channel', () => {

    let initialState = {items: [], picked: []};

    let state = reducer(initialState, {
      type: types.CHANNELS_ADD,
      channel: {id: 1, name: 'foo'},
    });

    state = reducer(state, {
      type: types.CHANNELS_ADD,
      channel: {id: 2, name: 'bar'},
    });

    expect(state).to.eql({
      items: [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
      ],
      picked: [],
    });

    expect(state).to.not.be(initialState);

  });

  it('removes a channel', () => {

    let initialState = {
      items: [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}],
      picked: [],
    };

    let state = reducer(initialState, {
      type: types.CHANNELS_REMOVE,
      channelId: 1,
    });

    expect(state).to.eql({
      items: [{id: 2, name: 'bar'}],
      picked: [],
    });

    expect(state).to.not.be(initialState);

  });

  it('toggles channel on', () => {
    let initialState = {
      items: [],
      picked: [1],
    };

    let state = reducer(initialState, {
      type: types.CHANNELS_TOGGLE,
      channelId: 2,
    });

    expect(state).to.eql({
      items: [],
      picked: [1, 2],
    });

    expect(state).to.not.be(initialState);
  });

  it('toggles channel off', () => {
    let initialState = {
      items: [],
      picked: [1, 2],
    };

    let state = reducer(initialState, {
      type: types.CHANNELS_TOGGLE,
      channelId: 1,
    });

    expect(state).to.eql({
      items: [],
      picked: [2],
    });

    expect(state).to.not.be(initialState);
  });

});
