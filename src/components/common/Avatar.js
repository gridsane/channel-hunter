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
    return <span {...this.props} style={this.getStyle()} />;
  }

  getStyle() {
    const {url, style, size} = this.props;

    return {
      background: `url(${url}) center center`,
      backgroundSize: 'cover',
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: '50%',
      ...style,
    };
  }
}
