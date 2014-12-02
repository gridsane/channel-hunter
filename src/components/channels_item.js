var React = require("react");

var ChannelsItem = React.createClass({
  getDefaultProps: function () {
    return {
      name: ""
    };
  },

  render: function () {
    return (
      <li className="channels-item">
        <div className="channels-item-name">{this.props.name}</div>
      </li>
    );
  }
});

module.exports = ChannelsItem;
