import reducer from '../../src/reducers/tracks';
import * as actions from '../../src/actions/tracks';

describe('Tracks reducer', () => {

  it('adds tracks', () => {

    const initialState = {
      items: [],
    };

    let state = reducer(initialState, actions.addTracks([{id: 10}, {id: 20}]));
    state = reducer(state, actions.addTracks([{id: 10}, {id: 30}]));

    expect(state.items.length).toEqual(3);
    expect(state.items[0].id).toEqual(10);
    expect(state.items[1].id).toEqual(20);
    expect(state.items[2].id).toEqual(30);

    expect(state).toNotBe(initialState);

  });

  it('seeds tracks on add', () => {

    const initialState = {items: []};
    const state = reducer(initialState,actions.addTracks([{id: 10}, {id: 20}]));
    expect(state.items[0]._seed).toNotEqual(state.items[1]._seed);

  });

  it('selects track', () => {

    const initialState = {
      isPlaying: true,
      selected: null,
    };

    let state = reducer(initialState, actions.selectTrack(10));
    expect(state).toEqual({selected: 10, isPlaying: true});

    state = reducer(state, actions.selectTrack(20));
    expect(state).toEqual({selected: 20, isPlaying: true});

    expect(state).toNotBe(initialState);

  });

  it('starts playing after track selecting', () => {

    const initialState = {
      isPlaying: false,
      selected: null,
    };

    const state = reducer(initialState, actions.selectTrack(10));
    expect(state).toEqual({selected: 10, isPlaying: true});

    expect(state).toNotBe(initialState);

  });

  it('sets playing', () => {

    const initialState = {isPlaying: false};

    let state = reducer(initialState, actions.togglePlaying(true));
    expect(state).toEqual({isPlaying: true});

    state = reducer(initialState, actions.togglePlaying(false));
    expect(state).toEqual({isPlaying: false});

    expect(state).toNotBe(initialState);

  });

  it('sets loading', () => {

    const initialState = {isLoading: false};

    let state = reducer(initialState, actions.setTracksLoading(true));
    expect(state).toEqual({isLoading: true});

    state = reducer(initialState, actions.setTracksLoading(false));
    expect(state).toEqual({isLoading: false});

    expect(state).toNotBe(initialState);

  });

  it('sets tracks sort property', () => {

    const initialState = {sort: {attr: null, dir: null}};
    let state = reducer(initialState, actions.setTracksSort('date', 'asc'));
    expect(state).toEqual({sort: {attr: 'date', dir: 'asc'}});

    state = reducer(initialState, actions.setTracksSort(null));
    expect(state).toEqual({sort: {attr: null, dir: null}});

    expect(state).toNotBe(initialState);
  });

  it('refreshes seed, when sort attribute changed to seed', () => {

    const initialState = {
      sort: {attr: null, dir: null},
      items: [
        {id: 1, _seed: 0},
        {id: 2, _seed: 0},
      ],
    };

    const state = reducer(initialState, actions.setTracksSort('_seed', 'desc'));

    expect(state.items[0]._seed).toNotEqual(0);
    expect(state.items[1]._seed).toNotEqual(0);

    const nextState = reducer(state, actions.setTracksSort('date', 'desc'));

    expect(nextState.items[0]._seed).toEqual(state.items[0]._seed);
    expect(nextState.items[1]._seed).toEqual(state.items[1]._seed);

  });

});
