import superagent from 'superagent';

export default class VkAPI {

  constructor(key) {
    this.key = key;
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
      owner_id: "-" + channelId,
      count: maxResults,
    });

    let tracks = [];
    response.items.forEach((post) => {
      let cover = null;

      if (!post.attachments) {
        return;
      }

      const photoAttachment = post.attachments.find((attachment) => {
        return attachment.type === 'photo';
      });

      if (photoAttachment) {
        cover = photoAttachment.photo.photo_807;
      }

      post.attachments.forEach((attachment) => {
        if (attachment.type === 'audio') {
          tracks.push(this._convertTrack(attachment.audio, channelId, cover));
        }
      });
    });

    return tracks;
  }

  hasChannel(url) {
    return /^https?:\/\/(www\.)?vk.com\//.test(url);
  }

  _request(method, params) {
    return new Promise((resolve, reject) => {
      superagent
        .get("https://api.vk.com/method/" + method)
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

  _convertChannel(res) {
    return {
      source: 'vk',
      id: res.id.toString(),
      name: res.name,
      description: res.description,
      image: res.photo_100,
      createdAt: null,
    };
  }

  _convertTrack(audio, channelId, cover) {
    return {
      source: 'vk',
      id: audio.id.toString(),
      date: audio.date,
      artist: audio.artist,
      title: audio.title,
      url: audio.url,
      duration: audio.duration,
      channelId: channelId,
      cover: cover,
    };
  }

}
