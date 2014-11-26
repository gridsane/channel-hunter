var React = require('react');
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

  play: function (event) {
    this.setState({paused: false}, function () {
      this.refs.audioObject.getDOMNode().play();
    }.bind(this));

    event.preventDefault();
  },

  pause: function (event) {
    this.setState({paused: true}, function () {
      this.refs.audioObject.getDOMNode().pause();
    }.bind(this));

    event.preventDefault();
  },

  render: function () {
    return (
      <div className="track">
        {this.state.paused
          ? <a href="#" onClick={this.play}>play</a>
          : <a href="#" onClick={this.pause}>pause</a>}
        <audio ref="audioObject" src={this.props.url} preload="none"></audio>
        {this.props.artist} - {this.props.title}
        {durationToString(this.props.duration)}
      </div>
    );
  }
});

module.exports = React.createFactory(Track);
