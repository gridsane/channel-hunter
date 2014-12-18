var Q = require("q");
var _ = require("lodash");
var superagent = require("superagent");
var Cache = require("./cache");
var cache = new Cache();

var Api = function () {
}

Api.prototype.request = function (method, params) {
  var deferred = Q.defer();

  superagent
    .get("https://api.vk.com/method/" + method)
    .query({
      v: 5.26
    })
    .query(params)
    .end(function (err, res) {
      if (err || "undefined" === typeof(res)) {
        deferred.reject(err);
      }

      if (res.body.error) {
        deferred.reject(res.body.error);
      }

      deferred.resolve(res.body.response)
    });

  return deferred.promise;
}

Api.prototype.getTracks = function (channelId) {
  channelId = parseInt(channelId);
  var cacheId = "api::getTracks::" + channelId;
  var result = cache.get(cacheId);

  if (result) {
    return Q.fcall(function () {
      return result;
    });
  }

  var deferred = Q.defer();

  this.request("wall.get", {
    owner_id: "-" + channelId,
  }).then(function (response) {
    var audios = [];

    for (var i = response.items.length - 1; i >= 0; i--) {
      var attachments = response.items[i].attachments;
      if (attachments) {
        var cover = null;
        for (var j = attachments.length - 1; j >= 0; j--) {
          if (!cover && "photo" === attachments[j].type) {
            cover = attachments[j].photo.photo_604;
          }
        }

        for (var j = attachments.length - 1; j >= 0; j--) {
          if ("audio" === attachments[j].type) {
            var audio = {
              id: attachments[j].audio.owner_id + '_' + attachments[j].audio.id,
              date: response.items[i].date,
              artist: attachments[j].audio.artist,
              title: attachments[j].audio.title,
              url: attachments[j].audio.url,
              duration: attachments[j].audio.duration,
              channelId: channelId
            };

            if (cover) {
              audio.cover = cover;
            }

            audios.push(audio);
          }
        };
      }
    };

    cache.set(cacheId, audios, 60);
    deferred.resolve(audios);
  }, function (err) {
    deferred.resolve(err);
  });

  return deferred.promise;
}

Api.prototype.getChannel = function (channelUrl) {

  var match = (/\/?([^\/]+)$/g).exec(channelUrl);
  if (!Array.isArray(match) || !match[1]) {
    return Q.fcall(function () {
      return {};
    });
  }

  var channelName = match[1];
  var cacheId = "api::getChannels::" + channelName;

  var result = cache.get(cacheId);
  if (result) {
    return Q.fcall(function () {
      return result;
    });
  }

  var deferred = Q.defer();

  this.request("groups.getById", {group_id: channelName})
    .then(function (response) {
      var channel = {};

      if (response[0]) {
        channel = {
          id: response[0].id,
          name: response[0].name,
          description: response[0].description,
          url: 'http://vk.com/' + response[0].screen_name
        }
      }

      cache.set(cacheId, channel, 600);
      deferred.resolve(channel);
    }, function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

module.exports = function () {
  return new Api();
};
