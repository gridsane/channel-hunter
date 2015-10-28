import React, {Component} from 'react';
import Icon from './Icon';
import {colors} from '../../utils/styles';

export default class ListLabel extends Component {
  static propTypes = {
    text: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]).isRequired,
    icon: React.PropTypes.string,
  };

  static defaultProps = {
    icon: null,
  };

  render() {
    let styles = this.getStyles();

    return <li style={styles.container}>
      <span style={styles.text}>{this.props.text}</span>
      {this.renderIcon(styles.icon)}
    </li>
  }

  renderIcon(iconStyle) {
    if (this.props.icon === null) {
      return null;
    }

    return <Icon style={iconStyle} size={24} boxSize={24}>{this.props.icon}</Icon>
  }

  getStyles() {

    const ellipsis = {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }

    return {

      container: {
        // outline: '1px solid red',
        position: 'relative',
        boxSizing: 'border-box',
        padding: '0 16px',
        height: '48px',
      },

      text: {
        display: 'inline-block',
        width: '100%',
        fontSize: '14px',
        lineHeight: '48px',
        color: colors.secondaryText,
        ...ellipsis,
      },

      icon: {
        // outline: '1px solid red',
        position: 'absolute',
        right: '16px',
        top: '12px',
        color: colors.secondaryText,
      },

    }
  }
}
