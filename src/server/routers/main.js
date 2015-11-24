import fs from 'fs';
import path from 'path';

export default function (storage, api) {
  return {

    index: async function index(req, res) {
      let tracks = {
        selected: null,
        isPlaying: false,
        isLoading: false,
        items: {},
      };

      let channels = {
        isLoading: false,
        items: await storage.getChannels(),
        picked: [],
      };

      let tracksPromises = [];

      channels.items.forEach((channel) => {
        if (channel.source === 'vk') {
          channels.picked.push(channel.id);
        }

        tracksPromises.push(api.getTracks(channel.source, channel.id));
      });

      const channelsTracks = await Promise.all(tracksPromises);
      channelsTracks.forEach((items) => {
        items.forEach((item) => {
          tracks.items[item.id] = item;
        });
      });

      fs.readFile(path.join(__dirname, '../../../index.html'), (err, template) => {
        res.send(template.toString().replace('%INITIAL_STATE%', JSON.stringify({
          channels,
          tracks,
        })));
      });
    },

  };
}
