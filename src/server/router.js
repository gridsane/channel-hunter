import channelsRouter from './routers/channels';
import tracksRouter from './routers/tracks';
import Storage from './storage';
import YoutubeAPI from './apis/youtube';
import APIWrapper from './api_wrapper';
import {MONGO_URI, YOUTUBE_KEY} from '../../config';

export default function (router) {

  const storage = new Storage(MONGO_URI);
  const api = new APIWrapper({
    youtube: new YoutubeAPI(YOUTUBE_KEY),
  });

  const channels = channelsRouter(storage, api);
  const tracks = tracksRouter(api);

  router.get('/tracks/:source/:channelId', tracks.getTracks);
  router.get('/channels', channels.getChannels);
  router.post('/channels', channels.addChannel);

  return router;

}
