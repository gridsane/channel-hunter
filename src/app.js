"use strict";

var React = require("react");
var Cover = require("./components/cover");
var Channels = require("./components/channels");
var Header = require("./components/header");
var Track = require("./components/track");
var Controls = require("./components/controls");
// var Playlist = require("./components/playlist");

var Application = React.createFactory(React.createClass({
  getInitialState: function () {
    return {
      channels: [],
      track: {
        artist: 'Artist',
        title: 'Title',
        cover: 'http://cs621920.vk.me/v621920194/3f53/Iy52MyRqGak.jpg',
        url: 'http://cs422317.vk.me/u88806194/audios/602dd2f8a091.mp3?extra=Zm7QV8cPzwhyrS5TaYArr45YNtr4yPRmP76Zi-51uNCh87pOS8gk59H6OoBrXrpuQINIQ-MtL2n6RozGfhHHqXeo7bMblKd5'
      },
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
        <Cover {...this.state.track} width={this.state.containerWidth}>
          <Header />
          <Channels onUpdate={this._updateChannels} />
          <Track {...this.state.track} />
          <Controls {...this.state.track}
            onError={this._errorTrack}
            onNext={this._nextTrack} />
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
