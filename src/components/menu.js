var React = require("react");
var Icon = require("./icon");

var Menu = React.createClass({
  propTypes: {
    onToggle: React.PropTypes.func.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getDefaultProps: function () {
    return {
      onToggle: function () {}
    };
  },

  getInitialState: function () {
    return {
      isOpen: false
    };
  },

  _toggleMenu: function (event) {
    this.setState({isOpen: !this.state.isOpen}, function () {
      this.props.onToggle(this.state.isOpen);
    });

    event.preventDefault();
  },

  _hideMenu: function (event) {
    if (!this.state.isOpen) {
      return;
    }

    event.stopPropagation();

    for (var el = event.target; el; el = el.parentNode) {
      if (el === this.refs.menuItems.getDOMNode()) {
        return;
      }

      if (el === this.refs.menuItemsContainer.getDOMNode()) {
        break;
      }
    }

    this._toggleMenu(event);
  },

  render: function() {
    var menuClasses = React.addons.classSet({
      "menu-items-container": true,
      "menu-items-container-open": this.state.isOpen
    });

    return (
      <div className="menu">
        <a className="menu-button" onClick={this._toggleMenu}>
          <Icon symbol={!this.state.isOpen ? "humburger" : "back"} />
        </a>
        <div
          className={menuClasses}
          style={{width:this.props.width}}
          onClick={this._hideMenu}
          ref="menuItemsContainer">
          <div ref="menuItems" className="menu-items">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Menu;
