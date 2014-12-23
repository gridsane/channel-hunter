var React = require("react/addons");
var Icon = require("./icon");

var Header = React.createClass({
  getDefaultProps: function () {
    return {
      github_url: "https://github.com/gridsane/channel-hunter",
      isShrink: false
    };
  },

  render: function () {
    var titleClasses = React.addons.classSet({
      "header-title": true,
      "header-title-shrink": this.props.isShrink
    });

    return (
      <div className="header">
        <header>
          <div className={titleClasses}>Channel Hunter</div>
        </header>
        <nav>
          <a href={this.props.github_url} className="header-button-github">
            <Icon symbol="github" />
          </a>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
