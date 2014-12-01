var React = require('react');
var ScrollListener = require('../mixins/scroll_listener');

var Cover = React.createClass({
  mixins: [ScrollListener],

  getDefaultProps: function () {
    return {
      title: 'no title',
      artist: 'no artist',
      cover: null,
    };
  },

  render: function () {
    var height = Math.max(116, 256 - this.state.pageScrollY)
    var coverStyle = {height: height};
    var isNarrow = height < 150;

    var coverImageStyle = {
      backgroundImage: 'url(' + this.props.cover + ')',
    };

    var coverTitleClasses = React.addons.classSet({
      "cover-title": true,
      "cover-title-narrow": isNarrow,
    });

    var coverArtistClasses = React.addons.classSet({
      "cover-artist": true,
      "cover-artist-narrow": isNarrow,
    });

    return (
      <div className="cover" style={coverStyle}>
        <div className={coverTitleClasses}>
          {this.props.title}
        </div>
        <div className={coverArtistClasses}>
          {this.props.artist}
        </div>
        <div className="cover-image" style={coverImageStyle}></div>
      </div>
    );
  }
});

module.exports = Cover;
