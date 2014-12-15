var React = require("react/addons");

var Header = React.createClass({
  getDefaultProps: function () {
    return {
      github_url: "https://github.com/gridsane/channel-hunter"
    };
  },

  render: function () {
    return (
      <div className="header">
        <header>
          <div className="header-title">Channel Hunter</div>
        </header>
        <nav>
          <a href={this.props.github_url} className="header-button-github"></a>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
