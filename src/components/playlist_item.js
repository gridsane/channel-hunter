var React = require('react/addons');

var pad = function (x) {
  return x < 10 ? '0' + x : x;
}

var durationToString = function (duration) {
    var minutes = Math.floor(duration / 60);
    var seconds = duration % 60;

    return pad(minutes) + ':' + pad(seconds);
}

var PlaylistItem = React.createClass({
  getDefaultProps: function () {
    return {
      id: null,
      title: '',
      artist: '',
      duration: 0,
      selected: false,
      selectHandler: function () {},
    }
  },

  select: function (event) {
    this.props.selectHandler(this.props.id, event);
  },

  render: function () {
    var classes = React.addons.classSet({
      "playlist-item": true,
      "playlist-item-active": this.props.selected
    });

    return (
      <li className={classes} key={this.props.id} onClick={this.select}>
        <div className="playlist-item-title">{this.props.title}</div>
        <div className="playlist-item-artist">{this.props.artist}</div>
        <div className="playlist-item-duration">{durationToString(this.props.duration)}</div>
      </li>
    );
  }
});

module.exports = PlaylistItem;
