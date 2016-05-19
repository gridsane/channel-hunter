import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './list.scss';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return <ul className={cn(styles.list, this.props.className)}>
      {this.props.children}
    </ul>;
  }
}
