var React = require("react/addons");
var ChannelsItem = require("./channels_item");
var superagent = require("superagent");
var Q = require("q");

var Channels = React.createClass({
  getDefaultProps: function () {
    return {
      channelUrls: ['godshand', 'e_music_stonerrock', '13th_floor'],
      isHidden: true,
      onBackClick: null
    };
  },

  getInitialState: function () {
    return {
      channels: []
    };
  },

  getChannel: function (channelUrl) {
    var deferred = Q.defer();

    superagent
      .get("/api/channel")
      .query({'url': channelUrl})
      .end(function(err, res) {
        // @todo bad solution
        // this should reject, but Q.all should not fail
        if (err || 200 !== res.status) {
          deferred.resolve(null);
        } else {
          deferred.resolve(res ? res.body : null)
        }
      });

    return deferred.promise;
  },

  componentWillMount: function () {
    var promises = [];

    for (var i = this.props.channelUrls.length - 1; i >= 0; i--) {
      promises.push(this.getChannel(this.props.channelUrls[i]));
    };

    Q.all(promises).then(function (channels) {
      var result = [];

      for (var i = channels.length - 1; i >= 0; i--) {
        if (null !== channels[i]) {
          result.push(channels[i]);
        }
      };

      this.setState({channels: result});
    }.bind(this));
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({isHidden: nextProps.isHidden});
  },

  render: function () {
    var channelsClasses = React.addons.classSet({
      "channels": true,
      "channels-hidden": this.props.isHidden
    });

    var items = this.state.channels.map(function (channel) {
      return (
        <ChannelsItem {...channel} />
      );
    });

    return (
      <div className={channelsClasses}>
        <button onClick={this.props.onBackClick} className="button-back"></button>
        <ul className="channel-items">{items}</ul>
      </div>
    );
  }
});

module.exports = Channels;
