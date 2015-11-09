import React, {Component} from 'react';

export default class FlatButton extends Component {
  render() {
    let styles = this.getStyles();
    let style = Object.assign({}, styles.common, this.props.style);

    return <button style={style}>{this.props.label}</button>;
  }

  getStyles() {

    return {

      common: {
        height: '36px',
        padding: '0 24px',
        lineHeight: '16px',
        fontSize: '16px',
        textTransform: 'uppercase',
        border: 'none',
        background: 'none',
      },

    };

  }
}
