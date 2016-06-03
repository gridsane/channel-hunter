import reducer from '../../src/reducers/discover';
import * as actions from '../../src/actions/discover';

describe('Discover reducer', () => {
  it('sets channels', () => {
    const channels = ['channel1', 'channel2'];
    const state = reducer(undefined, actions.setChannels(channels));
    expect(state.channels).toEqual(channels);
  });
});
