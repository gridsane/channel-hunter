import React, {Component} from 'react';

export default class List extends Component {
  render() {
    const styles = this.getStyles();

    return <ul style={styles.container}>{this.props.children}</ul>;
  }

  getStyles() {
    return {

      container: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        ...this.props.style,
      },

    };
  }
}
