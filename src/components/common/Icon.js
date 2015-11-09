import React, {Component, PropTypes} from 'react';

export default class Icon extends Component {
  static propTypes = {
    size: PropTypes.number,
    boxSize: PropTypes.number,
  };

  static defaultProps = {
    size: 24,
    boxSize: null,
  };

  render() {
    const {size, boxSize, children} = this.props;
    const boxSizePx = (boxSize === null ? size : boxSize) + 'px';
    const style = {
        display: 'inline-block',
        position: 'relative',
        width: boxSizePx,
        height: boxSizePx,
        lineHeight: boxSizePx,
        textAlign: 'center',
        fontSize: this.props.size + 'px',
        color: '#fff',
        verticalAlign: 'middle',
        ...this.props.style,
    };

    return <span className="material-icons" style={style}>{children}</span>;
  }
}
