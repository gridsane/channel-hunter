import React, {Component} from 'react';
import Icon from './Icon';
import {colors} from '../../utils/styles';

const PropTypeStringOrComponent = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.element
]);

export default class ListItem extends Component {
  static propTypes = {
    primaryText: PropTypeStringOrComponent.isRequired,
    secondaryText: PropTypeStringOrComponent,
    leftElement: React.PropTypes.element,
    leftElementHeight: React.PropTypes.number,
    rightIcon: React.PropTypes.string,
  };

  static defaultProps = {
    secondaryText: null,
    leftElement: null,
    leftElementHeight: 40,
    rightIcon: null,
  };

  render() {
    let styles = this.getStyles();

    return <li style={styles.container}>
      {this.renderLeftElement(styles.leftElement)}
      <span style={styles.primaryText}>{this.props.primaryText}</span>
      <span style={styles.secondaryText}>{this.props.secondaryText}</span>
      {this.renderRightIcon(styles.rightIcon)}
    </li>
  }

  renderLeftElement(leftElementStyle) {
    if (this.props.leftElement === null) {
      return null;
    }

    return React.cloneElement(
      this.props.leftElement,
      {style: leftElementStyle, ...this.props.leftElement.props},
      this.props.leftElement.children
    );
  }

  renderRightIcon(rightIconStyle) {
    if (this.props.rightIcon === null) {
      return null;
    }

    return <Icon style={rightIconStyle} size={24}>{this.props.rightIcon}</Icon>
  }

  getStyles() {
    const height = this.props.secondaryText === null ? 56 : 72;
    const paddingRight = this.props.rightIcon === null ? 16 : 56;
    const paddingLeft = this.props.leftElement === null ? 16 : 72;
    const ellipsis = {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    };

    return {

      container: {
        position: 'relative',
        boxSizing: 'border-box',
        height: `${height}px`,
        padding: `20px ${paddingRight}px 20px ${paddingLeft}px`,
        lineHeight: '16px',
      },

      primaryText: {
        display: 'inline-block',
        width: '100%',
        fontSize: '16px',
        ...ellipsis,
      },

      secondaryText: {
        display: 'inline-block',
        width: '100%',
        fontSize: '14px',
        color: colors.secondaryText,
        ...ellipsis,
      },

      leftElement: {
        position: 'absolute',
        left: '16px',
        top: ((height - this.props.leftElementHeight) / 2) + 'px',
      },

      rightIcon: {
        position: 'absolute',
        right: '16px',
        top: '16px',
        color: colors.primaryText,
      },

    }
  }
}
