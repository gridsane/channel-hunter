var React = require("react");

var Cover = React.createClass({
  getDefaultProps: function () {
    return {
      title: "no title",
      artist: "no artist",
      cover: null,
      pageScrollY: 0
    };
  },

  getInitialState: function () {
    return {
      height: null
    };
  },

  componentWillReceiveProps: function (nextProps) {
    // @todo rid of "magic numbers"
    var height = Math.max(116, 256 - nextProps.pageScrollY);

    this.setState({
      height: height,
      isNarrow: height < 150
    });
  },

  render: function () {
    var coverTitleClasses = React.addons.classSet({
      "cover-title": true,
      "cover-title-narrow": this.state.isNarrow,
    });

    var coverArtistClasses = React.addons.classSet({
      "cover-artist": true,
      "cover-artist-narrow": this.state.isNarrow,
    });

    var coverStyle = this.state.height
      ? {height: this.state.height}
      : {};

    return (
      <div className="cover" style={coverStyle}>
        <div className={coverTitleClasses}>
          {this.props.title}
        </div>
        <div className={coverArtistClasses}>
          {this.props.artist}
        </div>
        <div className="cover-image"
          style={{backgroundImage: "url(" + this.props.cover + ")"}}></div>
      </div>
    );
  }
});

module.exports = Cover;
