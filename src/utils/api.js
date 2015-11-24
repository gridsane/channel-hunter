import superagent from 'superagent';

export async function getChannels() {
   return await get('/api/channels');
}

export async function getTracks(source, channelId) {
   return await get(`/api/tracks/${source}/${channelId}`);
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
