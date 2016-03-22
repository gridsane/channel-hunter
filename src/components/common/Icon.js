import React, {Component, PropTypes} from 'react';

export default class Icon extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    size: PropTypes.number,
    boxSize: PropTypes.number,
  };

  static defaultProps = {
    size: 24,
    boxSize: null,
  };

  render() {
    return <span className="material-icons" style={this.getStyle()}>
      {this.props.children}
    </span>;
  }

  getStyle() {
    const {size, boxSize, style} = this.props;

    return {
      display: 'inline-block',
      position: 'relative',
      width: (boxSize || size),
      height: (boxSize || size),
      lineHeight: (boxSize || size) / size,
      textAlign: 'center',
      fontSize: size,
      color: '#fff',
      verticalAlign: 'middle',
      ...style,
    };
  }
}
