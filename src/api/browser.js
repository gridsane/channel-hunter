import superagent from 'superagent';
import VkAPI from './vk';
import YoutubeAPI from './youtube';
import CompositeAPI from './composite';
import superagentJSONP from 'superagent-jsonp';

const externalApi = new CompositeAPI({
  vk: new VkAPI(null, superagentJSONP),
  youtube: new YoutubeAPI(window.YOUTUBE_KEY),
});

export function getChannels() {
  return get('/api/channels');
}

export function searchChannels(q) {
  return get('/api/channels', {q});
}

export function getTracks(source, channelId) {
  return externalApi.getTracks(source, channelId);
}

export function getTrack(track) {
  return externalApi.getTrack(track);
}

export function getChannelUrlSource(url) {
  return externalApi.getChannelUrlSource(url);
}

function get(url, query) {
  const request = superagent.get(url).query(query);
  const promise = new Promise((resolve, reject) => {
    request.end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body);
      }
    });
  });

  // shameless 'abort' plug
  promise.abort = () => request.abort();

  return promise;
}
