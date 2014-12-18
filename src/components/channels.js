var React = require("react/addons");
var ChannelsItem = require("./channels_item");
var superagent = require("superagent");
var Q = require("q");

var getChannel = function (channelUrl) {
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
};

var Channels = React.createClass({
  propTypes: {
    channelsUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onUpdate: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      channelsUrls: [
        'godshand',
        'e_music_stonerrock',
        '13th_floor',
        'e_music_blues',
        'topinstrumentalmetal'
      ]
    };
  },

  getInitialState: function () {
    return {
      channels: [],
      isMenuOpen: false
    };
  },

  componentWillMount: function () {
    var promises = this.props.channelsUrls.map(function (url) {
      return getChannel(url);
    }.bind(this));

    Q.all(promises).then(function (channels) {
      this.setState({
        channels: channels.map(function (channel) {
          channel.isChecked = true;
          return channel;
        })
      }, function () {
        this.props.onUpdate(this.state.channels);
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

  _toggleMenu: function (event) {
    this.setState({isMenuOpen: !this.state.isMenuOpen}, function () {
      if (!this.state.isMenuOpen) {
        this.props.onUpdate(this.state.channels);
      }
    });

    event.preventDefault();
  },

  _hideMenu: function (event) {
    if (!this.state.isMenuOpen) {
      return;
    }

    event.stopPropagation();

    for (var el = event.target; el; el = el.parentNode) {
      if (el === this.refs.menuItems.getDOMNode()) {
        return;
      }

      if (el === this.refs.menu.getDOMNode()) {
        break;
      }
    }

    this._toggleMenu(event);
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
        <ChannelsItem onCheck={this._toggleChannel} ref={"channel" + channel.id} key={channel.id} {...channel} />
      );
    }.bind(this));

    return (
      <div className="channels">
        <a className={buttonClasses} onClick={this._toggleMenu}></a>
        <div ref="menu" className={menuClasses} style={{width:this.props.width}} onClick={this._hideMenu}>
          <ul ref="menuItems" className="channels-menu-items">{items}</ul>
        </div>
      </div>
    );
  }
});

module.exports = Channels;
