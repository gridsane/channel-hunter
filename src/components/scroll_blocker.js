var React = require('react/addons');
var ScrollListener = require('../mixins/scroll_listener');

var ScrollBlocker = React.createClass({
  render: function () {
    return (
      <div className="scroll-blocker" style={{width: this.props.width}}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ScrollBlocker;
