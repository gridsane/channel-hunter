import channelsRouter from './routers/channels';
import tracksRouter from './routers/tracks';
import mainRouter from './routers/main';
import Storage from './storage';
import YoutubeAPI from '../apis/youtube';
import VkAPI from '../apis/vk';
import APIWrapper from '../apis/api_wrapper';
import * as config from '../config';

const storage = new Storage(config.MONGO_URI);
const api = new APIWrapper({
  youtube: new YoutubeAPI(config.YOUTUBE_KEY),
  vk: new VkAPI(),
});

export default function (router) {

  const main = mainRouter(storage, config);
  const channels = channelsRouter(storage, api);
  const tracks = tracksRouter(api);

  router.get('/api/tracks/:source/:channelId', tracks.getTracks);
  router.get('/api/channels', channels.getChannels);
  router.post('/api/channels', channels.addChannel);
  router.get('/', main.index);

  return router;

}
