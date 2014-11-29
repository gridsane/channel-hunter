var React = require('react');

var Controls = React.createClass({
  render: function () {
    return (
      <div className="controls">
        <button className="button-play"></button>
        <button className="button-volume"></button>
        <progress className="controls-buffer" max="100" value="70"></progress>
        <progress className="controls-seek" max="100" value="30"></progress>
      </div>
    );
  }
});

module.exports = Controls;
