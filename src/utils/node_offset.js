module.exports = function (node) {
  var top = 0;
  var left = 0;

  do {
    top += node.offsetTop  || 0;
    left += node.offsetLeft || 0;
    node = node.offsetParent;
  } while (node);

  return {
    top: top,
    left: left
  };
};
