import React, {Component, PropTypes} from 'react';
import {shadow} from '../../utils/styles';

export default class Navigation extends Component {
  static propTypes = {
    style: PropTypes.object,
    open: PropTypes.bool,
    docked: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    open: false,
    docked: false,
  };

  render() {
    const styles = this.getStyles();

    return <div style={styles.container}>
      <div style={styles.panel}>
        {this.props.children}
      </div>
    </div>;
  }

  getStyles() {
    const {open, docked} = this.props;
    const overlay = open || docked
      ? {
        visibility: 'visible',
        backgroundColor: 'rgba(0, 0, 0, .24)',
        transition: [
          'background-color .3s ease-out',
          'visibility 0s linear',
        ].join(','),
      }
      : {
        visibility: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transition: [
          'background-color .3s ease-out',
          'visibility 0s linear .3s',
        ].join(','),
      };

    return {
        container: {
          position: 'fixed',
          top: 0,
          right: docked ? '' : 0,
          left: 0,
          bottom: 0,
          zIndex: docked ? 1 : 8,
          ...overlay,
        },

        panel: {
          position: 'fixed',
          top: 0,
          left: open ? 0 : '-320px',
          bottom: 0,
          width: '320px',
          backgroundColor: '#fff',
          boxShadow: docked ? 'none' : shadow(30),
          zIndex: 1,
          transition: 'left .3s ease-out',
          overflow: 'hidden',
          overflowY: 'auto',
          ...this.props.style,
        },
    };
  }
}
