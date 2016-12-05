import VkAPI from '../../src/api/vk';
import nock from 'nock';
import data from './vk_data.json';

describe('VK API', () => {

  const api = new VkAPI();

  afterEach(() => {
    nock.cleanAll();
  });

  it('gets vk group by url', async () => {
    nock('https://api.vk.com/method')
      .get('/groups.getById?v=5.40&https=1&group_id=e_music_stonerrock')
      .reply(200, data.groups);

    const channel = await api.getChannelByUrl('https://vk.com/e_music_stonerrock');

    expect(channel).toEqual({
      source: 'vk',
      id: 'vk-26457580',
      originalId: '26457580',
      name: 'stoner',
      description: 'Group description #desc_tag #rock',
      image: 'photo_100.jpg',
      imageLarge: 'photo_200.jpg',
      createdAt: null,
      url: 'https://vk.com/e_music_stonerrock',
      tags: ['descTag', 'rock'],
    });
  });

  it('returns null if no channel found', async () => {
    nock('https://api.vk.com/method')
      .get('/groups.getById?v=5.40&https=1&group_id=not_exists')
      .reply(200, data.groups_not_found);

    const channel = await api.getChannelByUrl('https://vk.com/not_exists');

    expect(channel).toBe(null);
  });

  it('gets updated channel with tags', async () => {
    nock('https://api.vk.com/method')
      .get('/groups.getById?v=5.40&https=1&group_id=ORIGINAL_ID')
      .reply(200, data.groups);

    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.40&https=1&owner_id=-ORIGINAL_ID&offset=0&count=10')
      .reply(200, data.posts);


    const channel = await api.getUpdatedChannel({
      source: 'vk',
      originalId: 'ORIGINAL_ID',
    });

    expect(channel).toEqual({
      source: 'vk',
      id: 'vk-26457580',
      originalId: '26457580',
      name: 'stoner',
      description: 'Group description #desc_tag #rock',
      image: 'photo_100.jpg',
      imageLarge: 'photo_200.jpg',
      createdAt: null,
      url: 'https://vk.com/e_music_stonerrock',
      tags: ['descTag', 'rock', 'stoner', 'bluesRock'],
    });

  });

  it('gets tracks by channel id', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.40&https=1&owner_id=-1000&offset=0&count=10')
      .reply(200, data.posts);

    const tracks = await api.getTracks('1000');

    expect(tracks.list).toEqual([
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
      {
        source: 'vk',
        id: 'vk-1000-500_50',
        originalId: '500_50',
        date: 1439868070,
        artist: 'Russell Shaw',
        title: 'The Horned Reaper',
        url: 'track50_url',
        duration: 188,
        channelId: 'vk-1000',
        cover: 'post6_photo604.jpg',
        extra: {postId: '6'},
      },
    ]);
  });

  it('gets tracks by page', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.40&https=1&owner_id=-1000&offset=10&count=15')
      .reply(200, data.posts);

    const tracks = await api.getTracks('1000', {offset: 10, count: 15});

    expect(tracks.list.length).toBe(4);
    expect(tracks.nextPage).toEqual({offset: 25});
  });

  it('gets tracks by track definition', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.getById?v=5.40&https=1&posts=-1000_99')
      .reply(200, data.single_post);

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
      .get('/wall.get?v=5.40&https=1&owner_id=-1000&offset=0&count=1')
      .reply(200, data.posts);

    const lastUpdated = await api.getChannelLastUpdated('1000');
    expect(lastUpdated).toBe(1448112014);
  });

  it('applies middleware', async () => {
    nock('http://middleware.local')
      .get('/?v=5.40&https=1&owner_id=-1000&offset=0&count=10')
      .reply(200, {response: {items: []}});

    function middleware(req) {
      req.url = 'http://middleware.local';

      return req;
    }

    const apiWithMiddleware = new VkAPI(null, middleware);
    const res = await apiWithMiddleware.getTracks('1000');
    expect(res.list).toEqual([]);
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

  it('contains next page data', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.40&https=1&owner_id=-1000&offset=0&count=10')
      .reply(200, data.posts);

    const tracks = await api.getTracks('1000');

    expect(tracks.nextPage).toEqual({offset: 10});
    expect(tracks.isLastPage).toBe(false);
  });
});
