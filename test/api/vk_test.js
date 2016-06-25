import VkAPI from '../../src/api/vk';
import nock from 'nock';

describe('VK API', () => {

  const api = new VkAPI();

  afterEach(() => {
    nock.cleanAll();
  });

  it('gets vk group by url', async () => {
    nock('https://api.vk.com/method')
      .get('/groups.getById?v=5.40&https=1&group_id=e_music_stonerrock')
      .reply(200, RESPONSES.groups);

    const channel = await api.getChannelByUrl('https://vk.com/e_music_stonerrock');

    expect(channel).toEqual({
      source: 'vk',
      id: 'vk-26457580',
      originalId: '26457580',
      name: 'E:\music\stoner',
      description: 'Group description',
      image: 'photo_100.jpg',
      imageLarge: 'photo_200.jpg',
      createdAt: null,
      url: 'https://vk.com/e_music_stonerrock',
    });
  });

  it('returns null if no channel found', async () => {
    nock('https://api.vk.com/method')
      .get('/groups.getById?v=5.40&https=1&group_id=not_exists')
      .reply(200, RESPONSES.groups_not_found);

    const channel = await api.getChannelByUrl('https://vk.com/not_exists');

    expect(channel).toBe(null);
  });

  it('gets tracks by channel id', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.40&https=1&owner_id=-1000&count=10')
      .reply(200, RESPONSES.posts);

    const tracks = await api.getTracks('1000');

    expect(tracks).toEqual([
      {
        source: 'vk',
        id: 'vk-1000-00_10',
        originalId: '00_10',
        date: 1448049845,
        artist: 'Dreadnought',
        title: 'Feeling Good',
        url: 'track10_url',
        duration: 214,
        channelId: 'vk-1000',
        cover: 'post1_photo807.jpg',
        extra: {postId: '1'},
      },
      {
        source: 'vk',
        id: 'vk-1000-01_20',
        originalId: '01_20',
        date: 1448049845,
        artist: 'Dreadnought',
        title: 'Cocaine',
        url: 'track20_url',
        duration: 148,
        channelId: 'vk-1000',
        cover: null,
        extra: {postId: '2'},
      },
      {
        source: 'vk',
        id: 'vk-1000-01_30',
        originalId: '01_30',
        date: 1448049845,
        artist: 'God Lives on the Sun',
        title: 'Chaika',
        url: 'track30_url',
        duration: 154,
        channelId: 'vk-1000',
        cover: 'post3_photo604.jpg',
        extra: {postId: '3'},
      },
    ]);
  });

  it('get tracks by track definition', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.getById?v=5.40&https=1&posts=-1000_99')
      .reply(200, RESPONSES.single_post);

    const tracks = await api.getTrack({
      id: 40,
      channelId: 'vk-1000',
      source: 'vk',
      extra: {postId: 99},
    });

    expect(tracks).toEqual([
      {
        source: 'vk',
        id: 'vk-1000-02_40',
        originalId: '02_40',
        date: 1448049846,
        artist: 'Libido Fuzz',
        title: 'Sweet Hours',
        url: 'track40_url',
        duration: 133,
        channelId: 'vk-1000',
        cover: null,
        extra: {postId: '99'},
      },
    ]);
  });

  it('gets channel last upadted date', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.40&https=1&owner_id=-1000&count=1')
      .reply(200, RESPONSES.posts);

    const lastUpdated = await api.getChannelLastUpdated('1000');
    expect(lastUpdated).toBe(1448112014);
  });

  it('applies middleware', async () => {
    nock('http://middleware.local')
      .get('/?v=5.40&https=1&owner_id=-1000&count=10')
      .reply(200, {response: {items: []}});

    function middleware(req) {
      req.url = 'http://middleware.local';

      return req;
    }

    const apiWithMiddleware = new VkAPI(null, middleware);
    const res = await apiWithMiddleware.getTracks('1000');
    expect(res).toEqual([]);
  });

  it('handles vk urls only', () => {
    expect(api.hasChannel('https://www.vk.com/channel'))
      .toBe(true);

    expect(api.hasChannel('http://vk.com/id1'))
      .toBe(true);

    expect(api.hasChannel('https://vk.com/woop'))
      .toBe(true);

    expect(api.hasChannel('https://www.vk.com/'))
      .toBe(false);

    expect(api.hasChannel('https://youtube.com/channelname'))
      .toBe(false);

    expect(api.hasChannel('foobar'))
      .toBe(false);

    expect(api.hasChannel('youtube/channel'))
      .toBe(false);
  });

});

const RESPONSES = {

  groups: {response: [{
    id: 26457580,
    name: 'E:\music\stoner',
    screen_name: 'e_music_stonerrock',
    is_closed: 0,
    type: 'page',
    is_admin: 0,
    is_member: 1,
    description: 'Group description',
    photo_50: 'photo_50.jpg',
    photo_100: 'photo_100.jpg',
    photo_200: 'photo_200.jpg',
  }]},

  groups_not_found: {error: {error_code: 100}},

  posts: {response:{
    count: 5170,
    items: [
      {
        id: 1,
        date: 1448112014,
        attachments: [
          {
            type: 'photo',
            photo: {
              photo_807: 'post1_photo807.jpg',
            },
          },
          {
            type: 'audio',
            audio: {
              id: 10,
              owner_id: '00',
              artist: 'Dreadnought',
              title: 'Feeling Good',
              duration: 214,
              date: 1448049845,
              url: 'track10_url',
            },
          },
        ],
      },
      {
        id: 2,
        date: 1448112013,
        attachments: [
          {
            type: 'audio',
            audio: {
              id: 20,
              owner_id: '01',
              artist: 'Dreadnought',
              title: 'Cocaine',
              duration: 148,
              date: 1448049845,
              url: 'track20_url',
            },
          },
        ],
      },
      {
        id: 3,
        date: 1448112012,
        attachments: [
          {
            type: 'photo',
            photo: {
              photo_604: 'post3_photo604.jpg',
            },
          },
          {
            type: 'audio',
            audio: {
              id: 30,
              owner_id: '01',
              artist: 'God Lives on the Sun',
              title: 'Chaika',
              duration: 154,
              date: 1448049845,
              url: 'track30_url',
            },
          },
        ],
      },
      {
        id: 4,
        date: 1448284802,
        attachments: [
          {
            type: 'video',
          },
          {
            type: 'link',
          },
        ],
      },
      {
        id: 5,
        date: 1448112012,
      },
    ],
  }},

  single_post: {response: [{
    id: 99,
    date: 1448284803,
    attachments: [
      {
        type: 'audio',
        audio: {
          id: 40,
          owner_id: '02',
          artist: 'Libido Fuzz',
          title: 'Sweet Hours',
          duration: 133,
          date: 1448049846,
          url: 'track40_url',
        },
      },
    ],
  }]},

};
