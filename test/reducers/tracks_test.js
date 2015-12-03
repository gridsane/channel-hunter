import reducer from '../../src/reducers/tracks';
import * as actions from '../../src/actions/tracks';

describe('Tracks reducer', () => {

  it('adds tracks', () => {

    const initialState = {
      items: [],
    };

    let state = reducer(initialState, actions.addTracks([{id: 10}, {id: 20}]));
    state = reducer(state, actions.addTracks([{id: 10}, {id: 30}]));

    expect(state).toEqual({
      items: [
        {id: 10},
        {id: 20},
        {id: 30},
      ],
    });

    expect(state).toNotBe(initialState);

  });

  it('selects track', () => {

    const initialState = {
      selected: null,
    };

    let state = reducer(initialState, actions.selectTrack(10));
    expect(state).toEqual({selected: 10});

    state = reducer(state, actions.selectTrack(20));
    expect(state).toEqual({selected: 20});

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

});
