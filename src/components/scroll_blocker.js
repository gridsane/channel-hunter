var React = require('react/addons');
var ScrollListener = require('../mixins/scroll_listener');

var ScrollBlocker = React.createClass({
  mixins: [ScrollListener],

  render: function () {
    var classes = React.addons.classSet({
      "scroll-blocker": true,
      "scroll-blocker-active": this.state.pageScrollY > 0
    });

    return (
      <div className="scroll-blocker" style={{top: this.state.pageScrollY}}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ScrollBlocker;
