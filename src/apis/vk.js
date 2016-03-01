import superagent from 'superagent';

export default class VkAPI {

  constructor(key, middleware = null) {
    this.key = key;
    this.middleware = middleware;
  }

  async getChannelByUrl(url) {
    const channelName = url.split('/').splice(-1, 1)[0];
    const response = await this._request('groups.getById', {
      group_id: channelName,
    });

    if (!response) {
      return null;
    }

    return this._convertChannel(response[0]);
  }

  async getTracks(channelId, maxResults = 10) {
    const response = await this._request('wall.get', {
      owner_id: '-' + channelId,
      count: maxResults,
    });

    return this._getTracksFromPosts(response.items, channelId);
  }

  async getTrack(track) {
    const response = await this._request('wall.getById', {
      posts: `-${track.channelId}_${track.extra.postId}`,
    });

    return this._getTracksFromPosts(response, track.channelId);
  }

  hasChannel(url) {
    return /^https?:\/\/(www\.)?vk.com\//.test(url);
  }

  _request(method, params) {
    return new Promise((resolve, reject) => {
      superagent
        .get('https://api.vk.com/method/' + method)
        .use(this.middleware || (x => x))
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

  _getTracksFromPosts(posts, channelId) {
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
          .filter((attachment) => attachment.type === 'audio')
          .map((attachment) => this._convertTrack(attachment.audio, channelId, cover, post.id));
      })
      .reduce((prev, curr) => {
        prev.push(...curr);
        return prev;
      }, []);
  }

  _convertChannel(res) {
    const id = res.id.toString();

    return {
      source: 'vk',
      id: 'vk-' + id,
      originalId: id,
      name: res.name,
      description: res.description,
      image: res.photo_100,
      createdAt: null,
    };
  }

  _convertTrack(audio, channelId, cover, postId) {
    const id = audio.id.toString();

    return {
      source: 'vk',
      id: 'vk-' + id,
      originalId: id,
      date: audio.date,
      artist: audio.artist,
      title: audio.title,
      url: audio.url,
      duration: audio.duration,
      channelId: 'vk-' + channelId,
      cover: cover,
      extra: {postId: postId.toString()},
    };
  }

}
