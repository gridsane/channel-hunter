import createController from '../../../src/server/controllers/tracks';

describe('Tracks controller', () => {

  let api = {};
  const router = createController(api);

  beforeEach(() => {
    expect.spyOn(console, 'error');
    api.getTracks = expect.createSpy();
  });

  afterEach(() => {
    console.error.restore();
  });

  it('should return tracks', async () => {

    const req = {params: {source: 'foo', channelId: 'bar'}};
    const res = {json: expect.createSpy()};
    const tracks = ['track1', 'track2'];
    api.getTracks.andReturn(tracks);

    await router.getTracks(req, res);

    expect(api.getTracks.calls[0].arguments).toEqual(['foo', 'bar']);
    expect(res.json.calls.length).toBe(1);
    expect(res.json.calls[0].arguments[0]).toBe(tracks);

  });

  it('handles errors during getTracks request', async () => {

    const req = {params: {source: 'foo', channelId: 'bar'}};
    const res = {json: expect.createSpy()};
    const error = new Error('error message');

    api.getTracks.andThrow(error);

    await router.getTracks(req, res);

    expect(res.json.calls.length).toBe(1);
    expect(res.json.calls[0].arguments[0].error).toBe('Oops, error occured.');
    expect(console.error.calls[0].arguments[0]).toBe(error);

  });

});
