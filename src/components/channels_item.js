var React = require("react/addons");

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
    var checkClasses = React.addons.classSet({
      "icon-check": true,
      "icon-check-disabled": !this.props.isChecked
    });

    return (
      <li className="channels-item" onClick={this.toggleCheck}>
        <div className={checkClasses}></div>
        <div className="channels-item-name">{this.props.name}</div>
      </li>
    );
  }
});

module.exports = ChannelsItem;
