import createRouter from '../../../src/server/routers/channels';

describe('Channels router', () => {

  let storage = {};
  let api = {};
  const router = createRouter(storage, api);

  beforeEach(() => {
    expect.spyOn(console, 'error');
    storage.getChannels = expect.createSpy();
    storage.addOrUpdateChannel = expect.createSpy();
    api.getChannelByUrl = expect.createSpy();
  });

  afterEach(() => {
    console.error.restore();
  });

  it('should return channels as json', async () => {

    const res = {json: expect.createSpy()};
    const channels = ['channel1', 'channel2'];
    storage.getChannels.andReturn(channels);

    await router.getChannels(null, res);

    expect(res.json.calls.length).toBe(1);
    expect(res.json.calls[0].arguments[0]).toBe(channels);

  });

  it('handles errors during getChannels request', async () => {

    const res = {json: expect.createSpy()};
    const error = new Error('error message');
    storage.getChannels.andThrow(error);

    await router.getChannels(null, res);

    expect(res.json.calls.length).toBe(1);
    expect(res.json.calls[0].arguments[0].error).toBe('Oops, error occured.');
    expect(console.error.calls[0].arguments[0]).toBe(error);

  });

  it('adds channel by url', async () => {

    const res = {json: expect.createSpy()};
    const channel = {foo: 'bar'};

    api.getChannelByUrl.andReturn(channel);
    storage.addOrUpdateChannel.andReturn(channel);

    await router.addChannel({body: {url: 'channel_url'}}, res);

    expect(api.getChannelByUrl.calls[0].arguments[0]).toBe('channel_url');
    expect(storage.addOrUpdateChannel.calls[0].arguments[0]).toBe(channel);
    expect(res.json.calls.length).toBe(1);
    expect(res.json.calls[0].arguments[0]).toBe(channel);

  });

  it('handles errors during addChannel request', async () => {

    const res = {json: expect.createSpy()};
    const error = new Error('error message');

    api.getChannelByUrl.andThrow(error);

    await router.addChannel({body: {url: 'channel_url'}}, res);

    expect(res.json.calls.length).toBe(1);
    expect(res.json.calls[0].arguments[0].error).toBe('Oops, error occured.');
    expect(console.error.calls[0].arguments[0]).toBe(error);

  });

});
