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

// Radium warnings fix
global.navigator = {userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'};

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
