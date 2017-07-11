import channelsController from './controllers/channels';
import tracksController from './controllers/tracks';
import mainController from './controllers/main';
import errorController from './controllers/error';
import Storage from './storage';
import RedditAPI from '../api/reddit';
import YoutubeAPI from '../api/youtube';
import VkAPI from '../api/vk';
import CompositeAPI from '../api/composite';
import config from '../config';

const storage = new Storage(config.MONGO_URI);

const youtubeApi = new YoutubeAPI(config.YOUTUBE_KEY);
const api = new CompositeAPI({
  reddit: new RedditAPI(),
  youtube: youtubeApi,
  vk: new VkAPI(config.VK_KEY, youtubeApi),
});

export default function (router) {

  const main = mainController(storage, config);
  const channels = channelsController(storage, api);
  const tracks = tracksController(api);

  router.get('/api/tracks', tracks.getTracks, errorController);
  router.get('/api/channels', channels.getChannels, errorController);

  router.post('/api/channels', channels.addChannel, errorController);

  router.get('/', main.index);

  return router;

}
