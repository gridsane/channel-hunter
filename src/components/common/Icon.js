import React, {Component} from 'react';

export default class Icon extends Component {
  static propTypes = {
    size: React.PropTypes.number.isRequired,
  }

  render() {
    let style = Object.assign({}, {
        display: 'inline-block',
        fontSize: this.props.size + 'px',
        position: 'relative',
        color: '#fff',
        verticalAlign: 'middle',
    }, this.props.style);

    return <span {...this.props} className="material-icons" style={style} />
  }
}
