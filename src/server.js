var express = require("express");
var api = require("./server/api")();
var app = express();
var apiRouter = express.Router();
var config = {
  port: process.env.PORT || 5000
};


apiRouter.get("/stream/:stream", function (req, res) {
  api.getStream(req.params.stream).then(function (data) {
    res.json(data);
  });
});

apiRouter.get("/streams", function (req, res) {
  res.json([
    26457580,
    76475061,
  ]);
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
