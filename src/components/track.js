var React = require('react');

var Track = React.createClass({
  getInitialState: function () {
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
      backgroundImage: 'url(' + this.state.cover + ')',
    };

    return (
      <div className="track">
        <div className="track-title">
          {this.state.title}
        </div>
        <div className="track-artist">
          {this.state.artist}
        </div>
        <div className="track-cover" style={coverStyle}></div>
      </div>
    );
  }
});

module.exports = Track;
