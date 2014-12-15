var React = require("react/addons");
var ScrollListener = require("../mixins/scroll_listener");

var Cover = React.createClass({
  mixins: [ScrollListener],

  getDefaultProps: function () {
    return {
      cover: null,
      width: null,
      onToggleShrink: null
    };
  },

  getInitialState: function () {
    return {
      initialHeight: null,
      height: null,
      isShrink: false
    }
  },

  componentDidMount: function () {
    this._updateHeight(this.getDOMNode().offsetHeight);
  },

  componentDidUpdate: function (prevProps, prevState) {
    // @todo find a way to not double set the state =\
    if (prevState.pageScrollY !== this.state.pageScrollY) {
      this._updateHeight();
    }
  },

  _updateHeight: function (initialHeight, pageScrollY) {
    var initialHeight = initialHeight || this.state.initialHeight;
    var height = Math.max(112, initialHeight - this.state.pageScrollY);
    var isShrink = height < 180;

    if (isShrink !== this.state.isShrink) {
      this.props.onToggleShrink(isShrink);
    }

    this.setState({
      initialHeight: initialHeight,
      height: height,
      isShrink: isShrink
    });
  },

  render: function () {
    var style = {};

    if (this.props.cover) {
      style.backgroundImage = "url(" + this.props.cover + ")";
    }

    return (
      <div className="cover" style={{width: this.props.width, height: this.state.height}}>
        <div className="cover-image" style={style}></div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Cover;
