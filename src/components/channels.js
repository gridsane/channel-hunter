var React = require("react/addons");
var ChannelsItem = require("./channels_item");
var superagent = require("superagent");
var Q = require("q");

var Channels = React.createClass({
  getDefaultProps: function () {
    return {
      channelUrls: [
        'godshand',
        'e_music_stonerrock',
        '13th_floor',
        'e_music_blues',
        'topinstrumentalmetal'
      ],
      onChannelsChanged: null
    };
  },

  getInitialState: function () {
    return {
      channels: [],
      isMenuOpen: false
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
          channels[i].isChecked = true;
          result.push(channels[i]);
        }
      };

      this.setState({channels: result}, function () {
        if ("function" === typeof(this.props.onChannelsChanged)) {
          this.props.onChannelsChanged(this.state.channels);
        }
      });
    }.bind(this));
  },

  onChannelCheck: function (id, isChecked) {
    var nextChannels = this.state.channels.map(function (channel) {
      if (id === channel.id) {
        channel.isChecked = isChecked;
      }

      return channel;
    });

    this.setState({channels: nextChannels}, function () {
      this.props.onChannelsChanged(this.state.channels);
    });
  },

  onBodyClick: function (e) {
    var node = this.getDOMNode();
    for (var i = e.toElement; i; i = i.parentNode) {
      if (i === node) {
        return;
      }
    };

    this.props.onBackClick();
    e.stopPropagation();
    document.body.removeEventListener('click', this.onBodyClick);
  },

  componentDidUpdate: function (prevProps) {
    if (!this.props.isHidden) {
      document.body.addEventListener('click', this.onBodyClick);
    } else {
      document.body.removeEventListener('click', this.onBodyClick);
    }
  },

  _toggleMenu: function (event) {
    this.setState({isMenuOpen: !this.state.isMenuOpen})

    event.preventDefault();
  },

  render: function () {
    var buttonClasses = React.addons.classSet({
      "channels-button": true,
      "channels-button-humburger": !this.state.isMenuOpen,
      "channels-button-back": this.state.isMenuOpen
    });

    var menuClasses = React.addons.classSet({
      "channels-menu": true,
      "channels-menu-open": this.state.isMenuOpen
    });

    var items = this.state.channels.map(function (channel) {
      return (
        <ChannelsItem onCheck={this.onChannelCheck} ref={"channel" + channel.id} key={channel.id} {...channel} />
      );
    }.bind(this));

    return (
      <div className="channels">
        <a className={buttonClasses} onClick={this._toggleMenu}></a>
        <div className={menuClasses}>
          <ul className="channels-menu-items">{items}</ul>
        </div>
      </div>
    );
  }
});

module.exports = Channels;
