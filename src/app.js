"use strict";

var React = require("react");
var Header = require("./components/header");
var Cover = require("./components/cover");
var Track = require("./components/track");
// var Controls = require("./components/controls");
// var Playlist = require("./components/playlist");
// var Channels = require("./components/channels");

var Application = React.createFactory(React.createClass({
  getInitialState: function () {
    return {
      channels: [],
      track: null,
      containerWidth: 0
    };
  },

  componentDidMount: function () {
    window.addEventListener("resize", this._recomputeWidth);
    this._recomputeWidth();
  },

  _updateChannels: function (channels) {
    this.setState({channels: channels.filter(function (channel) {
      return channel.isChecked;
    })});
  },

  _changeTrack: function (track) {
    this.setState({track: track}, function () {
      document.title = track.title + " - " + track.artist;
    });
  },

  _nextTrack: function () {
    this.refs.playlist.next();
  },

  _errorTrack: function () {
    this.refs.playlist.errorSelected();
    this._nextTrack();
  },

  _recomputeWidth: function () {
    this.setState({
      containerWidth: this.refs.container.getDOMNode().offsetWidth,
    });
  },

  render: function() {
    return (
      <div className="application" ref="container">
        <Cover width={this.state.containerWidth}>
          <Header />
          <Track {...this.state.track} />
        </Cover>
      </div>
    );
  }

  // render: function() {
  //   return (
  //     <div className="application" ref="container">
  //       <Cover width={this.state.containerWidth}>
  //         <Channels onUpdate={this._updateChannels} />
  //         <Header />
  //         <Track {...this.state.track} />
  //         <Controls {...this.state.track}
  //           onError={this._errorTrack}
  //           onNext={this._nextTrack} />
  //       </Cover>
  //       <Playlist ref="playlist" {...this.state.channels}
  //         onTrackChanged={this._changeTrack} />
  //     </div>
  //   );
  // }
}));

module.exports = Application;

if (typeof window !== "undefined") {
  window.onload = function() {
    React.render(Application(), document.body);
  }
}
