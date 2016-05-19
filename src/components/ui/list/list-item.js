import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './list.scss';

export default class ListItem extends Component {
  static propTypes = {
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    leftElement: PropTypes.node,
    leftElementHeight: PropTypes.number,
    rightElement: PropTypes.node,
    rightElementHeight: PropTypes.number,
    onClick: PropTypes.func,
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
    const {leftElement, rightElement, className} = this.props;
    const itemStyles = this._getStyles();

    return <li
      className={cn(styles.item, {
        [styles.itemInteractive]: typeof(this.props.onClick) === 'function',
      }, className)}
      style={itemStyles.item}
      onClick={this._click}>
      {this.renderElement(leftElement, styles.itemLeftElement, itemStyles.leftElement)}
      <span className={styles.itemPrimaryText}>{this.props.primaryText}</span>
      <span className={styles.itemSecondaryText}>{this.props.secondaryText}</span>
      {this.renderElement(rightElement, styles.itemRightElement, itemStyles.rightElement)}
    </li>;
  }

  renderElement(element, className, style) {
    if (element === null) {
      return null;
    }

    return React.cloneElement(
      element,
      {
        ...element.props,
        className: cn(element.props.className, className),
        style: {...element.props.style, ...style},
      }
    );
  }

  _getStyles() {
    const height = this.props.height;
    const paddingVert = height/2 - (this.props.secondaryText ? 16 : 8);
    const paddingRight = this.props.rightIcon === null ? 16 : 56;
    const paddingLeft = this.props.leftElement === null ? 16 : 72;

    return {
      item: {
        height,
        padding: `${paddingVert}px ${paddingRight}px ${paddingVert}px ${paddingLeft}px`,
      },

      leftElement: {
        top: getSideElementTop(height, this.props.leftElementHeight),
      },

      rightElement: {
        top: getSideElementTop(height, this.props.rightElementHeight),
      },
    };
  }

  _click = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.key);
    }
  }
}

function getSideElementTop(itemHeight, elementHeight) {
  return ((itemHeight - elementHeight) / 2) + 'px';
}
