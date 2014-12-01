var React = require('react/addons');

var Header = React.createClass({
  getDefaultProps: function () {
    return {
      pageScrollY: 0
    };
  },

  render: function () {
    var titleClasses = React.addons.classSet({
      "header-title": true,
      "hidden": this.props.pageScrollY > 100
    });

    return (
      <div className="header">
        <header>
          <div className="header-wrapper">
            <div className={titleClasses}>Channel Hunter</div>
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
