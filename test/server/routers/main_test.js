import createRouter from '../../../src/server/routers/main';
import fs from 'fs';

describe('Main router', () => {

  let storage = {};
  let api = {};
  const router = createRouter(storage, api);

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
      channels: {
        isLoading: false,
        items: [
          {
            id: 1,
            source: 'vk',
            isLoading: false,
            isLoaded: false,
            isEnabled: false,
          },
        ],
      },

      tracks: {
        isPlaying: false,
        isLoading: false,
        sort: {attr: 'date', dir: 'desc'},
        selected: null,
        items: [],
      },
    });

  });

});
