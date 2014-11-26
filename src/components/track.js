var React = require('react/addons');
var datef = require('datef');

var pad = function (x) {
  return x < 10 ? '0' + x : x;
}

var durationToString = function (duration) {
    var minutes = Math.floor(duration / 60),
        seconds = duration % 60;

    return pad(minutes) + ':' + pad(seconds);
}

/**
 * docs
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
 */

var Track = React.createClass({
  getDefaultProps: function () {
    return {
      artist: 'no name',
      title: 'no title'
    };
  },

  getInitialState: function () {
    return {
      paused: true,
    };
  },

  toggle: function (event) {
    this.setState({paused: !this.state.paused}, function () {
      this.refs.audioObject.getDOMNode()[this.state.paused ? 'pause' : 'play']();
    }.bind(this));

    event.preventDefault();
  },

  render: function () {
    var trackClasses = React.addons.classSet({
      "track": true,
      "track-playing": !this.state.paused,
    });

    return (
      <div className={trackClasses} onClick={this.toggle}>
        <img
          className="track-controls"
          src={"/assets/images/" + (this.state.paused ? 'play' : 'pause') + ".svg"}/>
        <audio ref="audioObject" src={this.props.url} preload="none"></audio>
        <span className="track-artist">{this.props.artist}</span>
        <span className="track-title">{this.props.title}</span>
        <span className="track-duration">{durationToString(this.props.duration)}</span>
      </div>
    );
  }
});

module.exports = React.createFactory(Track);
