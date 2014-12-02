var express = require("express");
var api = require("./server/api")();
var app = express();
var apiRouter = express.Router();
var config = {
  port: process.env.PORT || 5000
};

apiRouter.get("/tracks/:channelId", function (req, res) {
  api.getTracks(req.params.channelId).then(function (data) {
    res.json(data);
  }, function () {
    res.json([]);
  });
});

apiRouter.get("/channels", function (req, res) {
  api.getChannels(req.query.urls).then(function (data) {
    res.json(data);
  }, function () {
    res.json([]);
  });
});

app
  .use("/assets", express.static(__dirname + "/../assets"))
  .use("/api", apiRouter)
  .use(function (req, res, next) {
    res.sendFile(__dirname + "/index.html");
  })
  .listen(config.port, function () {
    console.log("Server listening on port " + config.port);
  });
