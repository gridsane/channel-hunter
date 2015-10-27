import React, {Component} from 'react';

export default class Icon extends Component {
  static propTypes = {
    size: React.PropTypes.number,
    boxSize: React.PropTypes.number,
  };

  static defaultProps = {
    size: 24,
    boxSize: null,
  };

  render() {
    let boxSizePx = (this.props.boxSize === null ? this.props.size : this.props.boxSize) + 'px';
    let style = Object.assign({}, {
        display: 'inline-block',
        position: 'relative',
        width: boxSizePx,
        height: boxSizePx,
        lineHeight: boxSizePx,
        textAlign: 'center',
        fontSize: this.props.size + 'px',
        color: '#fff',
        verticalAlign: 'middle',
    }, this.props.style);

    return <span {...this.props} className="material-icons" style={style} />
  }
}
