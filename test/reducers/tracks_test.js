const reducer = require('../../src/reducers/tracks');
const types = require('../../src/actions/actionsTypes');

describe('Tracks reducer', () => {

  it('adds tracks', () => {

    let initialState = {items: []};

    let state = reducer(initialState, {
      type: types.TRACKS_ADD,
      tracks: [
        {id: 1, title: 'foo'},
        {id: 2, title: 'bar'},
      ],
    });

    state = reducer(state, {
      type: types.TRACKS_ADD,
      tracks: [
        {id: 3, title: 'baz'},
      ],
    });

    expect(state).to.eql({
      items: [
        {id: 1, title: 'foo'},
        {id: 2, title: 'bar'},
        {id: 3, title: 'baz'},
      ],
    });

    expect(state).to.not.be(initialState);

  });

  it('removes tracks', () => {
    let initialState = {items: [
      {id: 1, title: 'foo', channelId: 1},
      {id: 2, title: 'bar', channelId: 2},
      {id: 3, title: 'baz', channelId: 3},
    ]};

    let state = reducer(initialState, {
      type: types.TRACKS_REMOVE,
      channelId: 1,
    });

    state = reducer(state, {
      type: types.TRACKS_REMOVE,
      channelId: 3,
    });

    expect(state).to.eql({
      items: [
        {id: 2, title: 'bar', channelId: 2},
      ],
    });

    expect(state).to.not.be(initialState);

  });

});
