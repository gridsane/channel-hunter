import CompositeAPI from '../../src/api/composite';

describe('CompositeAPI', () => {

  const fooAPI = {
    getChannelByUrl: null,
    getTracks: null,
    getTrack: null,
    hasChannel: null,
  };

  const barAPI = {
    getChannelByUrl: null,
    getTracks: null,
    getTrack: null,
    hasChannel: null,
  };

  const api = new CompositeAPI({
    foo: fooAPI,
    bar: barAPI,
  });

  beforeEach(() => {
    Object.keys(fooAPI).forEach((key) => fooAPI[key] = expect.createSpy());
    Object.keys(barAPI).forEach((key) => barAPI[key] = expect.createSpy());
  });

  it('gets channel by url from suitable API', () => {
    fooAPI.hasChannel.andReturn(false);
    barAPI.hasChannel.andReturn(true);
    barAPI.getChannelByUrl.andReturn('bar result');

    const result = api.getChannelByUrl('http://bar/channelId');

    expect(fooAPI.getChannelByUrl.calls.length).toBe(0);
    expect(barAPI.getChannelByUrl.calls.length).toBe(1);

    expect(barAPI.getChannelByUrl.calls[0].arguments).toEqual(['http://bar/channelId']);
    expect(result).toBe('bar result');
  });

  it('gets channel url source', () => {
    fooAPI.hasChannel.andReturn(true);
    barAPI.hasChannel.andReturn(false);

    expect(api.getChannelUrlSource('http://foo/channelId')).toBe('foo');

    fooAPI.hasChannel.andReturn(false);
    barAPI.hasChannel.andReturn(false);
    expect(api.getChannelUrlSource('http://foo/channelId')).toBe(null);
  });

  it('throws error, if no suitable apis found', () => {
    fooAPI.hasChannel.andReturn(false);
    barAPI.hasChannel.andReturn(false);

    expect(() => api.getChannelByUrl('http://foobar')).toThrow(/unknown/);
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
    expect(() => api.getTracks('baz', 'channelId')).toThrow(/unknown/);
  });

  it('get track from suitable API', () => {
    api.getTrack({id: 22, source: 'bar'});
    expect(barAPI.getTrack.calls.length).toBe(1);
    expect(barAPI.getTrack.calls[0].arguments).toEqual([{id: 22, source: 'bar'}]);
  });

  it('throws error, if track source is unknown', () => {
    expect(() => api.getTrack({source: 'baz'})).toThrow(/unknown/);
  });

});
