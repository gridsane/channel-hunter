import * as api from '../../src/utils/api';
import * as actions from '../../src/actions/tracks';

describe('Tracks actions', () => {

  it('loads single track', async () => {

    expect.spyOn(api, 'getTrack').andReturn([1, 2, 3]);
    const dispatch = expect.createSpy();

    await actions.loadTrack({id: 11, source: 'vk'})(dispatch);

    expect(dispatch.calls[0].arguments[0]).toEqual(actions.setTracksLoading(true));
    expect(api.getTrack.calls[0].arguments).toEqual([{id: 11, source: 'vk'}]);
    expect(dispatch.calls[1].arguments[0]).toEqual(actions.addTracks([1, 2, 3]));
    expect(dispatch.calls[2].arguments[0]).toEqual(actions.setTracksLoading(false));

  });

});
