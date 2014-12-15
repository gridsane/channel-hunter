var React = require("react");

var Cover = React.createClass({
  getDefaultProps: function () {
    return {
      cover: null,
      width: null
    };
  },

  render: function () {
    var style = {};

    // if (this.props.cover) {
      // style.backgroundImage = "url(" + this.props.cover + ")";
    // }
    style.backgroundImage = "url(http://cs621920.vk.me/v621920194/3f53/Iy52MyRqGak.jpg)";

    return (
      <div className="cover" style={{width: this.props.width}}>
        <div className="cover-image" style={style}></div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Cover;
