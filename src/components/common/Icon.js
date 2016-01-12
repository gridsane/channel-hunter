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
    const style = this.getStyle();

    return <span className="material-icons" style={style.container}>
      {this.props.children}
    </span>;
  }

  getStyle() {
    const {size, boxSize, style} = this.props;
    const boxSizePx = (boxSize || size) + 'px';

    return {

      container: {
        display: 'inline-block',
        position: 'relative',
        width: boxSizePx,
        height: boxSizePx,
        lineHeight: boxSizePx,
        textAlign: 'center',
        fontSize: size + 'px',
        color: '#fff',
        verticalAlign: 'middle',
        ...style,
      },

    };

  }
}
