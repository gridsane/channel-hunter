import React, {Component} from 'react';

export default class Avatar extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
  };

  static defaultProps = {
    size: 40,
  };

  render() {
    const style = this.getStyle();

    return <span {...this.props} style={style.container} />;
  }

  getStyle() {
    const {url, style, size} = this.props;

    return {

      container: {
        background: `url(${url}) center center`,
        backgroundSize: 'cover',
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        ...style,
      },

    };
  }
}
