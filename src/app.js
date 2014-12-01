'use strict';

var React = require('react');
var Header = require('./components/header');
var ScrollBlocker = require('./components/scroll_blocker');
var Cover = require('./components/cover');
var Controls = require('./components/controls');
var Playlist = require('./components/playlist');

var Application = React.createFactory(React.createClass({
  getDefaultProps: function () {
    return {
      github_url: 'https://github.com/gridsane/channel-hunter'
    };
  },

  getInitialState: function () {
    return {
      track: null
    };
  },

  selectTrack: function (track) {
    this.setState({track: track});
  },

  render: function() {
    return (
      <div className="application">
        <ScrollBlocker>
          <Header />
          <Cover {...this.state.track} />
          <Controls {...this.state.track} />
        </ScrollBlocker>
        <Playlist onSelect={this.selectTrack} />
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
