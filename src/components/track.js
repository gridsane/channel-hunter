var React = require('react');

var Track = React.createClass({
  getDefaultProps: function () {
    return {
      title: 'no title',
      artist: 'no artist',
      cover: 'http://cs621626.vk.me/v621626660/109f/krZgujAdVJA.jpg',
    };
  },

  setTrack: function (track) {
    this.setState({
      title: track.title,
      artist: track.artist,
      cover: track.cover
    });
  },

  render: function () {
    var coverStyle = {
      backgroundImage: 'url(' + this.props.cover + ')',
    };

    return (
      <div className="track">
        <div className="track-title">
          {this.props.title}
        </div>
        <div className="track-artist">
          {this.props.artist}
        </div>
        <div className="track-cover" style={coverStyle}></div>
      </div>
    );
  }
});

module.exports = Track;
