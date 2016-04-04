import superagent from 'superagent';
import VkAPI from '../apis/vk';
import YoutubeAPI from '../apis/youtube';
import APIWrapper from '../apis/api_wrapper';
import superagentJSONP from 'superagent-jsonp';

const externalApi = new APIWrapper({
  vk: new VkAPI(null, superagentJSONP),
  youtube: new YoutubeAPI(window.YOUTUBE_KEY),
});

export function getChannels() {
  return get('/api/channels');
}

export function getTracks(source, channelId) {
  return externalApi.getTracks(source, channelId);
}

export function getTrack(track) {
  return externalApi.getTrack(track);
}

function get(url, query) {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .query(query)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
}
