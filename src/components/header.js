var React = require("react/addons");

var Header = React.createClass({
  getDefaultProps: function () {
    return {
      github_url: "https://github.com/gridsane/channel-hunter",
      pageScrollY: 0
    };
  },

  render: function () {
    var headerClasses = React.addons.classSet({
      "header": true,
      "header-narrow": this.props.pageScrollY > 100
    });

    return (
      <div className={headerClasses}>
        <header>
          <div className="header-wrapper">
            <div className="header-title">Channel Hunter</div>
          </div>
        </header>
        <nav>
          <button className="button-humburger"></button>
          <a href={this.props.github_url} className="button-github"></a>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
