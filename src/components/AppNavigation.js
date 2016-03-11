import React, {Component, PropTypes} from 'react';
import Navigation from './common/Navigation';

export default class AppNavigation extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
  };

  render() {
    const styles = this.getStyles();
    const {open, docked} = this.props;

    return <Navigation open={open} docked={docked} style={styles.container}>
      {this.props.children}
    </Navigation>;
  }

  getStyles() {
    return {

      container: {
        marginTop: this.props.docked ? '68px' : 0,
        width: 280,
      },

    };
  }
}
