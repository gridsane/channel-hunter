import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {colors} from '../../utils/styles';

@Radium
export default class ListItem extends Component {
  static propTypes = {
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    leftElement: PropTypes.node,
    leftElementHeight: PropTypes.number,
    rightElement: PropTypes.node,
    rightElementHeight: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    secondaryText: null,
    leftElement: null,
    leftElementHeight: 40,
    rightElement: null,
    rightElementHeight: 40,
    height: 56,
    onClick: null,
    style: null,
  };

  render() {
    const styles = this.getStyles();
    const {leftElement, rightElement} = this.props;

    return <li
      style={styles.container}
      onClick={::this._click}>
      {this.renderElement(leftElement, styles.leftElement)}
      <span style={styles.primaryText}>{this.props.primaryText}</span>
      <span style={styles.secondaryText}>{this.props.secondaryText}</span>
      {this.renderElement(rightElement, styles.rightElement)}
    </li>;
  }

  renderElement(element, elementStyle) {
    if (element === null) {
      return null;
    }

    const style = Object.assign({}, elementStyle, element.props.style);

    return React.cloneElement(
      element,
      {...element.props, style}
    );
  }

  _click(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  getStyles() {
    const height = this.props.height;
    const paddingVert = height/2 - (this.props.secondaryText ? 16 : 8);
    const paddingRight = this.props.rightIcon === null ? 16 : 56;
    const paddingLeft = this.props.leftElement === null ? 16 : 72;
    const isClickable = typeof(this.props.onClick) === 'function';
    const ellipsis = {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    };

    return {
      container: {
        position: 'relative',
        height,
        boxSizing: 'border-box',
        padding: `${paddingVert}px ${paddingRight}px ${paddingVert}px ${paddingLeft}px`,
        lineHeight: 1.1,
        fontSize: 16,
        cursor: isClickable ? 'pointer' : null,
        ':hover': isClickable ? {
          backgroundColor: 'rgba(0,0,0,.05)',
        } : null,
        ...this.props.style,
      },

      primaryText: {
        display: 'inline-block',
        width: '100%',
        ...ellipsis,
      },

      secondaryText: {
        display: 'inline-block',
        width: '100%',
        fontSize: 14,
        color: colors.secondaryText,
        ...ellipsis,
      },

      leftElement: {
        position: 'absolute',
        left: 16,
        top: this._getSideElementTop(height, this.props.leftElementHeight),
        color: colors.primaryText,
      },

      rightElement: {
        position: 'absolute',
        right: 16,
        top: this._getSideElementTop(height, this.props.rightElementHeight),
        color: colors.primaryText,
      },
    };
  }

  _getSideElementTop(itemHeight, elementHeight) {
    return ((itemHeight - elementHeight) / 2) + 'px';
  }
}
