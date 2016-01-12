import fs from 'fs';
import path from 'path';

export default function (storage) {
  return {

    index: async function index(req, res) {

      const channels = await storage.getChannels();
      const initialState = {
        tracks: {
          selected: null,
          isPlaying: false,
          isLoading: false,
          sort: {attr: 'date', dir: 'desc'},
          items: [],
        },
        channels: {
          isLoading: false,
          items: channels.map(function (channel) {
            return Object.assign(channel, {
              isEnabled: false,
              isLoading: false,
              isLoaded: false,
            });
          }),
        },
      };

      fs.readFile(path.join(__dirname, '../../../index.html'), (err, template) => {
        res.send(template.toString().replace(
          '%INITIAL_STATE%',
          JSON.stringify(initialState)
        ));
      });
    },

  };
}
