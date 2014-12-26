var pad = function (x) {
  return x < 10 ? "0" + x : x;
}

module.exports = function (duration) {
  var minutes = Math.floor(duration / 60);

  if (minutes > 59) {
    return minutes % 60 + "h";
  }

  var seconds = Math.floor(duration % 60);

  return pad(minutes.toFixed()) + ":" + pad(seconds.toFixed());
}
