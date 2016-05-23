import React, {Component} from 'react';
import styles from './header.scss';
const logoSvg = require('fs').readFileSync(`${__dirname}/../../assets/logo.svg`);

export default class HeaderWrapper extends Component {
  render() {
    return <header className={styles.wrapper}>
      <div
        className={styles.wrapperLogo}
        dangerouslySetInnerHTML={{__html: logoSvg}}>
      </div>
      {this.props.children}
    </header>;
  }
}
