var React = require('react');

var Cover = React.createClass({
  getDefaultProps: function () {
    return {
      title: 'no title',
      artist: 'no artist',
      cover: null,
    };
  },

  render: function () {
    var coverStyle = {
      backgroundImage: 'url(' + this.props.cover + ')',
    };

    return (
      <div className="cover">
        <div className="cover-title">
          {this.props.title}
        </div>
        <div className="cover-artist">
          {this.props.artist}
        </div>
        <div className="cover-image" style={coverStyle}></div>
      </div>
    );
  }
});

module.exports = Cover;
