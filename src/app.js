"use strict";

var React = require("react");
var Header = require("./components/header");
var ScrollBlocker = require("./components/scroll_blocker");
var ScrollListener = require("./mixins/scroll_listener");
var Cover = require("./components/cover");
var Controls = require("./components/controls");
var Playlist = require("./components/playlist");

var Application = React.createFactory(React.createClass({
  mixins: [ScrollListener],

  getInitialState: function () {
    return {
      track: null,
      containerWidth: 0,
      coverHeight: 0
    };
  },

  selectTrack: function (track) {
    this.setState({track: track});
  },

  onTrackEnd: function () {
    this.refs.playlist.selectNext();
  },

  recomputeWidth: function () {
    this.setState({
      containerWidth: this.refs.container.getDOMNode().offsetWidth,
    });
  },

  componentDidMount: function () {
    window.addEventListener("resize", function () {
      this.recomputeWidth();
    }.bind(this));
    this.recomputeWidth();
  },

  render: function() {
    return (
      <div className="application" ref="container">
        <ScrollBlocker width={this.state.containerWidth}>
          <Header pageScrollY={this.state.pageScrollY} />
          <Cover {...this.state.track} pageScrollY={this.state.pageScrollY} />
          <Controls {...this.state.track} onEnd={this.onTrackEnd} />
        </ScrollBlocker>
        <Playlist ref="playlist" onSelect={this.selectTrack} />
      </div>
    );
  }
}));

module.exports = Application;

if (typeof window !== "undefined") {
  window.onload = function() {
    React.render(Application(), document.body);
  }
}
