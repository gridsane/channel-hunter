import React, {Component} from 'react';
import HeaderContainer from '../header/header-container';
import SidebarContainer from '../sidebar/sidebar-container';
import styles from './application.scss';

export default class ApplicationContainer extends Component {
  render() {
    return <main>
      <HeaderContainer />
      <section className={styles.root}>
        <SidebarContainer />
        {this.props.children}
      </section>
    </main>;
  }
}
