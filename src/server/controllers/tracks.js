export default function (api) {

  return {

    getTracks: async function (req, res, next) {
      try {
        const {source, channelId, pageData} = req.query;
        const data = await api.getTracks(source, channelId, pageData);

        res.json({data});
      } catch (error) {
        req.error = error;
        next();
      }
    },

  };

}
