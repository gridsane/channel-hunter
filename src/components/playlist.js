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
      selected: null
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
        });
      }.bind(this));
  },

  selectTrack: function (id, event) {
    this.setState({
      selected: id
    }, function () {
      if ("function" === typeof(this.props.onSelect)) {
        var tracks = this.state.tracks.filter(function (t) {
          return t.id === this.state.selected
        }.bind(this));

        if (tracks.length) {
          this.props.onSelect(tracks[0]);
        }
      }
    }.bind(this));
  },

  render: function () {
    var tracks = this.state.tracks.map(function (track) {
      return (
        <PlaylistItem
          {...track}
          selected={this.state.selected === track.id}
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
