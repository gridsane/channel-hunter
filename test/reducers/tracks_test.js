import reducer from '../../src/reducers/tracks';

const {
  addItems,
  togglePlaying,
  toggleTracksLoading,
  selectItem,
} = require('../../src/actions/tracks');

describe('Tracks reducer', () => {

  it('adds items', () => {

    const initialState = {
      items: [],
    };

    let state = reducer(initialState, addItems([{id: 10}, {id: 20}]));
    state = reducer(state, addItems([{id: 10}, {id: 30}]));

    expect(state).toEqual({
      items: [
        {id: 10},
        {id: 20},
        {id: 30},
      ],
    });

    expect(state).toNotBe(initialState);

  });

  it('selects item', () => {

    const initialState = {
      selected: null,
    };

    let state = reducer(initialState, selectItem(10));
    expect(state).toEqual({selected: 10});

    state = reducer(state, selectItem(20));
    expect(state).toEqual({selected: 20});

    expect(state).toNotBe(initialState);

  });

  it('toggles playing', () => {

    const initialState = {isPlaying: false};

    let state = reducer(initialState, togglePlaying(true));
    expect(state).toEqual({isPlaying: true});

    state = reducer(initialState, togglePlaying(false));
    expect(state).toEqual({isPlaying: false});

    expect(state).toNotBe(initialState);

  });

  it('toggles loading', () => {

    const initialState = {isLoading: false};

    let state = reducer(initialState, toggleTracksLoading(true));
    expect(state).toEqual({isLoading: true});

    state = reducer(initialState, toggleTracksLoading(false));
    expect(state).toEqual({isLoading: false});

    expect(state).toNotBe(initialState);

  });

});
