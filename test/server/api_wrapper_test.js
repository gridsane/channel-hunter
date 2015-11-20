import APIWrapper from '../../src/server/api_wrapper';

describe('APIWrapper', () => {

  const fooAPI = {
    getChannelByUrl: null,
    getTracks: null,
    hasChannel: null,
  };

  const barAPI = {
    getChannelByUrl: null,
    getTracks: null,
    hasChannel: null,
  };

  const api = new APIWrapper({
    foo: fooAPI,
    bar: barAPI,
  });

  beforeEach(() => {
    Object.keys(fooAPI).forEach((key) => fooAPI[key] = expect.createSpy());
    Object.keys(barAPI).forEach((key) => barAPI[key] = expect.createSpy());
  });

  it('gets channel by url from suitable API', () => {

    fooAPI.hasChannel.andReturn(true);
    fooAPI.getChannelByUrl.andReturn('foo result');
    barAPI.hasChannel.andReturn(false);

    const result = api.getChannelByUrl('http://foo/channelId');

    expect(fooAPI.hasChannel.calls.length).toBe(1);
    expect(barAPI.hasChannel.calls.length).toBe(1);
    expect(fooAPI.getChannelByUrl.calls.length).toBe(1);
    expect(barAPI.getChannelByUrl.calls.length).toBe(0);

    expect(fooAPI.getChannelByUrl.calls[0].arguments).toEqual(['http://foo/channelId']);
    expect(result).toBe('foo result');

  });

  it('throws error, if no suitable apis found', () => {

    fooAPI.hasChannel.andReturn(false);
    barAPI.hasChannel.andReturn(false);

    expect(api.getChannelByUrl).withArgs('http://foobar').toThrow(Error);

  });

  it('gets tracks from suitable API', () => {

    barAPI.getTracks.andReturn('bar result');

    const result = api.getTracks('bar', 'channelId');

    expect(fooAPI.getTracks.calls.length).toBe(0);
    expect(barAPI.getTracks.calls.length).toBe(1);

    expect(barAPI.getTracks.calls[0].arguments).toEqual(['channelId']);
    expect(result).toBe('bar result');

  });

  it('throws error, if tracks source is unknown', () => {

    expect(api.getTracks).withArgs('baz', 'channelId').toThrow(Error);

  });

});
