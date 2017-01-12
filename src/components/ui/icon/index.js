import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './icon.scss';

export default class Icon extends Component {
  static propTypes = {
    glyph: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['large', 'medium']),
    className: PropTypes.string,
  };

  static defaultProps = {
    size: 'medium',
  }

  render() {
    const {glyph, size, className} = this.props;

    return <span className={cn(
      'material-icons',
      styles.icon,
      className,
      {[styles[size]]: true}
    )}>
      {glyph}
    </span>;
  }
}
