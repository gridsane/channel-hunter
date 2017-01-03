function pad0(x) {
  return x < 10 ? '0' + x : x;
}

export function formatDuration(duration) {
  if (!duration) {
    return '';
  }

  let minutes = Math.floor(duration / 60);

  if (minutes > 59) {
    return '~' + Math.round(minutes / 60) + 'h';
  }

  let seconds = Math.floor(duration % 60);

  return pad0(minutes.toFixed()) + ':' + pad0(seconds.toFixed());
}

export function nodeOffset(node) {
  let top = 0;
  let left = 0;

  do {
    top += node.offsetTop || 0;
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

export function throttle(fn, timeout) {
  let timer = false;

  return function(...args) {
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = false;
      }, timeout);
    }
  };
}

export function debounce(fn, timeout) {
  let timer = false;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = false;
    }, timeout);
  };
}
