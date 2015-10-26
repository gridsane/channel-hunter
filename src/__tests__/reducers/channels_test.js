jest.dontMock('../../reducers/channels');
jest.dontMock('../../actions/actionsTypes');
const reducer = require('../../reducers/channels');
const types = require('../../actions/actionsTypes');

describe('Channels reducer', () => {

  it('adds a channel', () => {

    let initialState = {items: [], picked: []}

    let state = reducer(initialState, {
      type: types.CHANNELS_ADD,
      channel: {id: 1, name: 'foo'},
    });

    state = reducer(state, {
      type: types.CHANNELS_ADD,
      channel: {id: 2, name: 'bar'},
    });

    expect(state).toEqual({
      items: [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'}
      ],
      picked: [],
    });

    expect(state).toNotBe(initialState);

  });

  it('removes a channel', () => {

    let initialState = {
      items: [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}],
      picked: [],
    };

    let state = reducer(initialState, {
      type: types.CHANNELS_REMOVE,
      channelId: 1
    });

    expect(state).toEqual({
      items: [{id: 2, name: 'bar'}],
      picked: []
    });

    expect(state).toNotBe(initialState);

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

    expect(state).toEqual({
      items: [],
      picked: [1, 2]
    });

    expect(state).toNotBe(initialState);
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

    expect(state).toEqual({
      items: [],
      picked: [2]
    });

    expect(state).toNotBe(initialState);
  });

});
