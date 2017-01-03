import superagent from 'superagent';
import YoutubeAPI from './youtube';
import RedditAPI from './reddit';
import CompositeAPI from './composite';

const externalApi = new CompositeAPI({
  youtube: new YoutubeAPI(window.YOUTUBE_KEY),
  reddit: new RedditAPI(),
});

export function getChannels() {
  return get('/api/channels');
}

export function getChannelsTags() {
  return get('/api/channels/tags');
}

export function searchChannels(q) {
  return get('/api/channels', {q});
}

export function addChannel(url) {
  return post('/api/channels', {url});
}

export function getTracks(source, channelId, pageData = {}) {
  return externalApi.getTracks(source, channelId, pageData);
}

export function getTrack(track) {
  return externalApi.getTrack(track);
}

export function getChannelUrlSource(url) {
  return externalApi.getChannelUrlSource(url);
}

export function getChannelLastUpdated(source, channelId) {
  return externalApi.getChannelLastUpdated(source, channelId);
}

function get(url, query) {
  return createAbortablePromise(
    superagent.get(url).query(query)
  );
}

function post(url, data) {
  return createAbortablePromise(
    superagent
      .post(url)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(data))
  );
}

function createAbortablePromise(request) {
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
