function pad(x) {
  return x < 10 ? "0" + x : x;
}

export function formatDuration(duration) {
  let minutes = Math.floor(duration / 60);

  if (minutes > 59) {
    return minutes % 60 + "h";
  }

  let seconds = Math.floor(duration % 60);

  return pad(minutes.toFixed()) + ":" + pad(seconds.toFixed());
}
