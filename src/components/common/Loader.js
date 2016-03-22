import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Loader extends Component {

  static propTypes = {
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    size: PropTypes.number,
  };

  static defaultProps = {
    color: '#fff',
    strokeWidth: 4,
    size: 24,
  };

  render() {
    const {strokeWidth} = this.props;
    const styles = this.getStyles();

    return <div style={styles.container}>
      <svg style={styles.circular} viewBox="25 25 50 50">
        <circle
          style={styles.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={strokeWidth} />
      </svg>
    </div>;
  }

  getStyles() {
    const {size, color, style} = this.props;

    return {
      container: {
        position: 'relative',
        width: size,
        height: size,
        ...style,
      },

      circular: {
        height: '100%',
        transformOrigin: 'center center',
        width: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        animation: 'x 2s linear infinite',
        animationName: loaderRotateAnimation,
      },

      path: {
        strokeDasharray: '1,200',
        strokeDashoffset: 0,
        strokeLinecap: 'round',
        stroke: color,
        animation: 'x 1.5s ease-in-out infinite',
        animationName: loaderDashAnimation,
      },
    };
  }
}

const loaderRotateAnimation = Radium.keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const loaderDashAnimation = Radium.keyframes({
  '0%': {
    strokeDasharray: '1,200',
    strokeDashoffset: 0,
  },
  '50%': {
    strokeDasharray: '89,200',
    strokeDashoffset: '-35px',
  },
  '100%': {
    strokeDasharray: '89,200',
    strokeDashoffset: '-124px',
  },
});
