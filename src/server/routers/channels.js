export default function (storage, api) {

  return {

    getChannels: async function (req, res) {

      try {

        const channels = await storage.getChannels();
        res.json(channels);

      } catch(error) {

        handleError(res, error);

      }

    },

    addChannel: async function (req, res) {

      try {

        const apiChannel = await api.getChannelByUrl(req.body.url);
        const channel = await storage.addOrUpdateChannel(apiChannel);
        res.json(channel);

      } catch (error) {

        handleError(res, error);

      }

    },

  };

}

function handleError(res, error) {

  console.error(error);

  res.json({
    error: 'Oops, error occured.',
  });

}
