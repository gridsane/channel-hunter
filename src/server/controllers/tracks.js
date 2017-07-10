export default function (api) {

  return {

    getTracks: async function (req, res, next) {
      try {
        const {source, channelId} = req.query;
        const data = await api.getTracks(source, channelId);

        res.json({data});
      } catch (error) {
        req.error = error;
        next();
      }
    },

  };

}
