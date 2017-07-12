import VkAPI from '../../src/api/vk';
import nock from 'nock';
import data from './vk_data.json';

describe('VK API', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('returns vk group by url', async () => {
    nock('https://api.vk.com/method')
      .get('/groups.getById?v=5.65&access_token=vk_key&https=1&group_id=e_music_stonerrock')
      .reply(200, data.groups);

    const channel = await getApi().getChannelByUrl('https://vk.com/e_music_stonerrock');

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
      .get('/groups.getById?v=5.65&access_token=vk_key&https=1&group_id=not_exists')
      .reply(200, data.groups_not_found);

    const channel = await getApi().getChannelByUrl('https://vk.com/not_exists');

    expect(channel).toBe(null);
  });

  it('returns updated channel with tags', async () => {
    nock('https://api.vk.com/method')
      .get('/groups.getById?v=5.65&access_token=vk_key&https=1&group_id=ORIGINAL_ID')
      .reply(200, data.groups);

    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.65&access_token=vk_key&https=1&owner_id=-ORIGINAL_ID&offset=0&count=10')
      .reply(200, data.posts);


    const channel = await getApi().getUpdatedChannel({
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

  it('handles vk urls only', () => {
    const api = getApi();

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
      .get('/wall.get?v=5.65&access_token=vk_key&https=1&owner_id=-1000&offset=0&count=10')
      .reply(200, data.posts);

    const tracks = await getApi().getTracks('1000');

    expect(tracks.nextPage).toEqual({offset: 10});
    expect(tracks.isLastPage).toBe(false);
  });

  it('returns tracks found on youtube', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.65&access_token=vk_key&https=1&owner_id=-1000&offset=0&count=10')
      .reply(200, data.two_posts);

    const youtubeMock = {
      findTracks: expect.createSpy(),
    };

    youtubeMock.findTracks.andCall(query => {
      if (query.startsWith('Silencer')) {
        return Promise.resolve([
          {title: 'Silencer - Nothing'},
          {title: 'Not relevant track'},
        ]);
      }

      return Promise.resolve([]);
    });

    const tracks = await getApi(youtubeMock).getTracks('1000');
    expect(tracks.list).toEqual([
      {
        title: 'Silencer - Nothing',
        channelId: 'vk-1000',
        date: 1448049845,
      },
    ]);

    expect(youtubeMock.findTracks).toHaveBeenCalledWith('Silencer - Nothing Full Album');
    expect(youtubeMock.findTracks).toHaveBeenCalledWith('Dreadnought - Cocaine Full Album');

  });

});

function getApi(youtubeApi = null) {
  return new VkAPI('vk_key', youtubeApi);
}


/*
  it('gets tracks by channel id', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.65&access_token=vk_key&https=1&owner_id=-1000&offset=0&count=10')
      .reply(200, data.posts);

    const tracks = await getApi().getTracks('1000');

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
      .get('/wall.get?v=5.65&access_token=vk_key&https=1&owner_id=-1000&offset=10&count=15')
      .reply(200, data.posts);

    const tracks = await getApi().getTracks('1000', {offset: 10, count: 15});

    expect(tracks.list.length).toBe(4);
    expect(tracks.nextPage).toEqual({offset: 25});
  });

  it('gets tracks by track definition', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.getById?v=5.65&access_token=vk_key&https=1&posts=-1000_99')
      .reply(200, data.post_by_id);

    const tracks = await getApi().getTrack({
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

  it('gets channel last updated date', async () => {
    nock('https://api.vk.com/method')
      .get('/wall.get?v=5.65&access_token=vk_key&https=1&owner_id=-1000&offset=0&count=1')
      .reply(200, data.posts);

    const lastUpdated = await getApi().getChannelLastUpdated('1000');
    expect(lastUpdated).toBe(1448112014);
  });

 */
