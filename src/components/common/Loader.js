import React, {Component, PropTypes} from 'react';

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
        zIndex: '999999',
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
        animation: 'Loader-rotate 2s linear infinite',
      },

      path: {
        strokeDasharray: '1,200',
        strokeDashoffset: 0,
        strokeLinecap: 'round',
        stroke: color,
        animation: 'Loader-dash 1.5s ease-in-out infinite',
      },

    };
  }
}
