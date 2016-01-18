import VkAPI from '../../src/apis/vk';
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
      image: 'https://pp.vk.me/...2a1/x2sP4RGbPpQ.jpg',
      createdAt: null,
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
        id: 'vk-415029890',
        originalId: '415029890',
        date: 1448049845,
        artist: 'Dreadnought',
        title: 'Feeling Good',
        url: 'https://cs3-3v4.v...d9jyaYxXpr9Sri2ykMw',
        duration: 214,
        channelId: 'vk-1000',
        cover: 'https://pp.vk.me/...b37/ep7zbIzb7mU.jpg',
      },
      {
        source: 'vk',
        id: 'vk-415071124',
        originalId: '415071124',
        date: 1448049845,
        artist: 'Dreadnought',
        title: 'Cocaine',
        url: 'https://cs3-3v4.v...-fmz6Qfe9dlNpzVShVT',
        duration: 148,
        channelId: 'vk-1000',
        cover: null,
      },
    ]);

  });

  it('handles vk urls only', () => {

    expect(api.hasChannel('https://www.vk.com/channel'))
      .toBe(true);

    expect(api.hasChannel('http://vk.com/id1'))
      .toBe(true);

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
    photo_50: 'https://pp.vk.me/...2a2/-s27zwd-3lw.jpg',
    photo_100: 'https://pp.vk.me/...2a1/x2sP4RGbPpQ.jpg',
    photo_200: 'https://pp.vk.me/...2a0/jpJIcASHGdA.jpg',
  }]},

  groups_not_found: {error: {error_code: 100}},

  posts: {response:{
    count:5170,
    items:[
      {
        id:72651,
        from_id:-26457580,
        owner_id:-26457580,
        date:1448112012,
        post_type:'post',
        text:'text',
        is_pinned:1,
        attachments:[
          {
            type:'photo',
            photo:{
              id:389526038,
              album_id:-7,
              owner_id:-26457580,
              user_id:100,
              photo_807:'https://pp.vk.me/...b37/ep7zbIzb7mU.jpg',
              photo_1280:'https://pp.vk.me/...b38/oOKgHmhSyyw.jpg',
              photo_2560:'https://pp.vk.me/...b39/K5wXUkE9h1M.jpg',
              width:2000,
              height:2000,
              text:'',
              date:1448037831,
              access_key:'47d415556781d090d5',
            },
          },
          {
            type:'audio',
            audio:{
              id:415029890,
              owner_id:2000397583,
              artist:'Dreadnought',
              title:'Feeling Good',
              duration:214,
              date:1448049845,
              url:'https://cs3-3v4.v...d9jyaYxXpr9Sri2ykMw',
              album_id:2,
              genre_id:18,
            },
          },
        ],
        post_source:{type:'vk'},
        comments:{count:15, can_post:1},
        likes:{count:317, user_likes:0, can_like:1, can_publish:1},
        reposts:{count:114, user_reposted:0},
      },
      {
        id:72652,
        from_id:-26457580,
        owner_id:-26457580,
        date:1448112012,
        post_type:'post',
        text:'text',
        is_pinned:1,
        attachments:[
          {
            type:'audio',
            audio:{
              id:415071124,
              owner_id:2000396246,
              artist:'Dreadnought',
              title:'Cocaine',
              duration:148,
              date:1448049845,
              url:'https://cs3-3v4.v...-fmz6Qfe9dlNpzVShVT',
              album_id:2,
              genre_id:18,
            },
          },
        ],
        post_source:{type:'vk'},
        comments:{count:15, can_post:1},
        likes:{count:317, user_likes:0, can_like:1, can_publish:1},
        reposts:{count:114, user_reposted:0},
      },
      {
        id:72736,
        from_id:-26457580,
        owner_id:-26457580,
        date:1448284802,
        post_type:'post',
        text:'text',
        signer_id:12953507,
        attachments:[
          {
            type:'video',
            video:{
              id:172094316,
              owner_id:-26457580,
              title:'ARIDO - DESERT (OFFICIAL VIDEO)',
              duration:370,
              description:'description',
              date:1447671046,
              views:50,
              comments:0,
              photo_130:'https://pp.vk.me/...ideo/s_f9143666.jpg',
              photo_320:'https://pp.vk.me/...ideo/l_2b6ba388.jpg',
              photo_640:'https://pp.vk.me/...ideo/y_0c34e9bf.jpg',
              access_key:'f0aeeac105a7e01e75',
            },
          },
          {
            type:'link',
            link:{
              url:'http://arido.bandcamp.com',
              title:'Desert in my soul, by ARIDO',
              description:'7 track album',
              photo:{
                id:389595097,
                album_id:-2,
                owner_id:12953507,
                photo_75:'https://pp.vk.me/...46a/hzC_nIC82GM.jpg',
                photo_130:'https://pp.vk.me/...46b/MabY72JqUJw.jpg',
                photo_604:'https://pp.vk.me/...46c/APqWuwx5MCw.jpg',
                width:150,
                height:150,
                text:'',
                date:1447671545,
              },
            },
          },
        ],
        post_source:{type:'vk'},
        comments:{count:2, can_post:1},
        likes:{count:8, user_likes:0, can_like:1, can_publish:1},
        reposts:{count:1, user_reposted:0},
      },
      {
        id:7265333,
        from_id:-26457580,
        owner_id:-26457580,
        date:1448112012,
        post_type:'post',
        text:'text',
        is_pinned:1,
      },
    ],
  }},

};
