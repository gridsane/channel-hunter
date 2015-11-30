import reducer from '../../src/reducers/channels';
import * as actions from '../../src/actions/channels';

describe('Channels reducer', () => {

  it('adds a channel', () => {

    const initialState = {items: [], picked: []};

    let state = reducer(initialState, actions.addChannel({id: 1, name: 'foo'}));
    state = reducer(state, actions.addChannel({id: 2, name: 'bar'}));

    expect(state).toEqual({
      items: [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
      ],
      picked: [],
    });

    expect(state).toNotBe(initialState);

    state = reducer(state, actions.addChannel({id: 3, name: 'baz'}, true));

    expect(state).toEqual({
      items: [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'baz'},
      ],
      picked: [3],
    });

  });

  it('removes a channel', () => {

    const initialState = {
      items: [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}],
      picked: [],
    };

    let state = reducer(initialState, actions.removeChannel(1));

    expect(state).toEqual({
      items: [{id: 2, name: 'bar'}],
      picked: [],
    });

    expect(state).toNotBe(initialState);

  });

  it('toggles channel', () => {
    const initialState = {
      items: [
        {id: 1, isEnabled: false},
        {id: 2, isEnabled: false},
      ],
    };

    let state = reducer(initialState, actions.toggleChannel(1));

    expect(state).toEqual({
      items: [
        {id: 1, isEnabled: true},
        {id: 2, isEnabled: false},
      ],
    });

    state = reducer(initialState, actions.toggleChannel(1));
    expect(state).toEqual({
      items: [
        {id: 1, isEnabled: false},
        {id: 2, isEnabled: false},
      ],
    });

    expect(state).toNotBe(initialState);
  });

  it('toggles loading', () => {

    const initialState = {
      isLoading: false,
      items: [],
      picked: [],
    };

    let state = reducer(initialState, actions.toggleChannelsLoading(true));
    expect(state.isLoading).toBe(true);
    expect(state).toNotBe(initialState);

    state = reducer(initialState, actions.toggleChannelsLoading(false));
    expect(state.isLoading).toBe(false);

  });

  it('toggles item loading', () => {

    const initialState = {
      items: [
        {id: 1},
      ],
    };

    let state = reducer(initialState, actions.toggleChannelsItemLoading(1, true));
    expect(state).toEqual({
      items: [
        {id: 1, isLoading: true},
      ],
    });

    state = reducer(state, actions.toggleChannelsItemLoading(1, false));
    expect(state).toEqual({
      items: [
        {id: 1, isLoading: false},
      ],
    });

    expect(state).toNotBe(initialState);

  });

});
