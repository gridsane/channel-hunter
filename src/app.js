'use strict';

var React = require('react');

var Application = React.createFactory(React.createClass({
  render: function() {
    return (
      <header>Hello Music</header>
    );
  }
}));

module.exports = Application;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(Application(), document.body);
  }
}
