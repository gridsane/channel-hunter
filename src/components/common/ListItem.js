import React, {Component} from 'react';
import {colors} from '../../utils/styles';

const PropTypeStringOrComponent = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.element,
]);

export default class ListItem extends Component {
  static propTypes = {
    primaryText: PropTypeStringOrComponent.isRequired,
    secondaryText: PropTypeStringOrComponent,
    leftElement: React.PropTypes.element,
    leftElementHeight: React.PropTypes.number,
    rightElement: React.PropTypes.element,
    rightElementHeight: React.PropTypes.number,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
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

  state = {
    mouseOver: false,
  };

  render() {
    const styles = this.getStyles();
    const {leftElement, rightElement} = this.props;

    return <li
      style={styles.container}
      onClick={::this._click}
      onMouseEnter={::this._mouseEnter}
      onMouseLeave={::this._mouseLeave}>
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

  _mouseEnter() {
    this.setState({mouseOver: true});
  }

  _mouseLeave() {
    this.setState({mouseOver: false});
  }

  getMouseOverStyleProps() {
    if (!this.props.onClick || !this.state.mouseOver) {
      return null;
    }

    return {
      backgroundColor: 'rgba(0,0,0,.05)',
      cursor: 'pointer',
    };
  }

  getStyles() {
    const height = this.props.height;
    const paddingVert = height/2 - (this.props.secondaryText ? 16 : 8);
    const paddingRight = this.props.rightIcon === null ? 16 : 56;
    const paddingLeft = this.props.leftElement === null ? 16 : 72;
    const mouseOver = this.getMouseOverStyleProps();
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
        lineHeight: 1,
        fontSize: 16,
        ...this.props.style,
        ...mouseOver,
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
