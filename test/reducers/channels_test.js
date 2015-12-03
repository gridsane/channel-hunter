import reducer from '../../src/reducers/channels';
import * as actions from '../../src/actions/channels';

describe('Channels reducer', () => {

  it('adds channels', () => {

    const initialState = {items: []};

    let state = reducer(initialState, actions.addChannels([{id: 1}]));
    state = reducer(state, actions.addChannels([{id: 2}, {id: 3}]));

    expect(state).toEqual({
      items: [
        {id: 1},
        {id: 2},
        {id: 3},
      ],
    });

    expect(state).toNotBe(initialState);

  });

  it('removes a channel', () => {

    const initialState = {
      items: [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}],
    };

    let state = reducer(initialState, actions.removeChannel(1));

    expect(state).toEqual({
      items: [{id: 2, name: 'bar'}],
    });

    expect(state).toNotBe(initialState);

  });

  it('toggles loading', () => {

    const initialState = {
      isLoading: false,
      items: [],
    };

    let state = reducer(initialState, actions.setChannelsLoading(true));
    expect(state.isLoading).toBe(true);
    expect(state).toNotBe(initialState);

    state = reducer(initialState, actions.setChannelsLoading(false));
    expect(state.isLoading).toBe(false);

  });

  it('toggles item loading', () => {

    const initialState = {
      items: [
        {id: 1},
      ],
    };

    let state = reducer(initialState, actions.setChannelLoading(1, true));
    expect(state).toEqual({
      items: [
        {id: 1, isLoading: true},
      ],
    });

    state = reducer(state, actions.setChannelLoading(1, false));
    expect(state).toEqual({
      items: [
        {id: 1, isLoading: false},
      ],
    });

    expect(state).toNotBe(initialState);

  });

  it('toggles item loaded', () => {

    const initialState = {
      items: [
        {id: 1},
      ],
    };

    let state = reducer(initialState, actions.setChannelLoaded(1, true));
    expect(state).toEqual({
      items: [
        {id: 1, isLoaded: true},
      ],
    });

    state = reducer(state, actions.setChannelLoaded(1, false));
    expect(state).toEqual({
      items: [
        {id: 1, isLoaded: false},
      ],
    });

    expect(state).toNotBe(initialState);

  });

  it('sets channel props', () => {

    const initialState = {
      items: [{id: 1}],
    };

    let state = reducer(initialState, actions.setChannelProps(1, {
      isEnabled: true,
      isLoaded: false,
    }));

    expect(state).toEqual({
      items: [
        {id: 1, isEnabled: true, isLoaded: false},
      ],
    });

    expect(state).toNotBe(initialState);

  });

});
