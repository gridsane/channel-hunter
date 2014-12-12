var React = require("react");
var nodeOffset = require("../utils/node_offset");
var formatDuration = require("../utils/format_duration");

var Controls = React.createClass({
  getDefaultProps: function () {
    return {
      width: 0
    };
  },

  getInitialState: function () {
    return {
      playing: false,
      loading: true,
      currentTime: 0,
      progressEventMounted: false,
      onEnd: null,
      onError: null
    };
  },

  seek: function (event) {
    if (!this.props.url) {
      return;
    }

    var node = event.nativeEvent.toElement,
        width = node.offsetWidth,
        pos = event.clientX - nodeOffset(node).left,
        seekTime = (this.props.duration / width) * pos;

    this.setState({currentTime: seekTime}, function () {
      this.refs.audio.getDOMNode().currentTime = seekTime;
    });
  },

  togglePlayback: function () {
    if (!this.props.url) {
      return;
    }

    this.setState({
      playing: !this.state.playing
    }, function () {
      this.refs.audio.getDOMNode()
        [this.state.playing ? "play" : "pause"]();
    }.bind(this));
  },

  componentDidUpdate: function(prevProps, prevState) {

    if (prevProps.url !== this.props.url) {
      if (this.refs.audio && !this.state.progressEventMounted) {
        var self = this;
        var audioNode = this.refs.audio.getDOMNode();

        audioNode.addEventListener("timeupdate", function () {
          self.setState({
            currentTime: this.currentTime
          });
        });

        audioNode.addEventListener("error", function () {
          if ("function" === typeof(this.props.onError)) {
            this.props.onError();
          }
        }.bind(this));

        audioNode.addEventListener("loadstart", function () {
          if (this.state.playing) {
            this.refs.audio.getDOMNode().play();
          } else {
            this.refs.audio.getDOMNode().pause();
          }
        }.bind(this));

        audioNode.addEventListener("ended", function () {
          if ("function" === typeof(this.props.onEnd)) {
            this.props.onEnd();
          }
        }.bind(this));

        audioNode.addEventListener("loadeddata", function () {
          this.setState({loading: false});
        }.bind(this));
      }

      this.setState({
        playing: !!prevProps.url,
        progressEventMounted: true,
        loading: true,
        currentTime: 0
      });
    }

  },

  render: function () {
    var buttonClasses = React.addons.classSet({
      "button-play": !this.state.playing,
      "button-pause": this.state.playing
    });

    var bufferClasses = React.addons.classSet({
      "controls-buffer": true,
      "controls-buffer-loading": this.state.playing && this.state.loading,
    });

    var audio = "";
    if (this.props.url) {
      audio = React.DOM.audio({
        src: this.props.url,
        preload: "none",
        ref: "audio"
      });
    }

    return (
      <div className="controls" style={{width: this.props.width}}>
        {audio}
        <a onClick={this.togglePlayback} className={buttonClasses}></a>
        <a onClick={this.props.onEnd} className="button-next"></a>
        <a className="button-volume"></a>
        <div className="controls-time">{formatDuration(this.state.currentTime)}</div>
        <progress ref="buffer" className={bufferClasses} max="100" value="100"></progress>
        <progress className="controls-seek"
          ref="seek"
          onClick={this.seek}
          max={this.props.duration}
          value={this.state.currentTime}></progress>
      </div>
    );
  }
});

module.exports = Controls;
