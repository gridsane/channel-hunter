import superagent from 'superagent';
import ReactPlayer from 'react-player';

const BASE_URL = 'https://www.reddit.com';
const URL_REGEXP = /^https?:\/\/(www\.)?reddit.com(\/.+)/;
const MEDIA_TYPES = ['youtube.com', 'soundcloud.com', 'vimeo.com'];

export default class RedditAPI {

  constructor(key) {
    this.key = key;
  }

  async getChannelByUrl(url) {
    const id = getChannelId(url);
    try {
      const tracks = await this.getTracks(id, {limit: 1});
      return convertChannel(id, tracks.list[0].cover);
    } catch (err) {
      return null;
    }
  }

  getUpdatedChannel(channel) {
    return channel;
  }

  async getChannelLastUpdated(channelId) {
    const tracks = await this.getTracks(channelId, {limit: 10});
    return tracks.list.length ? tracks.list[0].date : null;
  }

  async getTracks(channelId, pageData = {}) {
    const data = await request(channelId, pageData);
    const list = data.children
      .filter(post => (
        post.data.media && MEDIA_TYPES.indexOf(post.data.media.type) !== -1
      ))
      .map(post => convertTrack(channelId, post.data))
      .filter(track => ReactPlayer.canPlay(track.url));

    return {
      list,
      isLastPage: !data.after,
      nextPage: {after: data.after},
    };
  }

  getTrack(track) {
    return [track];
  }

  hasChannel(url) {
    return URL_REGEXP.test(url);
  }
}

function getChannelId(url) {
  const match = url.match(URL_REGEXP);
  return match[2];
}

function convertChannel(id, image = null) {
  return {
    source: 'reddit',
    id: 'reddit-' + id,
    originalId: id,
    name: id,
    description: '',
    image,
    imageLarge: image,
    createdAt: null,
    url: BASE_URL + id,
    tags: [],
  };
}

function convertTrack(channelId, data) {
  return {
    source: 'reddit',
    id: `reddit-${channelId}-${data.id}`,
    originalId: data.id,
    date: data.created_utc,
    artist: null,
    title: data.title,
    url: data.url,
    duration: null,
    channelId: 'reddit-' + channelId,
    cover: data.preview.images[0].source.url,
    extra: {permalink: data.permalink},
  };
}

function request(part, params) {
  return new Promise((resolve, reject) => {
    superagent
      .get(`${BASE_URL}${part}/new.json`)
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
