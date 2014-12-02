var React = require("react/addons");

var ChannelsItem = React.createClass({
  getInitialState: function () {
    return {
      isChecked: false
    }
  },

  getDefaultProps: function () {
    return {
      name: ""
    };
  },

  toggleCheck: function () {
    this.setState({isChecked: !this.state.isChecked});
  },

  render: function () {
    var checkClasses = React.addons.classSet({
      "icon-check": true,
      "icon-check-disabled": !this.state.isChecked
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
