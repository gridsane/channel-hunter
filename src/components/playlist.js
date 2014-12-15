var React = require("react");
var PlaylistItem = require("./playlist_item");
var superagent = require("superagent");
var Q = require("q");
var _ = require('lodash');

var Playlist = React.createClass({

  getDefaultProps: function () {
    return {
      channels: [],
      onTrackChange: null
    }
  },

  getInitialState: function () {
    return {
      loading: true,
      tracks: [],
      trackErrors: [],
      channelsIdIndex: {},
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
      this.setState({loading: true});

      var prevChannelIds = prevProps.channels.map(function (c) {
        return c.id;
      });

      var channelIds = [];
      var channelsIdIndex = {};
      var promises = [];

      this.props.channels.forEach(function (channel, i) {
        channelIds.push(channel.id);
        channelsIdIndex[channel.id] = i;
        if (-1 === prevChannelIds.indexOf(channel.id)) {
          promises.push(this.getTracks(channel.id));
        }
      }.bind(this));

      var diffChannelIds = prevChannelIds.filter(function (id) {
        return -1 === channelIds.indexOf(id);
      });

      Q.all(promises)
        .then(function (channelsTracks) {
          // @hack reverse existing tracks cause it reversing later with all,
          // to prevent swapping tracks with equal dates, meh.
          channelsTracks.push(this.state.tracks.filter(function (track) {
            return -1 === diffChannelIds.indexOf(track.channelId);
          }).reverse());

          var tracks = _.union.apply(this, channelsTracks);
          this.setState({
            loading: false,
            channelsIdIndex: channelsIdIndex,
            tracks: _.sortBy(tracks, "date").reverse()
          }, function () {
            if (prevState.selectedId === null && 0 < this.state.tracks.length) {
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
          if ("function" === typeof(this.props.onTrackChange)) {
            this.props.onTrackChange(track);
          }
        });

        break;
      }
    };
  },

  next: function () {
    var nextIndex = null === this.state.selectedIndex
      ? 0
      : this.state.selectedIndex + 1;

    if (nextIndex < this.state.tracks.length) {
      this.selectTrack(this.state.tracks[nextIndex].id);
    }
  },

  getChannel: function (channelId) {
    return this.props.channels[this.state.channelsIdIndex[channelId]];
  },

  errorSelected: function () {
    var trackErrors = this.state.trackErrors;
    trackErrors.push(this.state.selectedId);

    this.setState({trackErrors: trackErrors});
  },

  render: function () {
    var tracks = this.state.tracks.map(function (track) {
      return (
        <PlaylistItem
          {...track}
          channel={this.getChannel(track.channelId)}
          isSelected={this.state.selectedId === track.id}
          isError={-1 !== this.state.trackErrors.indexOf(track.id)}
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
