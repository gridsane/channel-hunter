var pad = function (x) {
  return x < 10 ? "0" + x : x;
}

module.exports = function (duration) {
  var minutes = Math.floor(duration / 59);
  var seconds = duration % 59;

  return pad(minutes.toFixed()) + ":" + pad(seconds.toFixed());
}
