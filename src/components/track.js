var React = require('react/addons');
var datef = require('datef');
var nodeOffset = require('../utils/node_offset');

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
      currentTime: 0, // percent played
      buffered: 20, // percent buffered
    };
  },

  toggle: function (event) {
    this.setState({paused: !this.state.paused}, function () {
      this.refs.audioObject.getDOMNode()[this.state.paused ? 'pause' : 'play']();
    }.bind(this));

    event.preventDefault();
  },

  seek: function (event) {
    var node = event.nativeEvent.toElement,
        width = node.offsetWidth,
        pos = event.clientX - nodeOffset(node).left,
        seekTime = (this.props.duration / width) * pos;

    this.setState({currentTime: seekTime}, function () {
      this.refs.audioObject.getDOMNode().currentTime = seekTime;
    });

    event.preventDefault();
  },

  componentDidMount: function () {
    var self = this,
        audio = this.refs.audioObject.getDOMNode();

    audio.addEventListener('timeupdate', function () {
      self.setState({currentTime: this.currentTime});
    }, true);
  },


  render: function () {
    var trackClasses = React.addons.classSet({
      "track": true,
      "track-playing": !this.state.paused,
    });

    var progressBufferedClasses = React.addons.classSet({
      "track-progress-buffered": true,
      "track-progress-buffered-playing": !this.state.paused
    });

    var progressClasses = React.addons.classSet({
      "track-progress": true,
      "track-progress-playing": !this.state.paused
    });

    return (
      <div className={trackClasses}>
        <audio ref="audioObject" src={this.props.url} preload="none"></audio>
        <img
          onClick={this.toggle}
          className="track-controls"
          src={"/assets/images/" + (this.state.paused ? 'play' : 'pause') + ".svg"}/>
        <div className="track-duration">{durationToString(this.props.duration)}</div>
        <div className="track-name">
          <span className="track-artist">{this.props.artist}</span>
          <span className="track-title">{this.props.title}</span>
        </div>
        <progress ref="progressBufferObject" className={progressBufferedClasses}></progress>
        <progress ref="progressObject" onClick={this.seek} className={progressClasses}
          max={this.props.duration} value={this.state.currentTime}></progress>
      </div>
    );
  }
});

module.exports = React.createFactory(Track);
