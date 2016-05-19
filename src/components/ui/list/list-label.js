import React, {Component} from 'react';
import cn from 'classnames';
import styles from './list.scss';

export default class ListLabel extends Component {
  static propTypes = {
    text: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]).isRequired,
    rightElement: React.PropTypes.element,
  }

  static defaultProps = {
    rightElement: null,
  }

  render() {
    return <div className={styles.label}>
      <span className={styles.labelText}>{this.props.text}</span>
      {this._renderElement(this.props.rightElement)}
    </div>;
  }

  _renderElement(element) {
    if (element === null) {
      return null;
    }

    const className = cn(
      element.props.className,
      styles.labelRightElement
    );

    return React.cloneElement(
      element,
      {
        ...element.props,
        className,
      }
    );
  }

}
