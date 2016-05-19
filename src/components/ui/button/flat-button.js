import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './button.scss';

export default class FlatButton extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
  }

  render() {
    return <button className={cn(styles.flat, this.props.className)}>
      {this.props.label}
    </button>;
  }
}
