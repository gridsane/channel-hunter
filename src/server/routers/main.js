import fs from 'fs';
import path from 'path';

export default function (storage, config) {
  return {

    index: async function index(req, res) {

      let initialState = {
        feed: {
          channels: [],
          tracks: [],
          tracksSort: {prop: 'date', dir: 'desc'},
        },
      };

      fs.readFile(path.join(__dirname, '../../../index.html'), (err, template) => {
        res.send(template.toString()
          .replace('%YOUTUBE_KEY%', config.YOUTUBE_KEY || '')
          .replace('%ANALYTICS_ID%', config.ANALYTICS_ID || '')
          .replace('%INITIAL_STATE%', JSON.stringify(initialState))
        );
      });
    },

  };
}
