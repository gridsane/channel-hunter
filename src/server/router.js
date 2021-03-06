import channelsRouter from './routers/channels';
import tracksRouter from './routers/tracks';
import mainRouter from './routers/main';
import Storage from './storage';
import RedditAPI from '../api/reddit';
import YoutubeAPI from '../api/youtube';
import CompositeAPI from '../api/composite';
import config from '../config';

const storage = new Storage(config.MONGO_URI);
const api = new CompositeAPI({
  reddit: new RedditAPI(),
  youtube: new YoutubeAPI(config.YOUTUBE_KEY),
});

export default function (router) {

  const main = mainRouter(storage, config);
  const channels = channelsRouter(storage, api);
  const tracks = tracksRouter(api);

  router.get('/api/tracks/:source/:channelId', tracks.getTracks);
  router.get('/api/channels/tags', channels.getChannelsTags);
  router.get('/api/channels', channels.getChannels);
  router.post('/api/channels', channels.addChannel);
  router.get('/', main.index);

  return router;

}
