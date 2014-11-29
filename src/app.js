'use strict';

var React = require('react');
var Track = require('./components/track');
var Controls = require('./components/controls');
var Playlist = require('./components/playlist');

var Application = React.createFactory(React.createClass({
  render: function() {
    return (
      <div className="application">
        <header>
          <div className="header-wrapper">
            <div className="header-title">Channel Hunter</div>
          </div>
        </header>
        <nav>
          <button className="button-humburger"></button>
          <button className="button-github"></button>
        </nav>

        <Track />
        <Controls />
        <Playlist />
      </div>
    );
  }
}));

module.exports = Application;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(Application(), document.body);
  }
}
