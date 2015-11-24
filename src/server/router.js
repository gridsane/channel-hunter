import channelsRouter from './routers/channels';
import tracksRouter from './routers/tracks';
import mainRouter from './routers/main';
import Storage from './storage';
import YoutubeAPI from './apis/youtube';
import VkAPI from './apis/vk';
import APIWrapper from './api_wrapper';
import {MONGO_URI, YOUTUBE_KEY} from '../../config';

const storage = new Storage(MONGO_URI);
const api = new APIWrapper({
  youtube: new YoutubeAPI(YOUTUBE_KEY),
  vk: new VkAPI(),
});

export default function (router) {

  const main = mainRouter(storage, api);
  const channels = channelsRouter(storage, api);
  const tracks = tracksRouter(api);

  router.get('/api/tracks/:source/:channelId', tracks.getTracks);
  router.get('/api/channels', channels.getChannels);
  router.post('/api/channels', channels.addChannel);
  router.get('/', main.index);

  return router;

}
