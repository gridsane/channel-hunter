var React = require('react');

var Loading = React.createClass({
  render: function () {
    return (
      <img className="loading" src="/assets/images/loading.svg" />
    );
  }
});

module.exports = React.createFactory(Loading);
