import superagent from 'superagent';

export function getChannels() {
  return get('/api/channels');
}

export function getTracks(source, channelId) {
  return get(`/api/tracks/${source}/${channelId}`);
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
