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
    .end(function (res) {
      if (res.body.error) {
        deferred.reject(res.body.error);
      }

      deferred.resolve(res.body.response)
    });

  return deferred.promise;
}

Api.prototype.getTracks = function (channelId) {
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
            var audio = attachments[j].audio;
            audio.date = response.items[i].date;

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

Api.prototype.getChannels = function (channelUrls) {
  var regex = /\/?([^\/]+)$/g;
  var channelNames = _.map(channelUrls, function (url) {
    var match = regex.exec(url);
    return (Array.isArray(match) ? match[1] : '') || '';
  });

  var cacheId = "api::getChannels::" + channelNames.join(":");

  var result = cache.get(cacheId);
  if (result) {
    return Q.fcall(function () {
      return result;
    });
  }

  var deferred = Q.defer();

  this.request("groups.getById", {group_ids: channelNames.join(",")})
    .then(function (response) {
      var channels = _.map(response, function (channel) {
        return {
          id: channel.id,
          name: channel.name,
          description: channel.description,
          url: 'http://vk.com/' + channel.screen_name
        };
      });

      cache.set(cacheId, channels, 600);
      deferred.resolve(channels);
    }, function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

module.exports = function () {
  return new Api();
};
