var React = require("react/addons");

var Track = React.createClass({
  getDefaultProps: function () {
    return {
      title: "",
      artist: "",
      isShrink: false
    };
  },

  render: function () {
    var trackClasses = React.addons.classSet({
      track: true,
      "track-shrink": this.props.isShrink
    });

    return (
      <div className={trackClasses}>
        <div className="track-title">
          {this.props.title}
        </div>
        <div className="track-artist">
          {this.props.artist}
        </div>
      </div>
    );
  }
});

module.exports = Track;
