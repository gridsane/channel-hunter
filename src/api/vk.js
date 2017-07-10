import superagent from 'superagent';
import parseTags from '../utils/parse-tags';

const API_VERSION = '5.65';

export default class VkYoutubeAPI {

  constructor(key) {
    this.key = key;
  }

  async getChannelByUrl(url) {
    const channelName = url.split('/').splice(-1, 1)[0];
    return await this.getChannel(channelName, url);
  }

  async getUpdatedChannel(channel) {
    const [updatedChannel, posts] = await Promise.all([
      this.getChannel(channel.originalId),
      this.getPosts(channel.originalId, 0, 10),
    ]);

    const tags = posts.list.reduce((acc, post) => {
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
    const posts = await this.getPosts(channelId, 0, 1);
    return posts.list.length === 0 ? 0 : posts.list[0].date;
  }

  async getTracks(channelId, pageData = {}) {
    const {offset, count} = {offset: 0, count: 10, ...pageData};
    const {list: posts, isLastPage} = await this.getPosts(channelId, offset, count);
    return {
      list: getTracksFromPosts(posts, channelId),
      isLastPage,
      nextPage: {offset: offset + count},
    };
  }

  async getTrack(track) {
    const originalChannelId = track.channelId.substr(3);
    const posts = await this.request('wall.getById', {
      posts: `-${originalChannelId}_${track.extra.postId}`,
    });

    return getTracksFromPosts(posts, originalChannelId);
  }

  hasChannel(url) {
    return /^https?:\/\/(www\.)?vk.com\/.+/.test(url);
  }

  async getChannel(channelId, url = null) {
    const response = await this.request('groups.getById', {
      group_id: channelId,
    });

    if (!response) {
      return null;
    }

    return convertChannel(response[0], url);
  }

  async getPosts(channelId, offset, count = 10) {
    const response = await this.request('wall.get', {
      owner_id: '-' + channelId,
      offset,
      count,
    });

    if (!response || !response.items) {
      return {list: [], isLastPage: true};
    }

    return {
      isLastPage: response.offset + count <= response.count,
      list: response.items.reduce((acc, post) => {
        if (postHasAttachments(post)) {
          acc.push(post.copy_history
            // little hack to save original post id
            ? {...post.copy_history[0], id: post.id}
            : post);
        }

        return acc;
      }, []),
    };
  }

  request(method, params) {
    return new Promise((resolve, reject) => {
      superagent
        .get('https://api.vk.com/method/' + method)
        .query({
          v: API_VERSION,
          access_token: this.key,
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
}

function getTracksFromPosts(posts, channelId) {
  return posts
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


function postHasAttachments(post) {
  return post.attachments
    || (
      post.copy_history
      && post.copy_history[0]
      && post.copy_history[0].attachments
    );
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
