import React, {Component} from 'react';
import Radium from 'radium';
import {colors, shadow} from '../../utils/styles';

const logoSvg = require('fs').readFileSync(`${__dirname}/../../assets/logo.svg`);

@Radium
export default class HeaderWrapper extends Component {
  render() {
    return <header style={styles.container}>
      <div style={styles.logo} dangerouslySetInnerHTML={{__html: logoSvg}}></div>
      {this.props.children}
    </header>;
  }
}

const styles = {
  container: {
    position: 'relative',
    height: 60,
    boxShadow: shadow(4),
    color: colors.text,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
    zIndex: 4,
    backgroundColor: colors.primary,
  },

  logo: {
    position: 'absolute',
    left: 24,
    top: 13,
    fontSize: 24,
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 400,
    width: 32,
    height: 32,
  },
};
