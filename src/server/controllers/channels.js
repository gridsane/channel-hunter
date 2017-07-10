export default function (storage, api) {
  return {
    async getChannels(req, res, next) {
      try {
        const channels = req.query && req.query.q
          ? await storage.searchChannels(req.query.q)
          : await storage.getChannels();

        res.json(channels);
      } catch(error) {
        req.error = error;
        next();
      }
    },

    async addChannel(req, res, next) {
      try {
        const apiChannel = await api.getChannelByUrl(req.body.url);

        if (!apiChannel) {
          throw new Error(`Cannot get channel "${req.body.url}"`);
        }

        const channel = await storage.addOrUpdateChannel(apiChannel);
        res.json(channel);
      } catch (error) {
        req.error = error;
        next();
      }
    },

    async getChannelsTags(req, res, next) {
      try {
        const tags = await storage.getChannelsTags(2);
        res.json(tags);
      } catch (error) {
        req.error = error;
        next();
      }
    },
  };
}
