var React = require('react');

var Controls = React.createClass({
  getInitialState: function () {
    return {
      playing: false
    };
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
    if (prevProps.url !== this.props.url) {
      this.setState({
        playing: true
      });
    }

    if (this.refs.audio) {
      this.refs.audio.getDOMNode().play();
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
        <progress className="controls-buffer" max="100" value="70"></progress>
        <progress className="controls-seek" max="100" value="30"></progress>
      </div>
    );
  }
});

module.exports = Controls;
