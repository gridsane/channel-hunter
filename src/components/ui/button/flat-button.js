import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './button.scss';

export default class FlatButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    small: PropTypes.bool,
  }

  static defaultProps = {
    primary: false,
    small: false,
  }

  render() {
    const {onClick, label, primary, small, className} = this.props;

    return <button onClick={onClick} className={cn(styles.flat, {
      [styles.flatPrimary]: primary,
      [styles.flatSmall]: small,
    }, className)}>
      {label}
    </button>;
  }
}
