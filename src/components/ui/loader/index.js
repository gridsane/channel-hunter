import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './loader.scss';

const sizes = {
  s: 16,
  m: 24,
  l: 32,
  xl: 48,
};

export default class Loader extends Component {
  static propTypes = {
    multicolor: PropTypes.bool,
    strokeWidth: PropTypes.number,
    size: PropTypes.oneOf(Object.keys(sizes)),
  }

  static defaultProps = {
    strokeWidth: 4,
    size: 'm',
    multicolor: true,
  }

  render() {
    const {size, strokeWidth, multicolor, className, style} = this.props;
    const sizeStyle = {width: sizes[size], height: sizes[size]};

    return <div className={className} style={{...sizeStyle, ...style}}>
      <div className={styles.loader} style={sizeStyle}>
        <svg className={styles.loaderCircle} viewBox="25 25 50 50">
          <circle
            className={cn(styles.loaderPath, {
              [styles.loaderPathMulticolor]: multicolor,
            })}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth={strokeWidth} />
        </svg>
      </div>
    </div>;
  }
}