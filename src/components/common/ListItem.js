import React, {Component} from 'react';

export default class ListItem extends Component {
  static propTypes = {
    primaryText: React.PropTypes.string.isRequired,
    secondaryText: React.PropTypes.string,
  }

  render() {
    let styles = this.getStyles();

    return <li>
      <span style={styles.primaryText}>{this.props.primaryText}</span>
      <span style={styles.secondaryText}>{this.props.secondaryText}</span>
    </li>
  }

  getStyles() {
    return {

      primaryText: {

      },

      secondaryText: {

      },

    }
  }
}
