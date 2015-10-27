import React, {Component} from 'react';

export default class Avatar extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    // size: React.PropTypes.number.isRequired,
  }

  render() {
    let style = Object.assign({}, {
      background: `url(${this.props.url}) center center`,
      display: 'inline-block',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    }, this.props.style);

    return <span {...this.props} style={style} />
  }
}
