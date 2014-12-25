/**
 * Key/value in-memory cache
 *
 * @constructor
 */
var Cache = function () {
  this.store = {};
}

/**
 * Cache value by key, for a certain amount of time
 *
 * @param {string} key    Key to access value
 * @param {*}      value  Value to store
 * @param {number} [time] Cache time in milliseconds. Infinite, if not specified
 */
Cache.prototype.set = function (key, value, time) {
  this.store[key] = {
    due: time ? (Date.now() + time) : null,
    value: value
  };
};

/**
 * Unset cached value by key
 *
 * @param {string} key
 */
Cache.prototype.unset = function (key) {
  delete this.store[key];
};

/**
 * Get a cached value by key
 *
 * @param {string} key
 *
 * @return {*} Returns null, if no value found or time exceeded
 */
Cache.prototype.get = function (key) {
  var data = this.store[key]

  if (!data)  {
    return null;
  }

  if (null !== data.due && data.due <= Date.now()) {
    delete this.store[key];
    return null;
  }

  return this.store[key].value;
};

module.exports = Cache;
