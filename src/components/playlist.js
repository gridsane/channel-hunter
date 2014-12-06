var React = require("react");
var PlaylistItem = require("./playlist_item");
var superagent = require("superagent");
var Q = require("q");
var _ = require('lodash');

var Playlist = React.createClass({

  getDefaultProps: function () {
    return {
      channels: [],
      onSelect: null
    }
  },

  getInitialState: function () {
    return {
      loading: true,
      tracks: [],
      selectedId: null,
      selectedIndex: null
    }
  },

  getTracks: function (channelId) {
    var deferred = Q.defer();
    superagent.get(
        "/api/tracks/" + channelId,
        function(err, res) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(res ? res.body : null)
          }
        }
    );

    return deferred.promise;
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (prevProps.channels !== this.props.channels) {
      var promises = [];

      for (var i = this.props.channels.length - 1; i >= 0; i--) {
        promises.push(this.getTracks(this.props.channels[i].id));
      };

      Q.all(promises)
        .then(function (channelsTracks) {
          var tracks = _.union.apply(this, channelsTracks);
          this.setState({
            loading: false,
            tracks: _.sortBy(tracks, "date").reverse()
          }, function () {
            if (prevState.selectedId === null) {
              this.selectTrack(this.state.tracks[0].id);
            }
          });
        }.bind(this));
    }
  },

  selectTrack: function (id, event) {
    for (var i = this.state.tracks.length - 1; i >= 0; i--) {
      var track = this.state.tracks[i];
      if (track.id === id) {
        this.setState({
          selectedIndex: i,
          selectedId: id
        }, function () {
          if ("function" === typeof(this.props.onSelect)) {
            this.props.onSelect(track);
          }
        });

        break;
      }
    };
  },

  selectNext: function () {
    var nextIndex = null === this.state.selectedIndex
      ? 0
      : this.state.selectedIndex + 1;

    if (nextIndex < this.state.tracks.length) {
      this.selectTrack(this.state.tracks[nextIndex].id);
    }
  },

  getChannel: function (channelId) {
    return this.props.channels.filter(function (channel) {
      return channel.id === channelId;
    })[0];
  },

  render: function () {
    var tracks = this.state.tracks.map(function (track) {
      return (
        <PlaylistItem
          {...track}
          channel={this.getChannel(track.channelId)}
          isSelected={this.state.selectedId === track.id}
          onSelect={this.selectTrack}
          key={track.id}
          ref={"item" + track.id} />
      );
    }.bind(this));

    return (
      <ul className="playlist">{tracks}</ul>
    );
  }
});

module.exports = Playlist;
