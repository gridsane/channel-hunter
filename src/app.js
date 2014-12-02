"use strict";

var React = require("react");
var Header = require("./components/header");
var ScrollBlocker = require("./components/scroll_blocker");
var ScrollListener = require("./mixins/scroll_listener");
var Cover = require("./components/cover");
var Controls = require("./components/controls");
var Playlist = require("./components/playlist");
var Channels = require("./components/channels");

var Application = React.createFactory(React.createClass({
  mixins: [ScrollListener],

  getInitialState: function () {
    return {
      track: null,
      containerWidth: 0,
      coverHeight: 0,
      isChannelsHidden: true
    };
  },

  showChannels: function () {
    this.setState({isChannelsHidden: false});
  },

  hideChannels: function () {
    this.setState({isChannelsHidden: true});
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
        <Channels onBackClick={this.hideChannels} isHidden={this.state.isChannelsHidden} />
        <ScrollBlocker width={this.state.containerWidth}>
          <Header pageScrollY={this.state.pageScrollY} onMenuClick={this.showChannels} />
          <Cover {...this.state.track} pageScrollY={this.state.pageScrollY} width={this.state.containerWidth} />
          <Controls {...this.state.track} onEnd={this.onTrackEnd} width={this.state.containerWidth} />
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
