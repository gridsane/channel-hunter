'use strict';

var React = require('react');
var Cover = require('./components/cover');
var Controls = require('./components/controls');
var Playlist = require('./components/playlist');

var Application = React.createFactory(React.createClass({
  getDefaultProps: function () {
    return {
      github_url: 'https://github.com/gridsane/channel-hunter'
    };
  },

  getInitialState: function () {
    return {
      track: null
    };
  },

  selectHandler: function (track) {
    this.setState({track: track});
  },

  render: function() {
    return (
      <div className="application">
        <header>
          <div className="header-wrapper">
            <div className="header-title">Channel Hunter</div>
          </div>
        </header>
        <nav>
          <button className="button-humburger"></button>
          <a href={this.props.github_url} className="button-github"></a>
        </nav>

        <Cover {...this.state.track} />
        <Controls {...this.state.track} />
        <Playlist selectHandler={this.selectHandler} />
      </div>
    );
  }
}));

module.exports = Application;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(Application(), document.body);
  }
}
