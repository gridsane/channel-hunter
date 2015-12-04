import * as api from '../../src/utils/api';
import * as actions from '../../src/actions/channels';
import * as tracksActions from '../../src/actions/tracks';

describe('Channels actions', () => {

  it('loads tracks for not loaded channel when enables', async () => {

    expect.spyOn(api, 'getTracks').andReturn([1, 2, 3]);
    const dispatch = expect.createSpy();

    await actions.setChannelEnabled({
      id: 1,
      originalId: 11,
      source: 'vk',
      isEnabled: false,
      isLoaded: false,
    }, true)(dispatch);

    expect(api.getTracks.calls[0].arguments).toEqual(['vk', 11]);
    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setChannelLoading(1, true));
    expect(dispatch.calls[1].arguments[0]).toEqual(tracksActions.addTracks([1, 2, 3]));
    expect(dispatch.calls[2].arguments[0]).toEqual(actions.setChannelProps(1, {
      isEnabled: true,
      isLoading: false,
      isLoaded: true,
    }));
  });

  it('disables channel without loading', async () => {

    expect.spyOn(api, 'getTracks');
    const dispatch = expect.createSpy();

    await actions.setChannelEnabled({
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

  it('do not loads tracks for loaded channel', async () => {

    expect.spyOn(api, 'getTracks');
    const dispatch = expect.createSpy();

    await actions.setChannelEnabled({
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

});
