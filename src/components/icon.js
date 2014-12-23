var React = require("react/addons");
var fs = require("fs");

var mountSprite = function (spriteId) {
  if (document) {
    if (!document.getElementById(spriteId)) {
      var sprite = document.createElement("div");
      sprite.id = spriteId;
      sprite.innerHTML = fs.readFileSync(__dirname + "/../../assets/images/icons-sprite.svg", "utf-8");
      document.body.appendChild(sprite);
    }
  }
};

var Icon = React.createClass({
  getDefaultProps: function () {
    return {
      spriteId: "svg-icons-sprite",
      size: "large"
    };
  },

  componentDidMount: function () {
    mountSprite(this.props.spriteId);
    this.getDOMNode().setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
    this._updateSymbol();
  },

  componentDidUpdate: function () {
    this._updateSymbol();
  },

  _updateSymbol: function () {
    // @todo get rid of this shameless safari hack
    this.getDOMNode().getElementsByTagName("use")[0]
      .setAttribute("xlink:href", "#icon-" + this.props.symbol);
  },

  _getClassname: function () {
    var classes = {};
    classes["icon-" + this.props.size] = true;

    if (this.props.className) {
      classes[this.props.className] = true;
    }

    return React.addons.classSet(classes);
  },

  render: function() {
    var innerUse = "<use xlink:href=\"#icon-" + this.props.symbol + "\" />";
    return (<svg className={this._getClassname()} dangerouslySetInnerHTML={{__html: innerUse}} />);
  }

});

module.exports = Icon;
