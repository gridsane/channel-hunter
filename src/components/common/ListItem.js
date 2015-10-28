import React, {Component} from 'react';
import Icon from './Icon';
import Avatar from './Avatar';
import {colors} from '../../utils/styles';

const PropTypeStringOrComponent = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.element
])

export default class ListItem extends Component {
  static propTypes = {
    primaryText: PropTypeStringOrComponent.isRequired,
    secondaryText: PropTypeStringOrComponent,
    leftAvatar: React.PropTypes.string,
    rightIcon: React.PropTypes.string,
  };

  static defaultProps = {
    secondaryText: null,
    leftAvatar: null,
    rightIcon: null,
  };

  render() {
    let styles = this.getStyles();

    return <li style={styles.container}>
      {this.renderLeftAvatar(styles.leftAvatar)}
      <span style={styles.primaryText}>{this.props.primaryText}</span>
      <span style={styles.secondaryText}>{this.props.secondaryText}</span>
      {this.renderRightIcon(styles.rightIcon)}
    </li>
  }

  renderLeftAvatar(leftAvatarStyle) {
    if (this.props.leftAvatar === null) {
      return null;
    }

    return <Avatar style={leftAvatarStyle} url={this.props.leftAvatar} />
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
    const paddingLeft = this.props.leftAvatar === null ? 16 : 72;
    const ellipsis = {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }

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

      leftAvatar: {
        position: 'absolute',
        left: '16px',
        top: ((height - 40) / 2) + 'px',
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
