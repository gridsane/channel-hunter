var React = require('react');

var Track = React.createClass({
  getDefaultProps: function () {
    return {
      title: '',
      artist: ''
    };
  },

  render: function () {
    return (
      <div className="track">
        <div className="track-title">{this.props.title}</div>
        <div className="track-artist">{this.props.artist}</div>
      </div>
    );
  }
});

module.exports = Track;
