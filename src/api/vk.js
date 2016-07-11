import superagent from 'superagent';
import parseTags from '../utils/parse-tags';

export default class VkAPI {

  constructor(key, middleware = null) {
    this.key = key;
    this.middleware = middleware;
  }

  async getChannelByUrl(url) {
    const channelName = url.split('/').splice(-1, 1)[0];
    return await getChannel(this.middleware, channelName, url);
  }

  async getUpdatedChannel(channel) {
    const [updatedChannel, posts] = await Promise.all([
      getChannel(this.middleware, channel.originalId),
      getPosts(this.middleware, channel.originalId, 10),
    ]);

    const tags = posts.reduce((acc, post) => {
      parseTags(post.text).forEach((tag) => {
        if (acc.indexOf(tag) === -1) {
          acc.push(tag);
        }
      });
      return acc;
    }, updatedChannel.tags);

    return {...updatedChannel, tags};
  }

  async getChannelLastUpdated(channelId) {
    const posts = await getPosts(this.middleware, channelId, 1);
    return posts.length === 0 ? 0 : posts[0].date;
  }

  async getTracks(channelId, maxResults = 10) {
    const posts = await getPosts(this.middleware, channelId, maxResults);
    return getTracksFromPosts(posts, channelId);
  }

  async getTrack(track) {
    const originalChannelId = track.channelId.substr(3);
    const posts = await apiRequest(this.middleware, 'wall.getById', {
      posts: `-${originalChannelId}_${track.extra.postId}`,
    });

    return getTracksFromPosts(posts, originalChannelId);
  }

  hasChannel(url) {
    return /^https?:\/\/(www\.)?vk.com\/.+/.test(url);
  }
}

async function getChannel(middleware, channelId, url = null) {
  const response = await apiRequest(middleware, 'groups.getById', {
    group_id: channelId,
  });

  if (!response) {
    return null;
  }

  return convertChannel(response[0], url);
}

async function getPosts(middleware, channelId, count = 10) {
  const response = await apiRequest(middleware, 'wall.get', {
    owner_id: '-' + channelId,
    count,
  });

  if (response && response.items) {
    return response.items.filter(p => p.attachments);
  }

  return [];
}

function getTracksFromPosts(posts, channelId) {
  return posts
    .filter((post) => post.attachments)
    .map((post) => {
      const photoAttachment = post.attachments.find((attachment) => {
        return attachment.type === 'photo';
      });

      const cover = photoAttachment
        ? (photoAttachment.photo.photo_807 || photoAttachment.photo.photo_604)
        : null;

      return post.attachments
        .filter((attachment) => attachment.type === 'audio' && attachment.audio.url)
        .map((attachment) => convertTrack(attachment.audio, channelId, cover, post.id));
    })
    .reduce((prev, curr) => {
      prev.push(...curr);
      return prev;
    }, []);
}

function convertChannel(res, url) {
  const id = res.id.toString();

  return {
    source: 'vk',
    id: 'vk-' + id,
    originalId: id,
    name: res.name,
    description: res.description,
    image: res.photo_100,
    imageLarge: res.photo_200,
    createdAt: null,
    url: url || `https://vk.com/${res.screen_name}`,
    tags: parseTags(res.description),
  };
}

function convertTrack(audio, channelId, cover, postId) {
  const id = [audio.owner_id.toString(), audio.id.toString()].join('_');

  return {
    source: 'vk',
    id: `vk-${channelId}-${id}`,
    originalId: id,
    date: audio.date,
    artist: audio.artist,
    title: audio.title,
    url: `${audio.url}`,
    duration: audio.duration,
    channelId: 'vk-' + channelId,
    cover: cover,
    extra: {postId: postId.toString()},
  };
}

function apiRequest(middleware, method, params) {
  return new Promise((resolve, reject) => {
    superagent
      .get('https://api.vk.com/method/' + method)
      .use(middleware || (x => x))
      .query({
        v: '5.40',
        https: 1,
      })
      .query(params)
      .end((err, res) => {
        if (err || !res || !res.body) {
          reject(err);
          return;
        }

        if (res.body.error) {
          resolve(null);
          return;
        }

        resolve(res.body.response);
      });
  });
}
