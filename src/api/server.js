import superagent from 'superagent';

const BASE_PATH = '/api';
const VK_URL_REGEXP = /^https?:\/\/(www\.)?vk.com\/.+/;
const SOURCES = ['vk'];

export default class ServerAPI {

  constructor(source) {
    this.source = source;

    if (!SOURCES.includes(source)) {
      throw new Error(`Unknown source ${source}`);
    }
  }

  async getChannelByUrl() {
    return null;
  }

  getUpdatedChannel(channel) {
    return channel;
  }

  async getChannelLastUpdated() {
    return null;
  }

  getTracks(channelId, pageData = {}) {
    return request('/tracks', {
      ...pageData,
      source: this.source,
      channelId,
    });
  }

  getTrack(track) {
    return [track];
  }

  hasChannel(url) {
    switch (this.source) {
      case 'vk':
        return VK_URL_REGEXP.test(url);
      default:
        return false;
    }
  }
}

function request(path, params) {
  return new Promise((resolve, reject) => {
    superagent
      .get(`${BASE_PATH}${path}`)
      .query(params)
      .end((err, res) => {
        if (err || !res || !res.body) {
          reject(err);
          return;
        }

        resolve(res.body.data);
      });
  });
}
