var React = require('react');
var nodeOffset = require('../utils/node_offset');

var Controls = React.createClass({
  getInitialState: function () {
    return {
      playing: false,
      currentTime: 0,
      progressEventMounted: false
    };
  },

  seek: function (event) {
    var node = event.nativeEvent.toElement,
        width = node.offsetWidth,
        pos = event.clientX - nodeOffset(node).left,
        seekTime = (this.props.duration / width) * pos;

    this.setState({currentTime: seekTime}, function () {
      this.refs.audio.getDOMNode().currentTime = seekTime;
    });

    event.preventDefault();
  },

  togglePlayback: function (event) {
    if (!this.props.url) {
      return;
    }

    this.setState({
      playing: !this.state.playing
    }, function () {
      this.refs.audio.getDOMNode()
        [this.state.playing ? 'play' : 'pause']();
    }.bind(this));
  },

  componentDidUpdate: function(prevProps, prevState) {
    // @todo refactor

    if (prevProps.url !== this.props.url) {
      this.setState({
        playing: true,
        currentTime: 0
      });
    }

    if (this.refs.audio) {
      if (!this.state.progressEventMounted) {
        var self = this;

        this.setState({progressEventMounted: true});

        this.refs.audio.getDOMNode().addEventListener('timeupdate', function () {
          self.setState({
            currentTime: this.currentTime
          });
        }, true);
      }

      // @todo this not works in Safari for some reason =\
      // (audio not playing after track change)
      if (this.state.playing !== prevState.playing
        || prevProps.url !== this.props.url) {
        this.refs.audio.getDOMNode().play();
      }
    }
  },

  render: function () {
    var buttonClass = React.addons.classSet({
      "button-play": !this.state.playing,
      "button-pause": this.state.playing
    });

    var audio = '';
    if (this.props.url) {
      audio = React.DOM.audio({
        src: this.props.url,
        preload: "none",
        ref: "audio"
      });
    }

    return (
      <div className="controls">
        {audio}
        <button onClick={this.togglePlayback} className={buttonClass}></button>
        <button className="button-volume"></button>
        <progress ref="buffer" className="controls-buffer" max="100" value="100"></progress>
        <progress ref="seek" onClick={this.seek} className="controls-seek" max={this.props.duration} value={this.state.currentTime}></progress>
      </div>
    );
  }
});

module.exports = Controls;
