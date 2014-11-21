var express = require('express');
var superagent = require('superagent');
var app = express();
var apiRouter = express.Router();

apiRouter.get('/stream/:stream', function (req, res) {
  superagent
    .get('https://api.vk.com/method/wall.get')
    .query({
      owner_id: '-' + req.params.stream,
      v: 5.26
    })
    .end(function (vkRes) {
      var audios = [];
      var posts = vkRes.body.response.items;
      var pl = posts.length
      for (var i = 0; i < pl; i++) {
        var attachments = posts[i].attachments;
        if (attachments) {
          var al = attachments.length;
          for (var j = 0; j < al; j++) {
            if ('audio' === attachments[j].type) {
              audios.push(attachments[j].audio);
            }
          }
        }
      };

      res.json({
        count: vkRes.body.response.count,
        data: audios
      });
    });
});

app
  .use('/assets', express.static(__dirname + '/../assets'))
  .use('/api', apiRouter)
  .use(function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
  })
  .listen(9090, function () {
    console.log("Server listening on port 9090");
  });
