import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './icon.scss';

export default class Icon extends Component {
  static propTypes = {
    glyph: PropTypes.string.isRequired,
    size: PropTypes.number,
    boxSize: PropTypes.number,
  };

  static defaultProps = {
    size: 24,
    boxSize: null,
  };

  render() {
    const {size, boxSize, glyph, className} = this.props;

    return <span
      className={cn('material-icons', styles.icon, className)}
      style={{
        ...this.props.style,
        width: (boxSize || size),
        height: (boxSize || size),
        lineHeight: (boxSize || size) / size,
        fontSize: size,
      }}>
      {glyph}
    </span>;
  }
}
