import * as api from '../../src/api/browser';
import * as actions from '../../src/actions/feed';
import * as actionsTypes from '../../src/actions/actionsTypes';

describe('Feed actions', () => {

  afterEach(() => {
    if (typeof(api.getTrack.restore) === 'function') {
      api.getTrack.restore();
    }
    if (typeof(api.getTracks.restore) === 'function') {
      api.getTracks.restore();
    }
  });

  it('loads channels tracks', async () => {
    expect.spyOn(api, 'getTracks').andReturn({list: [1, 2, 3], nextPage: {offset: 10}});
    const dispatch = expect.createSpy();

    await actions.loadChannelTracks({
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: false,
      isLoaded: false,
    })(dispatch);

    expect(api.getTracks.calls[0].arguments).toEqual(['vk', 11, {}]);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setChannelLoading(1, true));
    expect(dispatch.calls[1].arguments[0]).toEqual(actions.addTracks([1, 2, 3]));

    const channelPropsAction = dispatch.calls[2].arguments[0];
    expect(channelPropsAction.type).toBe(actionsTypes.FEED_SET_PROPS_CHANNEL);
    expect(channelPropsAction.props.isLoading).toBe(false);
    expect(channelPropsAction.props.isLoaded).toBe(true);
    expect(channelPropsAction.props.fetchedAt > 0).toBe(true);
    expect(channelPropsAction.props.prevFetchedAt).toBe(null);
    expect(channelPropsAction.props.nextPage).toEqual({offset: 10});
  });

  it('loads more tracks', async () => {
    expect.spyOn(api, 'getTracks').andReturn({list: [1, 2, 3], nextPage: {offset: 20}});
    const dispatch = expect.createSpy();

    await actions.loadChannelTracks({
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: false,
      isLoaded: false,
      nextPage: {offset: 10},
    }, true)(dispatch);

    expect(api.getTracks.calls[0].arguments).toEqual(['vk', 11, {offset: 10}]);
  });

  it('sets prevFetchedAt when channel tracks loaded', async () => {
    expect.spyOn(api, 'getTracks').andReturn({list: [1, 2, 3]});
    const dispatch = expect.createSpy();

    await actions.loadChannelTracks({
      id: 1,
      originalId: 11,
      source: 'vk',
      fetchedAt: 12345,
      isEnabled: false,
      isLoaded: false,
    }, true)(dispatch);

    expect(dispatch.calls[2].arguments[0].props.prevFetchedAt).toBe(12345);
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
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setChannelProps(1, {
      isEnabled: true,
    }));
    expect(dispatch.calls[1].arguments[0]).toEqual(actions.loadChannelTracks(channel));
  });


  it('loads tracks for loaded channel with updates when enables', () => {
    const dispatch = expect.createSpy();
    const channel = {
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: false,
      isLoaded: true,
      hasUpdates: true,
    };

    actions.setChannelEnabled(channel, true)(dispatch);

    expect(dispatch.calls.length).toBe(2);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setChannelProps(1, {isEnabled: true}));
    expect(dispatch.calls[1].arguments[0]).toEqual(actions.loadChannelTracks(channel));
  });

  it('loads single track', async () => {
    expect.spyOn(api, 'getTrack').andReturn([1, 2, 3]);
    const dispatch = expect.createSpy();

    await actions.loadTrack({id: 11, source: 'vk'})(dispatch);

    expect(api.getTrack.calls[0].arguments).toEqual([{id: 11, source: 'vk'}]);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.addTracks([1, 2, 3]));
  });

  it('tries to refetch track before setting error', async () => {
    const tracksFromApi = {id: '10', url: 'bar'};
    expect.spyOn(api, 'getTrack').andReturn(tracksFromApi);
    const dispatch = expect.createSpy();

    const track = {id: '10', url: 'foo'};
    await actions.refetchTrackOrError(track, 'error message')(dispatch);

    expect(api.getTrack.calls.length).toBe(1);
    expect(api.getTrack.calls[0].arguments).toEqual([track]);
    expect(dispatch.calls.length).toBe(1);
    expect(dispatch.calls[0].arguments).toEqual([actions.addTracks(tracksFromApi)]);
  });

  it('does not reload track on error if it fetched recently', async () => {
    const tracksFromApi = {id: '10', url: 'baz'};
    expect.spyOn(api, 'getTrack').andReturn(tracksFromApi);
    const dispatch = expect.createSpy();

    const track = {id: '10', url: 'bar', lastFetchedAt: Math.floor(Date.now() / 1000) - 58};
    await actions.refetchTrackOrError(track, 'error message')(dispatch);

    expect(api.getTrack.calls.length).toBe(0);
    expect(dispatch.calls.length).toBe(2);
    expect(dispatch.calls[0].arguments).toEqual([actions.setTrackError('10', 'error message')]);
    expect(dispatch.calls[1].arguments).toEqual([actions.selectNextTrack()]);
  });

  it('determines channels has updates', async () => {
    expect.spyOn(api, 'getChannelLastUpdated').andCall((source, channelId) => {
      if (channelId === '1') {
        return 3;
      } else if (channelId === '3') {
        return 1;
      }

      return 0;
    });

    const dispatch = expect.createSpy();

    await actions.refreshFeedChannels([
      {id: 'source-1', originalId: '1', fetchedAt: 2},
      {id: 'source-2', originalId: '2', hasUpdates: true, fetchedAt: 2},
      {id: 'source-3', originalId: '3', fetchedAt: 2},
    ])(dispatch);

    expect(dispatch.calls.length).toBe(3);
    expect(dispatch.calls[0].arguments).toEqual([actions.setFeedChannelsLoading(true)]);
    expect(dispatch.calls[1].arguments).toEqual([actions.setChannelProps('source-1', {
      hasUpdates: true,
    })]);
    expect(dispatch.calls[2].arguments).toEqual([actions.setFeedChannelsLoading(false)]);
  });

  it('loads tracks for loaded and enabled channels on refresh', async () => {
    const channel = {
      id: 'source-1',
      originalId: '1',
      fetchedAt: 1,
      isEnabled: true,
      isLoaded: true,
    };

    expect.spyOn(api, 'getChannelLastUpdated').andReturn(2);
    const dispatch = expect.createSpy();
    await actions.refreshFeedChannels([channel])(dispatch);

    expect(dispatch.calls.length).toBe(3);
    expect(dispatch.calls[0].arguments).toEqual([actions.setFeedChannelsLoading(true)]);
    expect(dispatch.calls[1].arguments).toEqual([actions.loadChannelTracks(channel)]);
    expect(dispatch.calls[2].arguments).toEqual([actions.setFeedChannelsLoading(false)]);
  });

});
