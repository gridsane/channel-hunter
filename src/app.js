'use strict';

var React = require('react');
var Stream = require('./components/stream');

var Application = React.createFactory(React.createClass({
  render: function() {
    return (
      <div className="application">
        <header className="logo">
          <img className="logo-img" src="/assets/images/logo.svg" />
          <h1 className="logo-title">hello music</h1>
        </header>

        <Stream id="76475061" />
        <Stream id="26457580" />
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
