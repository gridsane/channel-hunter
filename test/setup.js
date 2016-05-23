import expect from 'expect';
import jsdom from 'jsdom';
import cssHook from 'css-modules-require-hook';
import sass from 'node-sass';

cssHook({
  extensions: ['.scss'],
  generateScopedName: '[local]___[hash:base64:5]',
  preprocessCss: (data, file) => sass.renderSync({file}).css,
});

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.expect = expect;

// ReactDOM debug messages fix
console.debug = () => null;

propagateToGlobal(global.window);

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}
