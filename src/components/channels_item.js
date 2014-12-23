var React = require("react/addons");
var Icon = require("./icon");

var ChannelsItem = React.createClass({
  getInitialState: function () {
    return {
      onCheck: null
    }
  },

  getDefaultProps: function () {
    return {
      isChecked: true,
      name: ""
    };
  },

  toggleCheck: function (event) {
    if ("function" === typeof(this.props.onCheck)) {
      this.props.onCheck(this.props.id, !this.props.isChecked);
    }

    event.preventDefault();
  },

  render: function () {
    var iconClasses = React.addons.classSet({
      "channels-item-icon": true,
      "channels-item-icon-unchecked": !this.props.isChecked
    });

    return (
      <li className="channels-item" onClick={this.toggleCheck}>
        <Icon className={iconClasses} symbol="check" />
        <div className="channels-item-name">{this.props.name}</div>
      </li>
    );
  }
});

module.exports = ChannelsItem;
