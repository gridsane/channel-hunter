import React, {Component} from 'react';
import Icon from './Icon';
import {colors} from '../../utils/styles';

export default class ListLabel extends Component {
  static propTypes = {
    text: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]).isRequired,
    rightElement: React.PropTypes.element,
  };

  static defaultProps = {
    rightElement: null,
  };

  render() {
    const styles = this.getStyles();

    return <div style={styles.container}>
      <span style={styles.text}>{this.props.text}</span>
      {this.renderElement(this.props.rightElement, styles.rightElement)}
    </div>;
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

  getStyles() {

    const ellipsis = {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    };

    return {

      container: {
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

      rightElement: {
        position: 'absolute',
        right: '16px',
        top: '12px',
        color: colors.secondaryText,
      },

    };
  }
}
