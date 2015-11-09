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

export function nodeOffset(node) {
  let top = 0;
  let left = 0;

  do {
    top += node.offsetTop  || 0;
    left += node.offsetLeft || 0;
    node = node.offsetParent;
  } while (node);

  return {
    top: top,
    left: left,
  };
}

export function curried(fn, ...args) {
  return (...nArgs) => fn.apply(this, [...args, ...nArgs]);
}
