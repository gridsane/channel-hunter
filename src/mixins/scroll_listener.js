var ScrollListener = {

  getInitialState: function () {
    return {
      pageScrollX: window.scrollX,
      pageScrollY: window.scrollY
    }
  },

  componentWillMount: function () {
    window.addEventListener('scroll', function () {
      this.setState({
        pageScrollX: window.scrollX,
        pageScrollY: window.scrollY
      });
    }.bind(this));
  }
};

module.exports = ScrollListener;
