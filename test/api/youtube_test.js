import YoutubeAPI from '../../src/api/youtube';
import nock from 'nock';

describe('Youtube API', () => {

  const key = 'YOUTUBE-API_KEY';
  const api = new YoutubeAPI(key);

  afterEach(() => {
  });

  it('gets youtube channel by user url', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/channels?key=${key}&part=snippet&forUsername=channelmathrock`)
      .reply(200, RESPONSES.channels);

    const channel = await api.getChannelByUrl('https://www.youtube.com/user/channelmathrock');

    expect(channel).toEqual({
      source: 'youtube',
      id: 'youtube-UCywl3vgm261NHTzzcgkrQiA',
      originalId: 'UCywl3vgm261NHTzzcgkrQiA',
      name: 'Math Rock Channel',
      description: 'I DO NOT OWN ALL THE TRACKS',
      image: 'channel_image_medium.jpg',
      imageLarge: 'channel_image_high.jpg',
      createdAt: 1396808185,
      url: 'https://www.youtube.com/user/channelmathrock',
    });
  });

  it('gets youtube channel by channel url', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/channels?key=${key}&part=snippet&id=LONG_ID`)
      .reply(200, RESPONSES.channels);

    const channel = await api.getChannelByUrl('https://www.youtube.com/channel/LONG_ID');

    expect(channel).toEqual({
      source: 'youtube',
      id: 'youtube-UCywl3vgm261NHTzzcgkrQiA',
      originalId: 'UCywl3vgm261NHTzzcgkrQiA',
      name: 'Math Rock Channel',
      description: 'I DO NOT OWN ALL THE TRACKS',
      image: 'channel_image_medium.jpg',
      imageLarge: 'channel_image_high.jpg',
      createdAt: 1396808185,
      url: 'https://www.youtube.com/channel/LONG_ID',
    });
  });

  it('returns null if no channel found', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/channels?key=${key}&part=snippet&id=NOT_EXISTS`)
      .reply(200, RESPONSES.empty_channels);

    const channel = await api.getChannelByUrl('https://www.youtube.com/channel/NOT_EXISTS');

    expect(channel).toBe(null);
  });

  it('gets channel last updated date', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&channelId=LONG_ID&maxResults=1`)
      .reply(200, RESPONSES.search);

    const lastUpdated = await api.getChannelLastUpdated('LONG_ID');
    expect(lastUpdated).toBe(1397162021);
  });

  it('gets tracks by channel id', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&channelId=CHANNEL_ID&maxResults=50`)
      .reply(200, RESPONSES.search)

      .get(`/youtube/v3/videos?key=${key}&part=contentDetails&id=AmyoEy0pzWs%2CXy8EGXRBOEU&maxResults=2`)
      .reply(200, RESPONSES.videos);

    const tracks = await api.getTracks('CHANNEL_ID');

    expect(tracks).toEqual([
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

  it('returns empty array if no tracks found', async () => {
    nock('https://www.googleapis.com')
      .get(`/youtube/v3/search?key=${key}&part=snippet&type=video&channelId=EMPTY_CHANNEL_ID&maxResults=50`)
      .reply(200, RESPONSES.empty_search);

    const tracks = await api.getTracks('EMPTY_CHANNEL_ID');

    expect(tracks).toBeA(Array);
    expect(tracks.length).toBe(0);
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

});

const RESPONSES = {

  channels: {
    "kind":"youtube#channelListResponse",
    "etag":"\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/-bPvcDKRT_OFZ_sZUyuZaUOtZbs\"",
    "pageInfo":{
      "totalResults":1,
      "resultsPerPage":5,
    },
    "items": [
      {
        "kind":"youtube#channel",
        "etag":"\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/DpuxY3Fib3R45GFN-bAJKJid9js\"",
        "id":"UCywl3vgm261NHTzzcgkrQiA",
        "snippet":{
          "title":"Math Rock Channel",
          "description":"I DO NOT OWN ALL THE TRACKS",
          "publishedAt":"2014-04-06T18:16:25.000Z",
          "thumbnails":{
            "default":{
              "url":"channel_image_small.jpg",
            },
            "medium":{
              "url":"channel_image_medium.jpg",
            },
            "high":{
              "url":"channel_image_high.jpg",
            },
          },
          "localized":{
            "title":"Math Rock Channel",
            "description":"I DO NOT OWN ALL THE TRACKS",
          },
        },
      },
    ],
  },

  empty_channels: {
    "kind":"youtube#channelListResponse",
    "etag":"\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/-bPvcDKRT_OFZ_sZUyuZaUOtZbs\"",
    "pageInfo":{
      "totalResults": 0,
      "resultsPerPage": 0,
    },
    "items": [],
  },

  search: {
    "kind": "youtube#searchListResponse",
    "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/oJ-XWTNnpHXdL2lRQ56Cht_DAtw\"",
    "nextPageToken": "CAoQAA",
    "pageInfo": {
      "totalResults": 59,
      "resultsPerPage": 10,
    },
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/saicqzmNa43qoWjxz71YuY7nTEw\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "AmyoEy0pzWs",
        },
        "snippet": {
          "publishedAt": "2014-04-10T20:33:41.000Z",
          "channelId": "UCywl3vgm261NHTzzcgkrQiA",
          "title": "Cleft - Ghost Thighs",
          "description": "Track 5 Recorded (mostly) live over 2 days of recording. Engineered, mixed and mastered by Dan Beesley & John Simm (Cleft). Here's what some really nice ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/AmyoEy0pzWs/default.jpg",
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/AmyoEy0pzWs/mqdefault.jpg",
            },
            "high": {
              "url": "https://i.ytimg.com/vi/AmyoEy0pzWs/hqdefault.jpg",
            },
          },
          "channelTitle": "channelmathrock",
          "liveBroadcastContent": "none",
        },
      },

      {
        "kind": "youtube#searchResult",
        "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/XhDa2fUjxzYtdPSrPyZ6BohRk00\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "Xy8EGXRBOEU",
        },
        "snippet": {
          "publishedAt": "2014-04-10T20:44:47.000Z",
          "channelId": "UCywl3vgm261NHTzzcgkrQiA",
          "title": "Elephant In The Bar Room",
          "description": "Track 6 Recorded (mostly) live over 2 days of recording. Engineered, mixed and mastered by Dan Beesley & John Simm (Cleft). Here's what some really nice ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/Xy8EGXRBOEU/default.jpg",
            },
            "medium": {
             "url": "https://i.ytimg.com/vi/Xy8EGXRBOEU/mqdefault.jpg",
            },
            "high": {
             "url": "https://i.ytimg.com/vi/Xy8EGXRBOEU/hqdefault.jpg",
            },
          },
          "channelTitle": "channelmathrock",
          "liveBroadcastContent": "none",
        },
      },
    ],
  },

  empty_search: {
    "kind": "youtube#searchListResponse",
    "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/oJ-XWTNnpHXdL2lRQ56Cht_DAtw\"",
    "pageInfo": {
      "totalResults": 0,
      "resultsPerPage": 0,
    },
    "items": [],
  },

  videos: {
    "kind": "youtube#videoListResponse",
    "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/tQTsjaPbMpQBrLqRAG1J1z6Nau0\"",
    "pageInfo": {
      "totalResults": 2,
      "resultsPerPage": 2,
    },
    "items": [
      {
        "kind": "youtube#video",
        "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/MOvxOw9sJuHuLe547SElV4_73IU\"",
        "id": "AmyoEy0pzWs",
        "contentDetails": {
          "duration": "PT4M",
          "dimension": "2d",
          "definition": "sd",
          "caption": "false",
          "licensedContent": true,
        },
      },
      {
        "kind": "youtube#video",
        "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/11QfgM6bq9WzFgyvGdr-lZ2iK9I\"",
        "id": "Xy8EGXRBOEU",
        "contentDetails": {
          "duration": "PT3M44S",
          "dimension": "2d",
          "definition": "sd",
          "caption": "false",
          "licensedContent": true,
        },
      },
    ],
  },

};
