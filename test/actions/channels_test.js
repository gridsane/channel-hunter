import * as api from '../../src/utils/api';
import * as actions from '../../src/actions/channels';
import * as tracksActions from '../../src/actions/tracks';
import * as actionsTypes from '../../src/actions/actionsTypes';

describe('Channels actions', () => {

  it('loads channels tracks', async () => {

    expect.spyOn(api, 'getTracks').andReturn([1, 2, 3]);
    const dispatch = expect.createSpy();

    await actions.loadChannelTracks({
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: false,
      isLoaded: false,
    }, true)(dispatch);

    expect(api.getTracks.calls[0].arguments).toEqual(['vk', 11]);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setChannelLoading(1, true));
    expect(dispatch.calls[1].arguments[0]).toEqual(tracksActions.addTracks([1, 2, 3]));

    const channelPropsAction = dispatch.calls[2].arguments[0];
    expect(channelPropsAction.type).toBe(actionsTypes.CHANNELS_ITEM_PROPS);
    expect(channelPropsAction.props.isLoading).toBe(false);
    expect(channelPropsAction.props.isLoaded).toBe(true);
    expect(channelPropsAction.props.fetchedAt > 0).toBe(true);
    expect(channelPropsAction.props.lastFetchedAt).toBe(null);

  });

  it('sets lastFetchedAt when channel tracks loaded', async () => {
    expect.spyOn(api, 'getTracks').andReturn([1, 2, 3]);
    const dispatch = expect.createSpy();

    await actions.loadChannelTracks({
      id: 1,
      originalId: 11,
      source: 'vk',
      fetchedAt: 12345,
      isEnabled: false,
      isLoaded: false,
    }, true)(dispatch);

    expect(dispatch.calls[2].arguments[0].props.lastFetchedAt).toBe(12345);
  });

  it('disables channel without loading', () => {

    const dispatch = expect.createSpy();
    actions.setChannelEnabled({
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: true,
      isLoaded: true,
    }, false)(dispatch);

    expect(dispatch.calls.length).toBe(1);

    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setChannelProps(1, {
      isEnabled: false,
    }));

  });

  it('do not loads tracks for loaded channel when enables', () => {

    const dispatch = expect.createSpy();
    actions.setChannelEnabled({
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: false,
      isLoaded: true,
    }, true)(dispatch);

    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setChannelProps(1, {
      isEnabled: true,
    }));

  });

  it('loads tracks for not loaded channel when enables', () => {

    const dispatch = expect.createSpy();
    const channel = {
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: false,
      isLoaded: false,
    };

    actions.setChannelEnabled(channel, true)(dispatch);

    expect(dispatch.calls.length).toBe(2);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.loadChannelTracks(channel));
    expect(dispatch.calls[1].arguments[0]).toEqual(actions.setChannelProps(1, {
      isEnabled: true,
    }));

  });

});
