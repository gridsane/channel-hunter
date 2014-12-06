var React = require("react/addons");
var formatDuration = require("../utils/format_duration");

var PlaylistItem = React.createClass({
  getDefaultProps: function () {
    return {
      id: null,
      title: "",
      artist: "",
      duration: 0,
      channel: {},
      isSelected: false,
      onSelect: null
    }
  },

  select: function (event) {
    if ("function" === typeof(this.props.onSelect)) {
      this.props.onSelect(this.props.id, event);
    }
  },

  render: function () {
    var classes = React.addons.classSet({
      "playlist-item": true,
      "playlist-item-active": this.props.isSelected
    });

    return (
      <li className={classes} key={this.props.id} onClick={this.select}>
        <div className="playlist-item-title">{this.props.title}</div>
        <div className="playlist-item-artist">{this.props.artist}</div>
        <div className="playlist-item-channel">{this.props.channel.name}</div>
        <div className="playlist-item-duration">{formatDuration(this.props.duration)}</div>
      </li>
    );
  }
});

module.exports = PlaylistItem;
