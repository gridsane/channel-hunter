var Q = require('q');
var superagent = require('superagent');
var Cache = require('./cache');
var cache = new Cache();

var Api = function () {
}

Api.prototype.request = function (method, params) {
  var deferred = Q.defer();

  superagent
    .get('https://api.vk.com/method/' + method)
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

Api.prototype.getStream = function (id) {
  var cacheId = 'api::stream::' + id;
  var result = cache.get(cacheId);

  if (result) {
    return Q.fcall(function () {
      return result;
    });
  }

  var deferred = Q.defer();

  this.request('wall.get', {
    owner_id: '-' + id,
  }).then(function (response) {
    var audios = [];

    for (var i = response.items.length - 1; i >= 0; i--) {
      var attachments = response.items[i].attachments;
      if (attachments) {
        for (var j = attachments.length - 1; j >= 0; j--) {
          if ('audio' === attachments[j].type) {
            var audio = attachments[j].audio;
            audio.date = response.items[i].date;

            audios.unshift(audio);
          }
        };
      }
    };

    cache.set(cacheId, audios, 600);
    deferred.resolve(audios);
  });

  return deferred.promise;
}

module.exports = function () {
  return new Api();
};
