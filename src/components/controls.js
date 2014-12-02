var React = require("react");
var nodeOffset = require("../utils/node_offset");

var Controls = React.createClass({
  getDefaultProps: function () {
    return {
      width: 0
    };
  },

  getInitialState: function () {
    return {
      playing: false,
      currentTime: 0,
      progressEventMounted: false,
      onEnd: null
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
      }

      this.setState({
        playing: !!prevProps.url,
        progressEventMounted: true,
        currentTime: 0
      });
    }

  },

  render: function () {
    var buttonClass = React.addons.classSet({
      "button-play": !this.state.playing,
      "button-pause": this.state.playing
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
        <button onClick={this.togglePlayback} className={buttonClass}></button>
        <button className="button-volume"></button>
        <progress ref="buffer" className="controls-buffer" max="100" value="100"></progress>
        <progress ref="seek" onClick={this.seek} className="controls-seek" max={this.props.duration} value={this.state.currentTime}></progress>
      </div>
    );
  }
});

module.exports = Controls;
