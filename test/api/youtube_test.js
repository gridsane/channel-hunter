import YoutubeAPI from '../../src/api/youtube';
import nock from 'nock';
import data from './youtube_data.json';

describe('Youtube API', () => {

  const key = 'YOUTUBE-API_KEY';
  const api = new YoutubeAPI(key);

  it('gets youtube channel by user url', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/channels?key=${key}&part=snippet&forUsername=channelmathrock`)
      .reply(200, data.channels);

    const channel = await api.getChannelByUrl('https://www.youtube.com/user/channelmathrock');

    expect(channel).toEqual({
      source: 'youtube',
      id: 'youtube-UCywl3vgm261NHTzzcgkrQiA',
      originalId: 'UCywl3vgm261NHTzzcgkrQiA',
      name: 'Math Rock Channel',
      description: 'I DO NOT OWN ALL #tag THE TRACKS',
      image: 'channel_image_medium.jpg',
      imageLarge: 'channel_image_high.jpg',
      createdAt: 1396808185,
      url: 'https://www.youtube.com/user/channelmathrock',
      tags: ['tag'],
    });
  });

  it('gets youtube channel by channel url', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/channels?key=${key}&part=snippet&id=LONG_ID`)
      .reply(200, data.channels);

    const channel = await api.getChannelByUrl('https://www.youtube.com/channel/LONG_ID');

    expect(channel).toEqual({
      source: 'youtube',
      id: 'youtube-UCywl3vgm261NHTzzcgkrQiA',
      originalId: 'UCywl3vgm261NHTzzcgkrQiA',
      name: 'Math Rock Channel',
      description: 'I DO NOT OWN ALL #tag THE TRACKS',
      image: 'channel_image_medium.jpg',
      imageLarge: 'channel_image_high.jpg',
      createdAt: 1396808185,
      url: 'https://www.youtube.com/channel/LONG_ID',
      tags: ['tag'],
    });
  });

  it('gets updated channel', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/channels?key=${key}&part=snippet&id=ORIGINAL_ID`)
      .reply(200, data.channels);

    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&order=date&channelId=ORIGINAL_ID&maxResults=50`)
      .reply(200, data.search) ;

    const channel = {
      source: 'youtube',
      originalId: 'ORIGINAL_ID',
    };

    const updatedChannel = await api.getUpdatedChannel(channel);
    expect(updatedChannel).toEqual({
      source: 'youtube',
      id: 'youtube-UCywl3vgm261NHTzzcgkrQiA',
      originalId: 'UCywl3vgm261NHTzzcgkrQiA',
      name: 'Math Rock Channel',
      description: 'I DO NOT OWN ALL #tag THE TRACKS',
      image: 'channel_image_medium.jpg',
      imageLarge: 'channel_image_high.jpg',
      createdAt: 1396808185,
      url: 'https://youtube.com/channel/UCywl3vgm261NHTzzcgkrQiA',
      tags: ['tag', 'mathyRock', 'mathRock'],
    });
  });

  it('returns null if no channel found', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/channels?key=${key}&part=snippet&id=NOT_EXISTS`)
      .reply(200, data.empty_channels);

    const channel = await api.getChannelByUrl('https://www.youtube.com/channel/NOT_EXISTS');

    expect(channel).toBe(null);
  });

  it('gets channel last updated date', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&order=date&channelId=LONG_ID&maxResults=1`)
      .reply(200, data.search);

    const lastUpdated = await api.getChannelLastUpdated('LONG_ID');
    expect(lastUpdated).toBe(1397162021);
  });

  it('gets tracks by channel id', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&order=date&channelId=CHANNEL_ID&maxResults=50`)
      .reply(200, data.search)

      .get(`/youtube/v3/videos?key=${key}&part=contentDetails&id=AmyoEy0pzWs%2CXy8EGXRBOEU&maxResults=2`)
      .reply(200, data.videos);

    const tracks = await api.getTracks('CHANNEL_ID');

    expect(tracks.list).toEqual([
      {
        source: 'youtube',
        id: 'youtube-AmyoEy0pzWs',
        originalId: 'AmyoEy0pzWs',
        date: 1397162021,
        artist: 'Cleft',
        title: 'Ghost Thighs',
        url: 'https://www.youtube.com/watch?v=AmyoEy0pzWs',
        duration: 240,
        channelId: 'youtube-UCywl3vgm261NHTzzcgkrQiA',
        cover: 'https://i.ytimg.com/vi/AmyoEy0pzWs/hqdefault.jpg',
      },
      {
        source: 'youtube',
        id: 'youtube-Xy8EGXRBOEU',
        originalId: 'Xy8EGXRBOEU',
        date: 1397162687,
        artist: null,
        title: 'Elephant In The Bar Room',
        url: 'https://www.youtube.com/watch?v=Xy8EGXRBOEU',
        duration: 224,
        channelId: 'youtube-UCywl3vgm261NHTzzcgkrQiA',
        cover: 'https://i.ytimg.com/vi/Xy8EGXRBOEU/hqdefault.jpg',
      },
    ]);
  });


  it('gets tracks by page', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&order=date&channelId=CHANNEL_ID&maxResults=50&pageToken=page_token`)
      .reply(200, data.search)

      .get(`/youtube/v3/videos?key=${key}&part=contentDetails&id=AmyoEy0pzWs%2CXy8EGXRBOEU&maxResults=2`)
      .reply(200, data.videos);

    const tracks = await api.getTracks('CHANNEL_ID', {nextPageToken: 'page_token'});

    expect(tracks.list.length).toBe(2);
  });

  it('returns empty array if no tracks found', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&order=date&channelId=EMPTY_CHANNEL_ID&maxResults=50`)
      .reply(200, data.empty_search);

    const tracks = await api.getTracks('EMPTY_CHANNEL_ID');

    expect(tracks.list).toBeA(Array);
    expect(tracks.list.length).toBe(0);
  });

  it('handles youtube urls only', () => {
    expect(api.hasChannel('https://www.youtube.com/channel/UCMtXiWYvBB8X2ynT74bqK6A'))
      .toBe(true);

    expect(api.hasChannel('https://www.youtube.com/user/channelmathrock'))
      .toBe(true);

    expect(api.hasChannel('http://www.youtube.com/channel/channelname'))
      .toBe(true);

    expect(api.hasChannel('https://vk.com/channel/'))
      .toBe(false);

    expect(api.hasChannel('https://vk.com/channelname'))
      .toBe(false);

    expect(api.hasChannel('http://vk.com/youtube/channel/name'))
      .toBe(false);

    expect(api.hasChannel('foobar'))
      .toBe(false);

    expect(api.hasChannel('youtube/channel'))
      .toBe(false);
  });

  it('contains next page data', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&order=date&channelId=FOO&maxResults=50`)
      .reply(200, data.search)
      .get(`/youtube/v3/videos?key=${key}&part=contentDetails&id=AmyoEy0pzWs%2CXy8EGXRBOEU&maxResults=2`)
      .reply(200, data.videos);


    const tracks = await api.getTracks('FOO');

    expect(tracks.nextPage).toEqual({nextPageToken: 'CAoQAA'});
    expect(tracks.isLastPage).toBe(false);
  });

});
