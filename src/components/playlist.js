var React = require('react');
var PlaylistItem = require('./playlist_item');
var superagent = require('superagent');
var Q = require('q');

var Playlist = React.createClass({

  getDefaultProps: function () {
    return {
      id: 76475061,
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

  getTracks: function (streamId, callback) {
    var deferred = Q.defer();
    superagent.get(
        "/api/stream/" + streamId,
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

  componentWillMount: function () {
    this.getTracks(this.props.id)
      .then(function (data) {
        this.setState({
          loading: false,
          tracks: data
        }, function () {
          this.selectTrack(data[0].id);
        });
      }.bind(this));
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

  render: function () {
    var tracks = this.state.tracks.map(function (track) {
      return (
        <PlaylistItem
          {...track}
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
