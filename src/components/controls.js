var React = require("react");
var Icon = require("./icon");
var Progress = require("./progress");
var formatDuration = require("../utils/format_duration");

var Controls = React.createClass({
  getDefaultProps: function () {
    return {
      onNext: null,
      onError: null
    };
  },

  getInitialState: function () {
    return {
      playing: false,
      loading: true,
      currentTime: 0,
      progressEventMounted: false,
    };
  },

  onSeek: function (value) {
    if (!this.props.url || this.state.loading) {
      return;
    }

    this.setState({currentTime: value}, function () {
      this.refs.audio.getDOMNode().currentTime = value;
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
          if ("function" === typeof(this.props.onNext)) {
            this.props.onNext();
          }
        }.bind(this));

        var loadingFalse = function () {
          this.setState({loading: false});
        }.bind(this);

        audioNode.addEventListener("loadeddata", loadingFalse);
        audioNode.addEventListener("seeked", loadingFalse);

        var loadingTrue = function () {
          this.setState({loading: true});
        }.bind(this);

        audioNode.addEventListener("seeking", loadingTrue);
        audioNode.addEventListener("stalled", loadingTrue);
        audioNode.addEventListener("waiting", loadingTrue);
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
      <div className="controls">
        {audio}
        <a onClick={this.togglePlayback} className="controls-button-playback">
          <Icon symbol={this.state.playing ? "pause" : "play"} />
        </a>
        <a onClick={this.props.onNext} className="controls-button-next">
          <Icon symbol="next" />
        </a>
        <div className="controls-time">{formatDuration(this.state.currentTime)}</div>
        <Progress className={bufferClasses} max="100" value="100" />
        <Progress className="controls-seek"
          onSeek={this.onSeek}
          max={this.props.duration}
          value={this.state.currentTime}/>
      </div>
    );
  }
});

module.exports = Controls;
