var superagent = require("superagent");
var Q = require("q");

var rejectIfError = function (deferred, err, res) {
  if (err || 200 !== res.status) {
    deferred.reject(err);
  } else {
    deferred.resolve(res ? res.body : null);
  }
};

module.exports = {
  getChannel: function (channelUrl) {
    var deferred = Q.defer();

    superagent
      .get("/api/channel")
      .query({url: channelUrl})
      .end(function (err, res) {
        rejectIfError(deferred, err, res);
      });

    return deferred.promise;
  },

  getTracks: function (channelId) {
    var deferred = Q.defer();

    superagent
      .get("/api/tracks/" + channelId)
      .end(function (err, res) {
        rejectIfError(deferred, err, res);
      });

    return deferred.promise;
  },
};
