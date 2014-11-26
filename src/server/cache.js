var getTimestamp = function () {
  return (new Date().getTime());
}

var Cache = function () {
  this.store = {};
}

Cache.prototype.set = function (id, value, time) {
  this.store[id] = {
    due: getTimestamp() + time,
    value: value
  };
}

Cache.prototype.get = function (id) {
  var data = this.store[id]

  if (!data)  {
    return null;
  }

  if (data.due >= getTimestamp()) {
    delete this.store[id];
    return null;
  }

  return this.store[id].value;
}

module.exports = Cache;
