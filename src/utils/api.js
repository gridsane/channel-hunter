import superagent from 'superagent';
import VkAPI from '../apis/vk';
import APIWrapper from '../apis/api_wrapper';
import superagentJSONP from 'superagent-jsonp';

const externalApi = new APIWrapper({
  vk: new VkAPI(null, superagentJSONP),
});

export function getChannels() {
  return get('/api/channels');
}

export function getTracks(source, channelId) {
  return externalApi.getTracks(source, channelId);
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
