var React = require("react");
var Cover = require("./components/cover");
var Channels = require("./components/channels");
var Header = require("./components/header");
var Track = require("./components/track");
var Controls = require("./components/controls");
var Playlist = require("./components/playlist");

var Application = React.createFactory(React.createClass({
  getInitialState: function () {
    return {
      channels: [],
      track: null,
      isCoverShrink: false,
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

  _changeIsCoverShrink: function (isShrink) {
    this.setState({
      isCoverShrink: isShrink
    });
  },

  render: function() {
    return (
      <div className="application" ref="container">
        <Cover {...this.state.track}
          width={this.state.containerWidth}
          onToggleShrink={this._changeIsCoverShrink}>
          <Header isShrink={this.state.isCoverShrink} />
          <Channels onUpdate={this._updateChannels} />
          <Track isShrink={this.state.isCoverShrink} {...this.state.track} />
          <Controls {...this.state.track}
            onError={this._errorTrack}
            onNext={this._nextTrack} />
        </Cover>
        <Playlist ref="playlist" channels={this.state.channels}
          onTrackChange={this._changeTrack} />
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
