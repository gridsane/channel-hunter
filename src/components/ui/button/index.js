import React, {PropTypes} from 'react';
import cn from 'classnames';
import styles from './button.scss';

export default class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired,
  }

  render() {
    const {onClick, label, className} = this.props;

    return <button onClick={onClick} className={cn(styles.button, {
    }, className)}>
      {label}
    </button>;
  }
}
