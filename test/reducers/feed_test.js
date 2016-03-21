import reducer from '../../src/reducers/feed';
import * as actions from '../../src/actions/feed';

describe('Feed reducer', () => {

  it('adds channels', () => {
    const initialState = {channels: []};

    let state = reducer(initialState, actions.addChannels([{id: 1}]));
    state = reducer(state, actions.addChannels([{id: 2}, {id: 3}]));

    expect(state).toEqual({channels: [
      {id: 1},
      {id: 2},
      {id: 3},
    ]});
    expect(state).toNotBe(initialState);
  });

  it('removes channels', () => {
    const initialState = {
      channels: [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'baz'},
      ],
    };

    const state = reducer(initialState, actions.removeChannels([1, 3]));

    expect(state).toEqual({
      channels: [{id: 2, name: 'bar'}],
    });

    expect(state).toNotBe(initialState);
  });

  it('sets channel props', () => {
    const initialState = {
      channels: [{id: 1}],
    };

    let state = reducer(initialState, actions.setChannelProps(1, {
      isEnabled: true,
      isLoaded: false,
    }));

    expect(state).toEqual({
      channels: [
        {id: 1, isEnabled: true, isLoaded: false},
      ],
    });

    expect(state).toNotBe(initialState);
  });

  it('adds tracks', () => {
    const initialState = {
      tracks: [],
    };

    let state = reducer(initialState, actions.addTracks([
      {id: 10, title: 'foo'},
      {id: 20},
    ]));

    state = reducer(state, actions.addTracks([
      {id: 10, title: 'bar'},
      {id: 30},
    ]));

    expect(state.tracks.length).toEqual(3);
    expect(state.tracks[0].id).toEqual(20);
    expect(state.tracks[1].id).toEqual(10);
    expect(state.tracks[1].title).toEqual('bar');
    expect(state.tracks[2].id).toEqual(30);

    expect(state.tracks[0].lastFetchedAt).toBeA('number');
    expect(state.tracks[1].lastFetchedAt).toBeA('number');
    expect(state.tracks[2].lastFetchedAt).toBeA('number');

    expect(state).toNotBe(initialState);
  });

  it('seeds tracks on add', () => {
    const initialState = {tracks: []};
    const state = reducer(initialState,actions.addTracks([{id: 10}, {id: 20}]));
    expect(state.tracks[0]._seed).toNotEqual(state.tracks[1]._seed);
  });

  it('sets current track', () => {
    const tracks = [{id: 10}, {id: 20}];
    const initialState = {
      currentTrackId: null,
      tracks,
    };

    let state = reducer(initialState, actions.setCurrentTrack(10));
    expect(state).toEqual({currentTrackId: 10, tracks});

    state = reducer(state, actions.setCurrentTrack(20));
    expect(state).toEqual({currentTrackId: 20, tracks});

    state = reducer(state, actions.setCurrentTrack(30));
    expect(state).toEqual({currentTrackId: null, tracks});

    expect(state).toNotBe(initialState);
  });

  it('sets tracks sort', () => {
    const initialState = {tracksSort: {prop: null, dir: null}, tracks: [{id: 1}]};
    let state = reducer(initialState, actions.setTracksSort('date', 'asc'));
    expect(state).toEqual({tracksSort: {prop: 'date', dir: 'asc'}, tracks: [{id: 1}]});

    state = reducer(initialState, actions.setTracksSort(null));
    expect(state).toEqual({tracksSort: {prop: null, dir: null}, tracks: [{id: 1}]});

    expect(state).toNotBe(initialState);
  });

  it('refreshes seed, when sort attribute changed to seed', () => {
    const initialState = {
      tracksSort: {prop: null, dir: null},
      tracks: [
        {id: 1, _seed: 0},
        {id: 2, _seed: 0},
      ],
    };

    const state = reducer(initialState, actions.setTracksSort('_seed', 'desc'));
    expect(state.tracks[0]._seed).toNotEqual(0);
    expect(state.tracks[1]._seed).toNotEqual(0);

    const nextState = reducer(state, actions.setTracksSort('date', 'desc'));
    expect(nextState.tracks[0]._seed).toEqual(state.tracks[0]._seed);
    expect(nextState.tracks[1]._seed).toEqual(state.tracks[1]._seed);
  });

  it('sets error to the track', () => {
    const initialState = {
      tracks: [
        {id: 1, _seed: 0},
        {id: 2, _seed: 0},
      ],
    };

    const state = reducer(initialState, actions.setTrackError(2, 'error text'));
    expect(state.tracks[1]).toEqual({id: 2, _seed: 0, error: 'error text'});

    const nextState = reducer(state, actions.setTrackError(2));
    expect(nextState.tracks[1].error).toBe(null);
  });

  it('selects next track from enabled channels only', () => {
    const initialState = {
      currentTrackId: null,
      channels: [
        {id: 1, isEnabled: true},
        {id: 2, isEnabled: false},
      ],
      tracks: [
        {id: 1, date: 1, channelId: 1},
        {id: 2, date: 2, channelId: 1},
        {id: 4, date: 4, channelId: 2},
      ],
      tracksSort: {prop: null, dir: null},
    };

    let state = reducer(initialState, actions.selectNextTrack());
    expect(state.currentTrackId).toBe(1);

    state = reducer(state, actions.selectNextTrack());
    expect(state.currentTrackId).toBe(2);

    state = reducer(state, actions.selectNextTrack());
    expect(state.currentTrackId).toBe(2);
  });

  it('selects next track according to sort', () => {
    const initialState = {
      currentTrackId: 2,
      channels: [
        {id: 1, isEnabled: true},
      ],
      tracks: [
        {id: 1, date: 1, _seed: 3, channelId: 1},
        {id: 2, date: 2, _seed: 2, channelId: 1},
        {id: 3, date: 3, _seed: 1, channelId: 1},
      ],
      tracksSort: {prop: null, dir: null},
    };

    let state = reducer(initialState, actions.selectNextTrack());
    expect(state.currentTrackId).toBe(3);

    state = reducer({
      ...initialState,
      tracksSort: {prop: '_seed', dir: 'asc'},
    }, actions.selectNextTrack());

    expect(state.currentTrackId).toBe(1);
  });

});
