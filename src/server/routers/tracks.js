export default function (api) {

  return {

    getTracks: async function (req, res) {

      try {

        const {source, channelId} = req.params;
        const tracks = await api.getTracks(source, channelId);

        res.json(tracks);

      } catch (error) {

        console.error(error);

        res.json({
          error: 'Oops, error occured.',
        });

      }

    },

  };

}
