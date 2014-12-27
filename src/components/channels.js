var React = require("react/addons");
var ChannelsItem = require("./channels_item");
var Icon = require("./icon");
var apiClient = require("../utils/api_client");
var Q = require("q");
var _ = require("lodash");

var Channels = React.createClass({
  propTypes: {
    channelsUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onLoad: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function () {
    return {
      channelsUrls: [
        "godshand",
        "e_music_stonerrock",
        "13th_floor",
        "e_music_blues",
        "topinstrumentalmetal"
      ],
      onLoad: function () {}
    };
  },

  getInitialState: function () {
    return {
      channels: [],
      channelsIdsToUrls: {}
    };
  },

  componentWillMount: function () {
    this._updateChannels([], this.props.channelsUrls);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.channelsUrls !== this.props.channelsUrls) {
      this._updateChannels(this.props.channelsUrls, nextProps.channelsUrls);
    }
  },

  getChannels: function () {
    return this.state.channels;
  },

  _updateChannels: function (prevChannelsUrls, nextChannelsUrls) {
    if (0 === nextChannelsUrls.lenght) {
      return;
    }

    var diffChannelsUrls = _.difference(prevChannelsUrls, nextChannelsUrls);
    var newChannelsUrls = nextChannelsUrls.filter(function (url) {
      return -1 === prevChannelsUrls.indexOf(url);
    });

    var promises = newChannelsUrls.map(function (url) {
      return apiClient.getChannel(url);
    });

    Q.all(promises).then(function (channels) {
      var channelsIdsToUrls = {};

      var oldChannels = this.state.channels.filter(function (channel) {
        return -1 === diffChannelsUrls.indexOf(this.state.channelsIdsToUrls[channel.id]);
      }, this);

      channels = channels.filter(function (channel) {
        return !this.state.channelsIdsToUrls[channel.id];
      }, this).map(function (channel, i) {
        channelsIdsToUrls[channel.id] = newChannelsUrls[i];
        channel.isChecked = true;
        return channel;
      }, this);

      this.setState({
        channels: _.union(channels, oldChannels),
        channelsIdsToUrls: channelsIdsToUrls
      }, function () {
        this.props.onLoad(this.state.channels);
      });
    }.bind(this));
  },

  _toggleChannel: function (id, isChecked) {
    var nextChannels = this.state.channels.map(function (channel) {
      if (id === channel.id) {
        channel.isChecked = isChecked;
      }

      return channel;
    });

    this.setState({channels: nextChannels});
  },

  render: function () {
    var items = this.state.channels.map(function (channel) {
      return (
        <ChannelsItem onCheck={this._toggleChannel} ref={"channel" + channel.id} key={channel.id} {...channel} />
      );
    }, this);

    return (<ul className="channels">{items}</ul>);
  }
});

module.exports = Channels;
