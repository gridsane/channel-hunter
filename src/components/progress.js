var React = require("react/addons");
var nodeOffset = require("../utils/node_offset");

var Progress = React.createClass({

  getDefaultProps: function () {
    return {
      max: 0,
      value: 0,
      className: null,
      onSeek: null
    };
  },

  getInitialState: function () {
    return {
      valuePercent: 0
    };
  },

  getClasses: function () {
    var classes = {progress: true};

    if (null !== this.props.className) {
      classes[this.props.className] = true;
    }

    return React.addons.classSet(classes);
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (prevProps.value !== this.props.value || prevProps.max !== this.props.max) {
      this.setState({
        valuePercent: this.props.value * (100 / this.props.max)
      });
    }
  },

  onClick: function (event) {
    if ("function" !== typeof(this.props.onSeek)) {
      return;
    }

    var node = this.getDOMNode();
    var width = node.offsetWidth;
    var pos = event.clientX - nodeOffset(node).left;
    var value = (this.props.max / width) * pos;

    this.props.onSeek(value);
  },

  render: function () {
    return (
      <div className={this.getClasses()} onClick={this.onClick}>
        <div className="progress-value"
          style={{width: this.state.valuePercent + "%"}}></div>
      </div>
    );
  }
});

module.exports = Progress;
