var React = require("react");

var Cover = React.createClass({
  getDefaultProps: function () {
    return {
      title: "no title",
      artist: "no artist",
      cover: null,
      pageScrollY: 0,
      width: 0
    };
  },

  getInitialState: function () {
    return {
      height: null
    };
  },

  componentWillReceiveProps: function (nextProps) {
    // @todo rid of "magic numbers"
    var height = Math.max(112, 304 - nextProps.pageScrollY);

    this.setState({
      height: height,
      isNarrow: height < 190
    });
  },

  render: function () {
    var coverTrackClasses = React.addons.classSet({
      "cover-track": true,
      "cover-track-narrow": this.state.isNarrow
    });

    var coverStyle = this.state.height
      ? {height: this.state.height}
      : {};

    return (
      <div className="cover" style={coverStyle}>
        <div className={coverTrackClasses} style={{width: this.props.width - (this.state.isNarrow ? 72 : 32) * 2}}>
          <div className="cover-track-title">
            {this.props.title}
          </div>
          <div className="cover-track-artist">
            {this.props.artist}
          </div>
        </div>
        <div className="cover-image"
          style={{backgroundImage: "url(" + this.props.cover + ")"}}></div>
      </div>
    );
  }
});

module.exports = Cover;
