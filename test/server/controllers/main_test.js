import createController from '../../../src/server/controllers/main';
import fs from 'fs';

describe('Main controller', () => {

  let storage = {};
  let api = {};
  const router = createController(storage, api);

  beforeEach(() => {
    expect.spyOn(console, 'error');
    storage.getChannels = expect.createSpy();
    api.getTracks = expect.createSpy();
    fs.readFile = expect.createSpy();
  });

  afterEach(() => {
    console.error.restore();
  });

  it('should replace initial state on index page', async () => {

    storage.getChannels.andReturn([{id: 1, source: 'vk'}]);
    api.getTracks.andReturn(new Promise((resolve) => {
      resolve([{id: 2, channelId: 1}]);
    }));

    fs.readFile.andCall((file, callback) => {
      callback(null, '%INITIAL_STATE%');
    });

    const res = {send: expect.createSpy()};

    await router.index(null, res);

    expect(JSON.parse(res.send.calls[0].arguments[0])).toEqual({
      feed: {
        channels: [],
        tracks: [],
        tracksSort: {prop: 'date', dir: 'desc'},
      },
    });

  });

});
