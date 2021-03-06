import Storage from './storage';
import RedditAPI from '../api/reddit';
import YoutubeAPI from '../api/youtube';
import CompositeAPI from '../api/composite';
import config from '../config';

const storage = new Storage(config.MONGO_URI);
const api = new CompositeAPI({
  youtube: new YoutubeAPI(config.YOUTUBE_KEY),
  reddit: new RedditAPI(),
});

const args = process.argv.slice(2);
const debug = Boolean(process.env.DEBUG);

function log() {
  if (debug) {
    console.log.apply(console, arguments);
  }
}

let promise;
switch (args[0]) {
  case 'update-channels':
    promise = require('./jobs/update-channels')(storage, api, log);
    break;
  case 'update-schema':
    promise = require('./jobs/update-schema')(storage, api, log);
    break;
  default:
    console.log('Available jobs are: \'update-channels\', \'update-schema\'');
}

if (promise) {
  promise
    .then(() => {
      log('Done');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error occuried');
      console.error(err);
      process.exit(1);
    });
} else {
  console.log('No jobs to run.');
}
