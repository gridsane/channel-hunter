export default function (storage, api) {
  return {
    async getChannels(req, res) {
      try {
        const channels = req.query && req.query.q
          ? await storage.searchChannels(req.query.q)
          : await storage.getChannels();

        res.json(channels);
      } catch(error) {
        handleError(res, error);
      }
    },

    async addChannel(req, res) {
      try {
        const apiChannel = await api.getChannelByUrl(req.body.url);
        const channel = await storage.addOrUpdateChannel(apiChannel);
        res.json(channel);
      } catch (error) {
        handleError(res, error);
      }
    },

    async getChannelsTags(req, res) {
      try {
        const tags = await storage.getChannelsTags();
        res.json(tags);
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
