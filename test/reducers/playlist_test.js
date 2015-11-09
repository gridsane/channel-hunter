const reducer = require('../../src/reducers/playlist');
const {
  selectItem,
  addItems,
  removeItemsByChannelId: removeItems,
  togglePlaying,
  toggleLoading,
} = require('../../src/actions/playlist');

describe('Playlist reducer', () => {

  it('selects item', () => {

    const initialState = {selected: null};
    let state = reducer(initialState, selectItem({id: 10, title: 'foo'}));

    expect(state).to.eql({
      selected: {id: 10, title: 'foo'},
    });

    expect(state).to.not.be(initialState);
  });

  it('toggles playing', () => {

    const initialState = {isPlaying: false};

    let state = reducer(initialState, togglePlaying(true));
    expect(state).to.eql({isPlaying: true});

    state = reducer(initialState, togglePlaying(false));
    expect(state).to.eql({isPlaying: false});

    expect(state).to.not.be(initialState);

  });

  it('toggles loading', () => {

    const initialState = {isLoading: false};

    let state = reducer(initialState, toggleLoading(true));
    expect(state).to.eql({isLoading: true});

    state = reducer(initialState, toggleLoading(false));
    expect(state).to.eql({isLoading: false});

    expect(state).to.not.be(initialState);

  });

  it('adds items', () => {

    const initialState = {items: []};

    let state = reducer(initialState, addItems([
      {id: 1, title: 'foo'},
      {id: 2, title: 'bar'},
    ]));

    state = reducer(state, addItems([
      {id: 3, title: 'baz'},
    ]));

    expect(state).to.eql({
      items: [
        {id: 1, title: 'foo'},
        {id: 2, title: 'bar'},
        {id: 3, title: 'baz'},
      ],
    });

    expect(state).to.not.be(initialState);

  });

  it('removes items', () => {
    const initialState = {items: [
      {id: 1, title: 'foo', channelId: 1},
      {id: 2, title: 'bar', channelId: 2},
      {id: 3, title: 'baz', channelId: 3},
    ]};

    let state = reducer(initialState, removeItems(1));

    state = reducer(state, removeItems(3));

    expect(state).to.eql({
      items: [
        {id: 2, title: 'bar', channelId: 2},
      ],
    });

    expect(state).to.not.be(initialState);

  });

});
