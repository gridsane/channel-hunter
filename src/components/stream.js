var React = require('react');
var superagent = require('superagent');
var Loading = require('./loading');
var Track = require('./track');

var Stream = React.createClass({
  getTracks: function (streamId, callback) {
    superagent.get(
        '/api/stream/' + streamId,
        function(err, res) {
            callback(err, res ? res.body : null);
        }
    );
  },

  getDefaultProps: function () {
    return {
      id: null,
    };
  },

  getInitialState: function () {
    return {
      loading: true,
      tracks: [],
    };
  },

  componentWillMount: function () {
    this.getTracks(this.props.id, function (err, data) {
      this.setState({
        loading: false,
        tracks: data
      });
    }.bind(this));
  },

  render: function () {
    var tracks = this.state.tracks.map(function (track) {
      track.key = track.id;
      return Track(track);
    });

    return (
        <div className="stream">
          {this.state.loading ? (<Loading />) : ''}
          {tracks}
        </div>
    );
  }
});

module.exports = React.createFactory(Stream);
