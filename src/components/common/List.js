import React, {Component} from 'react';

export default class List extends Component {
  render() {
    let styles = this.getStyles();
    styles.container = Object.assign({}, styles.container, this.props.style);

    return <ul style={styles.container}>{this.props.children}</ul>
  }

  getStyles() {
    return {

      container: {
        listStyleType: 'none',
        margin: '8px 0',
        padding: 0,
      },

    }
  }
}
