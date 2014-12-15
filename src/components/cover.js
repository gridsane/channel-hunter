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

    if (this.props.cover) {
      style.backgroundImage = "url(" + this.props.cover + ")";
    }

    return (
      <div className="cover" style={{width: this.props.width}}>
        <div className="cover-image" style={style}></div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Cover;
