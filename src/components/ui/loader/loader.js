import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import styles from './loader.scss';

export default class Loader extends Component {
  static propTypes = {
    multicolor: PropTypes.bool,
    strokeWidth: PropTypes.number,
    size: PropTypes.number,
  }

  static defaultProps = {
    strokeWidth: 4,
    size: 24,
    multicolor: true,
  }

  render() {
    const {size, strokeWidth, multicolor, className, style} = this.props;

    return <div className={className} style={style}>
      <div className={styles.loader} style={{
        width: size,
        height: size,
      }}>
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
