import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './button.scss';

export default class FlatButton extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    small: PropTypes.bool,
  }

  static defaultProps = {
    primary: false,
    small: false,
  }

  render() {
    const {label, primary, small, className} = this.props;

    return <button className={cn(styles.flat, {
      [styles.flatPrimary]: primary,
      [styles.flatSmall]: small,
    }, className)}>
      {label}
    </button>;
  }
}
