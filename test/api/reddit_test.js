import nock from 'nock';
import RedditAPI from '../../src/api/reddit';
import data from './reddit_data.json';

describe('Reddit API', () => {

  const api = new RedditAPI();

  afterEach(() => {
    nock.cleanAll();
  });

  it('gets subreddit by url', async () => {
    nock('https://www.reddit.com')
      .get('/r/stonerrock/new.json?limit=1')
      .reply(200, data.subreddit);

    const channel = await api.getChannelByUrl('https://reddit.com/r/stonerrock');
    expect(channel).toEqual({
      source: 'reddit',
      id: 'reddit-/r/stonerrock',
      originalId: '/r/stonerrock',
      name: '/r/stonerrock',
      description: '',
      image: 'https://i.redditmedia.com/ZsspYsj_69_5mmdxnkr7IedHk2SnslrLj0Muh5h0k4M.jpg?s=4772c73d61c7a45d41d6299b3e12ea3b',
      imageLarge: 'https://i.redditmedia.com/ZsspYsj_69_5mmdxnkr7IedHk2SnslrLj0Muh5h0k4M.jpg?s=4772c73d61c7a45d41d6299b3e12ea3b',
      createdAt: null,
      url: 'https://www.reddit.com/r/stonerrock',
      tags: [],
    });
  });

  it('gets subreddit by url with trailing slash', async () => {
    nock('https://www.reddit.com')
      .get('/r/stonerrock/new.json?limit=1')
      .reply(200, data.subreddit);

    const channel = await api.getChannelByUrl('https://reddit.com/r/stonerrock/');
    expect(channel).toNotBe(null);
    expect(channel.id).toBe('reddit-/r/stonerrock');
  });

  it('returns null if no channel found', async () => {
    nock('https://www.reddit.com')
      .get('/r/not_exists/new.json?limit=1')
      .reply(404);

    const channel = await api.getChannelByUrl('https://reddit.com/r/not_exists');

    expect(channel).toBe(null);
  });

  it('does not update channel', async () => {
    const channel = {foo: 'bar'};
    const updatedChannel = await api.getUpdatedChannel(channel);
    expect(updatedChannel).toEqual(channel);
  });

  it('gets tracks', async () => {
    nock('https://www.reddit.com')
      .get('/r/stonerrock/new.json')
      .reply(200, data.subreddit);

    const tracks = await api.getTracks('/r/stonerrock');

    expect(tracks.list).toEqual([
      {
        source: 'reddit',
        id: 'reddit-/r/stonerrock-5krxrk',
        originalId: '5krxrk',
        date: 1482951916,
        artist: null,
        title: 'Pelican - Ephemeral',
        url: 'https://www.youtube.com/watch?v=GYjY98wMWkE',
        duration: null,
        channelId: 'reddit-/r/stonerrock',
        cover: 'https://i.redditmedia.com/ZsspYsj_69_5mmdxnkr7IedHk2SnslrLj0Muh5h0k4M.jpg?s=4772c73d61c7a45d41d6299b3e12ea3b',
        extra: {permalink: '/r/stonerrock/comments/5krxrk/pelican_ephemeral/'},
      },
      {
        source: 'reddit',
        id: 'reddit-/r/stonerrock-5kh4vc',
        originalId: '5kh4vc',
        date: 1482803777,
        artist: null,
        title: 'Cloud - Indeterminate (2016) Stoner Rock Metal Full Album',
        url: 'https://youtu.be/yhUfCynp2Ok',
        duration: null,
        channelId: 'reddit-/r/stonerrock',
        cover: 'https://i.redditmedia.com/E9h15Eap2jOSjsYrJVITH6yHPs20tbSclvLpBkJdBjo.jpg?s=b1c1a37330c45d91fe154750b4f200f1',
        extra: {permalink: '/r/stonerrock/comments/5kh4vc/cloud_indeterminate_2016_stoner_rock_metal_full/'},
      },
      {
        source: 'reddit',
        id: 'reddit-/r/stonerrock-5khfo4',
        originalId: '5khfo4',
        date: 1482807732,
        artist: null,
        title: 'Green Lungs, by GravelRoad from the 2016 album Capitol Hill Country Blues',
        url: 'https://soundcloud.com/knick-knack-records/gravelroad-green-lungs',
        duration: null,
        channelId: 'reddit-/r/stonerrock',
        cover: 'https://i.redditmedia.com/6qdNHiwLdWIzUD0uDMEtRMGNq3KR6zr4XClE_BQUwMY.jpg?s=035d638eccd29251198fad1f7bc81c83',
        extra: {permalink: '/r/stonerrock/comments/5khfo4/green_lungs_by_gravelroad_from_the_2016_album/'},
      },
    ]);
  });

  it('get tracks by track definition', async () => {
    const track = {foo: 'bar'};
    const updatedTracks = await api.getTrack(track);
    expect(updatedTracks).toEqual([track]);
  });

  it('gets channel last updated date', async () => {
    nock('https://www.reddit.com')
      .get('/r/stonerrock/new.json?limit=10')
      .reply(200, data.subreddit);

    const lastUpdated = await api.getChannelLastUpdated('/r/stonerrock');
    expect(lastUpdated).toBe(1482951916);
  });

  it('handles reddit urls only', () => {
    expect(api.hasChannel('https://www.reddit.com/r/channel'))
      .toBe(true);

    expect(api.hasChannel('https://www.reddit.com/m/channel'))
      .toBe(true);

    expect(api.hasChannel('https://www.reddit.com/'))
      .toBe(false);

    expect(api.hasChannel('https://youtube.com/channelname'))
      .toBe(false);

    expect(api.hasChannel('foobar'))
      .toBe(false);

    expect(api.hasChannel('https://www.vk.com/abc'))
      .toBe(false);
  });

  it('contains next page data', async () => {
    nock('https://www.reddit.com')
      .get('/r/stonerrock/new.json')
      .reply(200, data.subreddit);

    const tracks = await api.getTracks('/r/stonerrock');

    expect(tracks.nextPage).toEqual({after: 't3_5kbnr1'});
    expect(tracks.isLastPage).toBe(false);
  });
});
